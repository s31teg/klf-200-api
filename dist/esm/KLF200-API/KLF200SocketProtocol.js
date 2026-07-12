"use strict";
import debugModule from "debug";
import { TypedEvent } from "../utils/TypedEvent.js";
import { FrameRcvFactory } from "./FrameRcvFactory.js";
import { KLF200Protocol, SLIPProtocol, SLIP_END } from "./common.js";
const debug = debugModule(`klf-200-api:KLF200SocketProtocol`);
var KLF200SocketProtocolState;
(function (KLF200SocketProtocolState) {
    KLF200SocketProtocolState[KLF200SocketProtocolState["Invalid"] = 0] = "Invalid";
    KLF200SocketProtocolState[KLF200SocketProtocolState["StartFound"] = 1] = "StartFound";
})(KLF200SocketProtocolState || (KLF200SocketProtocolState = {}));
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
        socket.on("data", (data) => {
            this.processData(data).catch((err) => debug(`Error occurred during processing the data: ${err}`));
        });
        socket.on("close", (had_error) => this.onSocketClose(had_error));
    }
    async processData(data) {
        switch (this.state) {
            case KLF200SocketProtocolState.Invalid:
                // Find first END mark
                const positionStart = data.indexOf(SLIP_END);
                if (positionStart === -1)
                    // No start found -> ignore complete buffer
                    return;
                this.state = KLF200SocketProtocolState.StartFound;
                this.queue.push(data.subarray(positionStart, positionStart + 1));
                // Process remaining data
                if (positionStart + 1 < data.byteLength)
                    await this.processData(data.subarray(positionStart + 1));
                break;
            case KLF200SocketProtocolState.StartFound:
                // Find END mark
                const positionEnd = data.indexOf(SLIP_END);
                if (positionEnd === -1) {
                    // No end found -> take complete buffer
                    this.queue.push(data);
                    return;
                }
                this.state = KLF200SocketProtocolState.Invalid;
                this.queue.push(data.subarray(0, positionEnd + 1));
                const frameBuffer = Buffer.concat(this.queue);
                // Clear queue and process remaining data, if any
                this.queue = [];
                await this.send(frameBuffer);
                if (positionEnd + 1 < data.byteLength)
                    await this.processData(data.subarray(positionEnd + 1));
                break;
            default:
                break;
        }
    }
    onSocketClose(_had_error) { }
    on(handler) {
        return this._onFrameReceived.on(handler);
    }
    off(handler) {
        this._onFrameReceived.off(handler);
    }
    once(handler) {
        this._onFrameReceived.once(handler);
    }
    onDataSent(handler) {
        return this._onDataSent.on(handler);
    }
    onDataReceived(handler) {
        return this._onDataReceived.on(handler);
    }
    offDataSent(handler) {
        this._onDataSent.off(handler);
    }
    offDataReceived(handler) {
        this._onDataReceived.off(handler);
    }
    onError(handler) {
        return this._onError.on(handler);
    }
    offError(handler) {
        this._onError.off(handler);
    }
    async send(data) {
        try {
            debug(`Method send: data: ${JSON.stringify(data)}`);
            await this._onDataReceived.emit(data);
            const frameBuffer = KLF200Protocol.Decode(SLIPProtocol.Decode(data));
            debug(`Method send: decoded frame buffer: ${JSON.stringify(frameBuffer)}`);
            const frame = await FrameRcvFactory.CreateRcvFrame(frameBuffer);
            debug(`Method send: converted into frame ${frame.constructor.name}: ${JSON.stringify(frame)}`);
            await this._onFrameReceived.emit(frame);
            debug(`Method send: after emitting on events for frame ${frame.constructor.name}: ${JSON.stringify(frame)}`);
            return Promise.resolve();
        }
        catch (e) {
            await this._onError.emit(e);
            return Promise.resolve();
        }
    }
    async write(data) {
        await this._onDataSent.emit(data);
        const slipBuffer = SLIPProtocol.Encode(KLF200Protocol.Encode(data));
        return this.socket.write(slipBuffer);
    }
}
//# sourceMappingURL=KLF200SocketProtocol.js.map