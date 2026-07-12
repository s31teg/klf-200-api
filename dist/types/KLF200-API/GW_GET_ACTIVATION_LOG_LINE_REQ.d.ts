import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_GET_ACTIVATION_LOG_LINE_REQ extends GW_FRAME_REQ {
    readonly Line: number;
    readonly Command: GatewayCommand.GW_GET_ACTIVATION_LOG_LINE_REQ;
    constructor(Line: number);
}
