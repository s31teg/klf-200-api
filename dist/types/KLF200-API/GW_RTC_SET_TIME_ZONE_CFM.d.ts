import { GatewayCommand, GW_FRAME_CFM, GW_INVERSE_STATUS } from "./common.js";
export declare class GW_RTC_SET_TIME_ZONE_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_RTC_SET_TIME_ZONE_CFM;
    readonly Status: GW_INVERSE_STATUS;
    constructor(Data: Buffer);
    getError(): string;
}
