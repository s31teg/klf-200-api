"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
const debug_1 = require("debug");
const promise_timeout_1 = require("promise-timeout");
const tls_1 = require("tls");
const GW_ERROR_NTF_js_1 = require("./KLF200-API/GW_ERROR_NTF.js");
const GW_GET_STATE_REQ_js_1 = require("./KLF200-API/GW_GET_STATE_REQ.js");
const KLF200SocketProtocol_js_1 = require("./KLF200-API/KLF200SocketProtocol.js");
const common_js_1 = require("./KLF200-API/common.js");
const ca_js_1 = require("./ca.js");
const index_js_1 = require("./index.js");
const TypedEvent_js_1 = require("./utils/TypedEvent.js");
const debug = (0, debug_1.default)(`klf-200-api:connection`);
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
class Connection {
    sckt;
    klfProtocol;
    host;
    CA = ca_js_1.ca;
    fingerprint = FINGERPRINT;
    connectionOptions;
    constructor(host, CAorConnectionOptions, fingerprint) {
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
        try {
            await this.initSocketAsync();
            this.klfProtocol = new KLF200SocketProtocol_js_1.KLF200SocketProtocol(this.sckt);
            const passwordCFM = await this.sendFrameAsync(new index_js_1.GW_PASSWORD_ENTER_REQ(password), timeout);
            if (passwordCFM.Status !== common_js_1.GW_COMMON_STATUS.SUCCESS) {
                return Promise.reject(new Error("Login failed."));
            }
            else {
                return Promise.resolve();
            }
        }
        catch (error) {
            return Promise.reject(error);
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
        try {
            await this._loginAsync(password, timeout);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * Logs out from the KLF interface and closes the socket.
     *
     * @param {number} [timeout=10] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<void>} Returns a promise that resolves to true on successful logout or rejects with the errors.
     */
    async logoutAsync(timeout = 10) {
        try {
            debug("Logging out from the KLF interface and closing the socket...");
            if (this.sckt) {
                if (this.klfProtocol) {
                    this.klfProtocol = undefined;
                }
                return (0, promise_timeout_1.timeout)(new Promise((resolve, reject) => {
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
            const frameName = common_js_1.GatewayCommand[frame.Command];
            const expectedConfirmationFrameName = (frameName.slice(0, -3) +
                "CFM");
            const expectedConfirmationFrameCommand = common_js_1.GatewayCommand[expectedConfirmationFrameName];
            const sessionID = frame instanceof common_js_1.GW_FRAME_COMMAND_REQ ? frame.SessionID : undefined;
            debug(`Expected confirmation frame is ${expectedConfirmationFrameName} (${expectedConfirmationFrameCommand}). Session ID: ${sessionID}`);
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            let resolve, reject;
            const notificationHandler = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            let cfmHandler = undefined;
            let errHandler = undefined;
            try {
                errHandler = this.klfProtocol.onError((error) => {
                    debug(`sendFrameAsync protocol error handler: ${JSON.stringify(error)}.`);
                    errHandler?.dispose();
                    cfmHandler?.dispose();
                    reject(error);
                });
                cfmHandler = this.klfProtocol.on((notificationFrame) => {
                    try {
                        debug(`sendFrameAsync frame received: ${stringifyFrame(notificationFrame)}.`);
                        if (notificationFrame instanceof GW_ERROR_NTF_js_1.GW_ERROR_NTF) {
                            debug(`sendFrameAsync GW_ERROR_NTF received: ${stringifyFrame(notificationFrame)}.`);
                            errHandler?.dispose();
                            cfmHandler?.dispose();
                            reject(new Error(notificationFrame.getError(), { cause: notificationFrame }));
                        }
                        else if (notificationFrame.Command === expectedConfirmationFrameCommand &&
                            (typeof sessionID === "undefined" ||
                                sessionID === notificationFrame.SessionID)) {
                            debug(`sendFrameAsync expected frame received: ${stringifyFrame(notificationFrame)}.`);
                            errHandler?.dispose();
                            cfmHandler?.dispose();
                            resolve(notificationFrame);
                        }
                    }
                    catch (error) {
                        errHandler?.dispose();
                        cfmHandler?.dispose();
                        reject(error);
                    }
                });
                this.shiftKeepAlive();
                await this.klfProtocol.write(frame.Data);
                await this.notifyFrameSent(frame);
                return await (0, promise_timeout_1.timeout)(notificationHandler, timeout * 1000);
            }
            catch (error) {
                debug(`sendFrameAsync error occurred: ${typeof error === "string" ? error : JSON.stringify(error)} with frame sent: ${stringifyFrame(frame)}.`);
                errHandler?.dispose();
                cfmHandler?.dispose();
                reject(error);
                return Promise.reject(error);
            }
        }
        catch (error) {
            debug(`sendFrameAsync error occurred (outer): ${typeof error === "string" ? error : JSON.stringify(error)} with frame sent: ${stringifyFrame(frame)}.`);
            return Promise.reject(error);
        }
        function stringifyFrame(frame) {
            return JSON.stringify(frame, (key, value) => {
                if (key.match(/password/i)) {
                    return "**********";
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                    return value;
                }
            });
        }
    }
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
    _onFrameSent = new TypedEvent_js_1.TypedEvent();
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
        if (this.keepAliveTimer) {
            clearInterval(this.keepAliveTimer);
            this.keepAliveTimer = undefined;
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
        await this.sendFrameAsync(new GW_GET_STATE_REQ_js_1.GW_GET_STATE_REQ());
        return;
    }
    /**
     * Shifts the keep-alive timer to restart its counter.
     * If no keep-alive timer is active nothing happens.
     *
     * @private
     */
    shiftKeepAlive() {
        if (this.keepAliveTimer) {
            clearInterval(this.keepAliveTimer);
            this.startKeepAlive(this.keepAliveInterval);
        }
    }
    async initSocketAsync() {
        try {
            if (this.sckt === undefined) {
                return new Promise((resolve, reject) => {
                    try {
                        const loginErrorHandler = (error) => {
                            console.error(`loginErrorHandler: ${error.message}`);
                            this.sckt = undefined;
                            reject(error);
                        };
                        this.sckt = (0, tls_1.connect)(common_js_1.KLF200_PORT, this.host, this.connectionOptions
                            ? this.connectionOptions
                            : {
                                rejectUnauthorized: false,
                                ca: [this.CA],
                                checkServerIdentity: (host, cert) => this.checkServerIdentity(host, cert),
                            }, () => {
                            // Callback on event "secureConnect":
                            // Resolve promise if connection is authorized, otherwise reject it.
                            if (this.sckt?.authorized || (this.sckt?.authorizationError === "CERT_HAS_EXPIRED" && this.sckt?.getPeerCertificate()?.fingerprint === this.fingerprint) /*certificateExpiredHotfix*/) {
                                // Remove login error handler
                                this.sckt?.off("error", loginErrorHandler);
                                resolve();
                            }
                            else {
                                const err = this.sckt?.authorizationError;
                                this.sckt = undefined;
                                console.error(`AuthorizationError: ${err.message}`);
                                reject(err);
                            }
                        });
                        // Add error handler to reject the promise on login problems
                        this.sckt?.on("error", loginErrorHandler);
                        this.sckt?.on("close", () => {
                            // Socket has been closed -> clean up everything
                            this.socketClosedEventHandler();
                        });
                        // Add additional error handler for the lifetime of the socket
                        this.sckt?.on("error", () => {
                            // Socket has an error -> clean up everything
                            this.socketClosedEventHandler();
                        });
                        // React to end events:
                        this.sckt?.on("end", () => {
                            if (this.sckt?.allowHalfOpen) {
                                this.sckt?.end(() => {
                                    this.socketClosedEventHandler();
                                });
                            }
                        });
                        // Timeout of socket:
                        this.sckt?.on("timeout", () => {
                            this.sckt?.end(() => {
                                this.socketClosedEventHandler();
                            });
                        });
                    }
                    catch (error) {
                        console.error(`initSocketAsync inner catch: ${JSON.stringify(error)}`);
                        reject(error);
                    }
                });
            }
            else {
                return Promise.resolve();
            }
        }
        catch (error) {
            console.error(`initSocketAsync outer catch: ${JSON.stringify(error)}`);
            return Promise.reject(error);
        }
    }
    socketClosedEventHandler() {
        // Socket has been closed -> clean up everything
        this.stopKeepAlive();
        this.klfProtocol = undefined;
        this.sckt = undefined;
    }
    checkServerIdentity(host, cert) {
        if (cert.fingerprint === this.fingerprint)
            return undefined;
        else
            return (0, tls_1.checkServerIdentity)(host, cert);
    }
}
exports.Connection = Connection;
//# sourceMappingURL=connection.js.map