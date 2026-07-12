import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare class GW_WINK_SEND_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_WINK_SEND_NTF;
    readonly SessionID: number;
    constructor(Data: Buffer);
}
