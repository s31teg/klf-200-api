import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_DELETE_GROUP_REQ extends GW_FRAME_REQ {
    readonly GroupID: number;
    readonly Command: GatewayCommand.GW_DELETE_GROUP_REQ;
    constructor(GroupID: number);
}
