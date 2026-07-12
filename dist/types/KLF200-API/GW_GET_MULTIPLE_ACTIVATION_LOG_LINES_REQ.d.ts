import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ extends GW_FRAME_REQ {
    readonly TimeStamp: Date;
    readonly Command: GatewayCommand.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ;
    constructor(TimeStamp: Date);
}
