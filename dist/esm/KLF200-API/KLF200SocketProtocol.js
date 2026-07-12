"use strict";
import debugModule from "debug";
import { TypedEvent } from "../utils/TypedEvent.js";
import { stringifyFrame } from "../utils/UtilityFunctions.js";
import { FrameRcvFactory } from "./FrameRcvFactory.js";
import { KLF200Protocol, SLIPProtocol, SLIP_END } from "./common.js";
const debug = debugModule(`klf-200-api:KLF200SocketProtocol`);
var KLF200SocketProtocolState;
(function (KLF200SocketProtocolState) {
    KLF200SocketProtocolState[KLF200SocketProtocolState["Invalid"] = 0] = "Invalid";
    KLF200SocketProtocolState[KLF200SocketProtocolState["StartFound"] = 1] = "StartFound";
})(KLF200SocketProtocolState || (KLF200SocketProtocolState = {}));
const MAX_QUEUE_SIZE = 1006;
export class KLF200SocketProtocol {
    socket;
    _onFrameReceived = new TypedEvent();
    _onDataSent = new TypedEvent();
    _onDataReceived = new TypedEvent();
    _onError = new TypedEvent();
    state = KLF200SocketProtocolState.Invalid;
    queue = [];
    constructor(socket) {
        this.socket = socket;
        debug("Initializing KLF200SocketProtocol.");
        socket.on("data", (data) => {
            this.processData(data).catch((err) => {
                debug(`Error occurred during processing the data: ${err}`);
                this.queue = [];
                this.state = KLF200SocketProtocolState.Invalid;
            });
        });
        socket.on("close", (had_error) => this.onSocketClose(had_error));
        socket.on("error", () => this.onSocketClose(true));
        socket.on("end", () => this.onSocketClose(false));
        socket.on("timeout", () => this.onSocketClose(true));
    }
    async processData(data) {
        debug(`Processing data: ${data.toString("hex")}. Current state: ${this.state}`);
        switch (this.state) {
            case KLF200SocketProtocolState.Invalid: {
                // Find first END mark
                const positionStart = data.indexOf(SLIP_END);
                if (positionStart === -1) {
                    // No start found -> ignore complete buffer
                    debug("No start mark found. Ignoring data.");
                    return;
                }
                this.state = KLF200SocketProtocolState.StartFound;
                this.queue.push(data.subarray(positionStart, positionStart + 1));
                // Process remaining data
                if (positionStart + 1 < data.byteLength) {
                    debug("Processing remaining data.");
                    await this.processData(data.subarray(positionStart + 1));
                }
                break;
            }
            case KLF200SocketProtocolState.StartFound:
                {
                    // Find END mark
                    const positionEnd = data.indexOf(SLIP_END);
                    if (positionEnd === -1) {
                        // No end found -> take complete buffer
                        debug("No end mark found. Adding to queue.");
                        this.queue.push(data);
                        if (this.queue.length > MAX_QUEUE_SIZE) {
                            debug("Queue size exceeded. Clearing queue.");
                            this.queue = [];
                            this.state = KLF200SocketProtocolState.Invalid;
                        }
                        return;
                    }
                    this.state = KLF200SocketProtocolState.Invalid;
                    this.queue.push(data.subarray(0, positionEnd + 1));
                    const frameBuffer = Buffer.concat(this.queue);
                    // Clear queue and process remaining data, if any
                    this.queue = [];
                    await this.send(frameBuffer);
                    if (positionEnd + 1 < data.byteLength) {
                        // Process remaining data
                        debug("Processing remaining data.");
                        await this.processData(data.subarray(positionEnd + 1));
                    }
                }
                break;
            default:
                break;
        }
    }
    onSocketClose(_had_error) {
        debug("Socket closed. Cleaning up resources.");
        this.queue = [];
        this.state = KLF200SocketProtocolState.Invalid;
        this._onFrameReceived.removeAllListeners();
        this._onDataSent.removeAllListeners();
        this._onDataReceived.removeAllListeners();
        this._onError.removeAllListeners();
    }
    on(handler) {
        debug("Adding handler for onFrameReceived.");
        return this._onFrameReceived.on(handler);
    }
    off(handler) {
        debug("Removing handler for onFrameReceived.");
        this._onFrameReceived.off(handler);
    }
    once(handler) {
        debug("Removing handler for onFrameReceived.");
        this._onFrameReceived.once(handler);
    }
    onDataSent(handler) {
        debug("Adding handler for onDataSent.");
        return this._onDataSent.on(handler);
    }
    onDataReceived(handler) {
        debug("Adding handler for onDataReceived.");
        return this._onDataReceived.on(handler);
    }
    offDataSent(handler) {
        debug("Removing handler for onDataSent.");
        this._onDataSent.off(handler);
    }
    offDataReceived(handler) {
        debug("Removing handler for onDataReceived.");
        this._onDataReceived.off(handler);
    }
    onError(handler) {
        debug("Adding handler for onError.");
        return this._onError.on(handler);
    }
    offError(handler) {
        debug("Removing handler for onError.");
        this._onError.off(handler);
    }
    async send(data) {
        try {
            debug(`Method send: data: ${JSON.stringify(data)}`);
            await this._onDataReceived.emit(data);
            const frameBuffer = KLF200Protocol.Decode(SLIPProtocol.Decode(data));
            debug(`Method send: decoded frame buffer: ${JSON.stringify(frameBuffer)}`);
            const frame = await FrameRcvFactory.CreateRcvFrame(frameBuffer);
            debug(`Method send: converted into frame ${frame.constructor.name}: ${stringifyFrame(frame)}`);
            await this._onFrameReceived.emit(frame);
            debug(`Method send: after emitting on events for frame ${frame.constructor.name}: ${stringifyFrame(frame)}`);
        }
        catch (e) {
            await this._onError.emit(e);
        }
    }
    async write(data) {
        debug(`Method write`);
        try {
            await this._onDataSent.emit(data);
            const slipBuffer = SLIPProtocol.Encode(KLF200Protocol.Encode(data));
            return this.socket.write(slipBuffer);
        }
        catch (error) {
            await this._onError.emit(error);
            throw error;
        }
    }
}
//# sourceMappingURL=KLF200SocketProtocol.js.map