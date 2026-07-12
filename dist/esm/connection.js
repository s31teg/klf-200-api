"use strict";
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
import debugModule from "debug";
import "disposablestack/auto";
import { timeout as promiseTimeout } from "promise-timeout";
import { checkServerIdentity as checkServerIdentityOriginal, connect, } from "tls";
import { GW_ERROR_NTF } from "./KLF200-API/GW_ERROR_NTF.js";
import { GW_GET_STATE_REQ } from "./KLF200-API/GW_GET_STATE_REQ.js";
import { KLF200SocketProtocol } from "./KLF200-API/KLF200SocketProtocol.js";
import { GW_COMMON_STATUS, GW_FRAME_COMMAND_REQ, GatewayCommand, KLF200_PORT, } from "./KLF200-API/common.js";
import { ca } from "./ca.js";
import { GW_PASSWORD_ENTER_REQ, } from "./index.js";
import { TypedEvent } from "./utils/TypedEvent.js";
import { stringifyFrame } from "./utils/UtilityFunctions.js";
const debug = debugModule(`klf-200-api:connection`);
const FINGERPRINT = "02:8C:23:A0:89:2B:62:98:C4:99:00:5B:D2:E7:2E:0A:70:3D:71:6A";
/**
 * The Connection class is used to handle the communication with the Velux KLF interface.
 * It provides login and logout functionality and provides methods to run other commands
 * on the socket API.
 *
 * ```
 * const Connection = require('velux-api').Connection;
 *
 * let conn = new Connection('velux-klf-12ab');
 * conn.loginAsync('velux123')
 *     .then(() => {
 *         ... do some other stuff ...
 *         return conn.logoutAsync();
 *      })
 *     .catch((err) => {    // always close the connection
 *         return conn.logoutAsync().reject(err);
 *      });
 * ```
 *
 * @class Connection
 */
export class Connection {
    _disposableStack = new AsyncDisposableStack();
    sckt;
    klfProtocol;
    host;
    CA = ca;
    fingerprint = FINGERPRINT;
    connectionOptions;
    constructor(host, CAorConnectionOptions, fingerprint) {
        debug(`Creating Connection instance for host: ${host}`);
        this.host = host;
        if (CAorConnectionOptions !== undefined) {
            if (Buffer.isBuffer(CAorConnectionOptions)) {
                this.CA = CAorConnectionOptions;
            }
            else {
                this.connectionOptions = CAorConnectionOptions;
            }
        }
        if (fingerprint !== undefined) {
            this.fingerprint = fingerprint;
        }
    }
    async [Symbol.asyncDispose]() {
        debug(`Disposing Connection instance for host: ${this.host}`);
        this.stopKeepAlive();
        await this._disposableStack.disposeAsync();
        if (this.sckt) {
            this.sckt.destroy();
        }
        this.sckt = undefined;
        this.klfProtocol = undefined;
        debug(`Disposed Connection instance for host: ${this.host}`);
    }
    /**
     * Gets the [[KLF200SocketProtocol]] object used by this connection.
     * This property has a value after calling [[loginAsync]], only.
     *
     * @readonly
     */
    get KLF200SocketProtocol() {
        return this.klfProtocol;
    }
    /**
     * This method implements the login process without timeout.
     * The [[loginAsync]] function wraps this into a timed promise.
     *
     * @private
     * @param {string} password The password needed for login. The factory default password is velux123.
     * @returns {Promise<void>} Returns a promise that resolves to true on success or rejects with the errors.
     */
    async _loginAsync(password, timeout) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            debug(`Logging in to host (_loginAsync): ${this.host}`);
            const stack = __addDisposableResource(env_1, new DisposableStack(), false);
            await this.initSocketAsync();
            this.klfProtocol = new KLF200SocketProtocol(this.sckt);
            stack.defer(() => {
                this.klfProtocol = undefined;
            });
            const passwordCFM = await this.sendFrameAsync(new GW_PASSWORD_ENTER_REQ(password), timeout);
            if (passwordCFM.Status !== GW_COMMON_STATUS.SUCCESS) {
                debug("Login failed.");
                return Promise.reject(new Error("Login failed."));
            }
            else {
                debug("Login successful.");
                this._disposableStack.use(stack.move());
                return Promise.resolve();
            }
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
    /**
     * Logs in to the KLF interface by sending the GW_PASSWORD_ENTER_REQ.
     *
     * @param {string} password The password needed for login. The factory default password is velux123.
     * @param {number} [timeout=60] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<void>} Returns a promise that resolves to true on success or rejects with the errors.
     */
    async loginAsync(password, timeout = 60) {
        debug(`Logging in to host: ${this.host}`);
        await this._loginAsync(password, timeout);
    }
    /**
     * Logs out from the KLF interface and closes the socket.
     *
     * @param {number} [timeout=10] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<void>} Returns a promise that resolves to true on successful logout or rejects with the errors.
     */
    async logoutAsync(timeout = 10) {
        debug(`Logging out from host: ${this.host}`);
        try {
            debug("Logging out from the KLF interface and closing the socket...");
            if (this.sckt) {
                if (this.klfProtocol) {
                    this.klfProtocol = undefined;
                }
                await promiseTimeout(new Promise((resolve, reject) => {
                    try {
                        // Close socket
                        debug("Closing socket...");
                        this.sckt?.end("", () => {
                            debug("Socket closed.");
                            resolve();
                        });
                    }
                    catch (error) {
                        debug("Error while closing socket:", error);
                        reject(error);
                    }
                }), timeout * 1000);
                await this._disposableStack.disposeAsync();
                this._disposableStack = new AsyncDisposableStack();
            }
            else {
                debug("No socket to close.");
                return Promise.resolve();
            }
        }
        catch (error) {
            debug("Error while logging out:", error);
            return Promise.reject(error);
        }
    }
    async sendFrameAsync(frame, timeout = 10) {
        try {
            debug(`sendFrameAsync called with frame: ${stringifyFrame(frame)}, timeout: ${timeout}.`);
            const frameName = GatewayCommand[frame.Command];
            const expectedConfirmationFrameName = (frameName.slice(0, -3) +
                "CFM");
            const expectedConfirmationFrameCommand = GatewayCommand[expectedConfirmationFrameName];
            const sessionID = frame instanceof GW_FRAME_COMMAND_REQ ? frame.SessionID : undefined;
            debug(`Expected confirmation frame is ${expectedConfirmationFrameName} (${expectedConfirmationFrameCommand}). Session ID: ${sessionID}`);
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            let resolve, reject;
            const notificationHandler = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            try {
                const env_2 = { stack: [], error: void 0, hasError: false };
                try {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const errHandler = __addDisposableResource(env_2, this.klfProtocol.onError((error) => {
                        debug(`sendFrameAsync protocol error handler: ${JSON.stringify(error)}.`);
                        reject(error);
                    }), false);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    const cfmHandler = __addDisposableResource(env_2, this.klfProtocol.on((notificationFrame) => {
                        try {
                            debug(`sendFrameAsync frame received: ${stringifyFrame(notificationFrame)}.`);
                            if (notificationFrame instanceof GW_ERROR_NTF) {
                                debug(`sendFrameAsync GW_ERROR_NTF received: ${stringifyFrame(notificationFrame)}.`);
                                reject(new Error(notificationFrame.getError(), { cause: notificationFrame }));
                            }
                            else if (notificationFrame.Command === expectedConfirmationFrameCommand &&
                                (typeof sessionID === "undefined" ||
                                    sessionID === notificationFrame.SessionID)) {
                                debug(`sendFrameAsync expected frame received: ${stringifyFrame(notificationFrame)}.`);
                                resolve(notificationFrame);
                            }
                        }
                        catch (error) {
                            debug(`sendFrameAsync error occurred: ${typeof error === "string" ? error : JSON.stringify(error)}.`);
                            reject(error);
                        }
                    }), false);
                    this.shiftKeepAlive();
                    await this.klfProtocol.write(frame.Data);
                    await this.notifyFrameSent(frame);
                    return await promiseTimeout(notificationHandler, timeout * 1000);
                }
                catch (e_2) {
                    env_2.error = e_2;
                    env_2.hasError = true;
                }
                finally {
                    __disposeResources(env_2);
                }
            }
            catch (error) {
                debug(`sendFrameAsync error occurred: ${typeof error === "string" ? error : JSON.stringify(error)} with frame sent: ${stringifyFrame(frame)}.`);
                reject(error);
                return Promise.reject(error);
            }
        }
        catch (error) {
            debug(`sendFrameAsync error occurred (outer): ${typeof error === "string" ? error : JSON.stringify(error)} with frame sent: ${stringifyFrame(frame)}.`);
            return Promise.reject(error);
        }
    }
    /**
     * Returns a stringified representation of the given frame.
     * Passwords in the frame are censored.
     * @param frame The frame to be stringified.
     * @returns A stringified representation of the given frame.
     */
    /**
     * Add a handler to listen for confirmations and notification.
     * You can provide an optional filter to listen only to
     * specific events.
     *
     * @param {Listener<IGW_FRAME_RCV>} handler Callback functions that is called for an event
     * @param {GatewayCommand[]} [filter] Array of GatewayCommand entries you want to listen to. Optional.
     * @returns {Disposable} Returns a Disposable that you can call to remove the handler.
     */
    on(handler, filter) {
        debug(`on called with filter: ${JSON.stringify(filter)}.`);
        if (typeof filter === "undefined") {
            return this.klfProtocol.on(handler);
        }
        else {
            return this.klfProtocol.on(async (frame) => {
                if (filter.indexOf(frame.Command) >= 0) {
                    await Promise.resolve(handler(frame));
                }
            });
        }
    }
    _onFrameSent = new TypedEvent();
    /**
     * Add a handler to listen for sent frames.
     * You can provide an optional filter to listen only to
     * specific events.
     *
     * @param {Listener<IGW_FRAME_REQ>} handler Callback functions that is called for an event
     * @param {GatewayCommand[]} [filter] Array of GatewayCommand entries you want to listen to. Optional.
     * @returns {Disposable} Returns a Disposable that you can call to remove the handler.
     */
    onFrameSent(handler, filter) {
        debug(`onFrameSent called with filter: ${JSON.stringify(filter)}.`);
        if (typeof filter === "undefined") {
            return this._onFrameSent.on(handler);
        }
        else {
            return this._onFrameSent.on((frame) => {
                if (filter.indexOf(frame.Command) >= 0) {
                    handler(frame);
                }
            });
        }
    }
    async notifyFrameSent(frame) {
        debug(`notifyFrameSent called with frame: ${stringifyFrame(frame)}.`);
        await this._onFrameSent.emit(frame);
    }
    keepAliveTimer;
    keepAliveInterval = 10 * 60 * 1000;
    /**
     * Start a keep-alive timer to send a message
     * at least every [[interval]] minutes to the interface.
     * The KLF-200 interface will close the connection
     * after 15 minutes of inactivity.
     *
     * @param {number} [interval=600000] Keep-alive interval in minutes. Defaults to 10 min.
     */
    startKeepAlive(interval = 10 * 60 * 1000) {
        debug(`startKeepAlive called with interval: ${interval}.`);
        // Clear any previous keep-alive timer
        this.stopKeepAlive();
        this.keepAliveInterval = interval;
        this.keepAliveTimer = setInterval(() => {
            this.sendKeepAlive().catch((error) => debug(`Error while sending keep alive: ${typeof error === "string" ? error : JSON.stringify(error)}`));
        }, interval);
    }
    /**
     * Stops the keep-alive timer.
     * If not timer is set nothing happens.
     *
     */
    stopKeepAlive() {
        debug("stopKeepAlive called.");
        if (this.keepAliveTimer) {
            clearInterval(this.keepAliveTimer);
            this.keepAliveTimer = undefined;
            debug("Keep-alive timer stopped.");
        }
    }
    /**
     * Sends a keep-alive message to the interface
     * to keep the socket connection open.
     *
     * @private
     * @returns {Promise<void>} Resolves if successful, otherwise reject
     */
    async sendKeepAlive() {
        debug("sendKeepAlive called.");
        await this.sendFrameAsync(new GW_GET_STATE_REQ());
        return;
    }
    /**
     * Shifts the keep-alive timer to restart its counter.
     * If no keep-alive timer is active nothing happens.
     *
     * @private
     */
    shiftKeepAlive() {
        debug("shiftKeepAlive called.");
        if (this.keepAliveTimer) {
            clearInterval(this.keepAliveTimer);
            this.startKeepAlive(this.keepAliveInterval);
            debug("Keep-alive timer shifted.");
        }
    }
    async initSocketAsync() {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
            debug(`initSocketAsync called for host: ${this.host}`);
            const stack = __addDisposableResource(env_3, new AsyncDisposableStack(), true);
            try {
                if (this.sckt === undefined) {
                    debug("Creating new socket...");
                    await new Promise((resolve, reject) => {
                        try {
                            const loginErrorHandler = (error) => {
                                debug(`loginErrorHandler called with error: ${error.message}`);
                                console.error(`loginErrorHandler: ${error.message}`);
                                this.sckt?.off("error", loginErrorHandler);
                                this.sckt = undefined;
                                reject(error);
                            };
                            this.sckt = connect(KLF200_PORT, this.host, this.connectionOptions
                                ? this.connectionOptions
                                : {
                                    // The KLF-200 ships with a hard-coded, shared self-signed certificate
                                    // that is validated by pinning its fingerprint. We must not let Node
                                    // abort the handshake automatically (rejectUnauthorized: false) so that
                                    // the secureConnect callback below can accept a certificate that is valid,
                                    // or one whose only defect is that it has expired while its fingerprint
                                    // still matches the pinned certificate. The shared VELUX certificate
                                    // expired on 2026-07-12; every other authorization error is still rejected.
                                    rejectUnauthorized: false,
                                    ca: [this.CA],
                                    checkServerIdentity: (host, cert) => this.checkServerIdentity(host, cert),
                                }, () => {
                                debug("Secure connection established.");
                                // Callback on event "secureConnect":
                                // Accept the connection when it is authorized, or when the only problem is that
                                // the pinned KLF-200 certificate has expired (its fingerprint still matches).
                                // Any other authorization error is rejected.
                                // Note: `authorizationError` carries an OpenSSL error-code string (e.g.
                                // "CERT_HAS_EXPIRED") at runtime although @types/node types it as `Error`.
                                const authorizationError = this.sckt?.authorizationError;
                                const certificateExpiredButPinned = this.sckt?.authorized !== true &&
                                    authorizationError === "CERT_HAS_EXPIRED" &&
                                    this.sckt?.getPeerCertificate()?.fingerprint === this.fingerprint;
                                if (certificateExpiredButPinned) {
                                    console.warn("The KLF-200 certificate has expired. Accepting the connection because its fingerprint matches the pinned certificate.");
                                }
                                if (this.sckt?.authorized || certificateExpiredButPinned) {
                                    // Remove login error handler
                                    this.sckt?.off("error", loginErrorHandler);
                                    stack.defer(async () => {
                                        await promiseTimeout(new Promise((resolve, reject) => {
                                            try {
                                                // Close socket
                                                debug("Closing socket...");
                                                this.sckt?.end("", () => {
                                                    debug("Socket closed.");
                                                    resolve();
                                                });
                                            }
                                            catch (error) {
                                                debug("Error while closing socket:", error);
                                                reject(error);
                                            }
                                        }), 10000);
                                        this.sckt = undefined;
                                    });
                                    resolve();
                                }
                                else {
                                    // Reject promise
                                    const err = this.sckt?.authorizationError;
                                    this.sckt = undefined;
                                    debug(`AuthorizationError: ${err.message}`);
                                    console.error(`AuthorizationError: ${err.message}`);
                                    reject(err);
                                }
                            });
                            // Add error handler to reject the promise on login problems
                            this.sckt?.on("error", loginErrorHandler);
                            const closeEventHandler = () => {
                                // Socket has been closed -> clean up everything
                                this.socketClosedEventHandler();
                            };
                            this.sckt?.on("close", closeEventHandler);
                            stack.defer(() => {
                                this.sckt?.off("close", closeEventHandler);
                            });
                            // Add additional error handler for the lifetime of the socket
                            this.sckt?.on("error", closeEventHandler);
                            stack.defer(() => {
                                this.sckt?.off("error", closeEventHandler);
                            });
                            // React to end events:
                            const endEventHandler = () => {
                                if (this.sckt?.allowHalfOpen) {
                                    this.sckt?.end(() => {
                                        this.socketClosedEventHandler();
                                    });
                                }
                            };
                            this.sckt?.on("end", endEventHandler);
                            stack.defer(() => {
                                this.sckt?.off("end", endEventHandler);
                            });
                            // Timeout of socket:
                            const timeoutEventHandler = () => {
                                this.sckt?.end(() => {
                                    this.socketClosedEventHandler();
                                });
                            };
                            this.sckt?.on("timeout", timeoutEventHandler);
                            stack.defer(() => {
                                this.sckt?.off("timeout", timeoutEventHandler);
                            });
                        }
                        catch (error) {
                            debug(`initSocketAsync inner catch: ${JSON.stringify(error)}`);
                            console.error(`initSocketAsync inner catch: ${JSON.stringify(error)}`);
                            reject(error);
                        }
                    });
                    this._disposableStack.use(stack.move());
                }
                else {
                    debug("Socket already exists.");
                    return Promise.resolve();
                }
            }
            catch (error) {
                console.error(`initSocketAsync outer catch: ${JSON.stringify(error)}`);
                return Promise.reject(error);
            }
        }
        catch (e_3) {
            env_3.error = e_3;
            env_3.hasError = true;
        }
        finally {
            const result_1 = __disposeResources(env_3);
            if (result_1)
                await result_1;
        }
    }
    socketClosedEventHandler() {
        debug("socketClosedEventHandler called.");
        // Socket has been closed -> clean up everything
        this.stopKeepAlive();
        // Remove all listeners
        this.sckt?.removeAllListeners();
        this.klfProtocol = undefined;
        this.sckt = undefined;
        debug("Socket closed.");
    }
    checkServerIdentity(host, cert) {
        debug(`checkServerIdentity called for host ${host} with fingerprint ${cert.fingerprint}.`);
        if (cert.fingerprint === this.fingerprint)
            return undefined;
        else
            return checkServerIdentityOriginal(host, cert);
    }
}
//# sourceMappingURL=connection.js.map