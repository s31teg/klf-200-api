import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_SET_UTC_REQ extends GW_FRAME_REQ {
    readonly UTCTime: Date;
    readonly Command: GatewayCommand.GW_SET_UTC_REQ;
    constructor(UTCTime?: Date);
}
