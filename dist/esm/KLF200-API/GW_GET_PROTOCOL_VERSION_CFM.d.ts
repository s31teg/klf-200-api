import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
export declare class GW_GET_PROTOCOL_VERSION_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_PROTOCOL_VERSION_CFM;
    readonly MajorVersion: number;
    readonly MinorVersion: number;
    constructor(Data: Buffer);
}
