import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_GET_GROUP_INFORMATION_REQ extends GW_FRAME_REQ {
    readonly GroupID: number;
    readonly Command: GatewayCommand.GW_GET_GROUP_INFORMATION_REQ;
    constructor(GroupID: number);
}
