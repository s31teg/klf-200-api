import { GatewayCommand, GW_COMMON_STATUS, GW_FRAME_CFM } from "./common.js";
export declare class GW_PASSWORD_ENTER_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_PASSWORD_ENTER_CFM;
    readonly Status: GW_COMMON_STATUS;
    constructor(Data: Buffer);
    getError(): string;
}
