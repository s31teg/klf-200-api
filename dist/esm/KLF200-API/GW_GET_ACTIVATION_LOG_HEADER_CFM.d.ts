import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
export declare class GW_GET_ACTIVATION_LOG_HEADER_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_ACTIVATION_LOG_HEADER_CFM;
    readonly MaxLineCount: number;
    readonly LineCount: number;
    constructor(Data: Buffer);
}
