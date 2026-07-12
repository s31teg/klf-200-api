import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_SET_NODE_ORDER_AND_PLACEMENT_REQ extends GW_FRAME_REQ {
    readonly NodeID: number;
    readonly Order: number;
    readonly Placement: number;
    readonly Command: GatewayCommand.GW_SET_NODE_ORDER_AND_PLACEMENT_REQ;
    constructor(NodeID: number, Order: number, Placement: number);
}
