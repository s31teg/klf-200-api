import { Socket } from "net";
import { Disposable, Listener } from "../utils/TypedEvent.js";
import { IGW_FRAME_RCV } from "./common.js";
export type FrameReceivedHandler = (frame: IGW_FRAME_RCV) => void;
export declare class KLF200SocketProtocol {
    readonly socket: Socket;
    private _onFrameReceived;
    private _onDataSent;
    private _onDataReceived;
    private _onError;
    private state;
    private queue;
    constructor(socket: Socket);
    private processData;
    private onSocketClose;
    on(handler: Listener<IGW_FRAME_RCV>): Disposable;
    off(handler: Listener<IGW_FRAME_RCV>): void;
    once(handler: Listener<IGW_FRAME_RCV>): void;
    onDataSent(handler: Listener<Buffer>): Disposable;
    onDataReceived(handler: Listener<Buffer>): Disposable;
    offDataSent(handler: Listener<Buffer>): void;
    offDataReceived(handler: Listener<Buffer>): void;
    onError(handler: Listener<Error>): Disposable;
    offError(handler: Listener<Error>): void;
    send(data: Buffer): Promise<void>;
    write(data: Buffer): Promise<boolean>;
}
