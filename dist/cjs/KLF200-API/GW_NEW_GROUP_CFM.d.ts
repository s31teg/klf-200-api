import { GatewayCommand, GW_COMMON_STATUS, GW_FRAME_CFM } from "./common.js";
export declare class GW_NEW_GROUP_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_NEW_GROUP_CFM;
    readonly Status: GW_COMMON_STATUS;
    readonly GroupID: number;
    constructor(Data: Buffer);
    getError(): string;
}
