import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare class GW_SESSION_FINISHED_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_SESSION_FINISHED_NTF;
    readonly SessionID: number;
    constructor(Data: Buffer);
}
