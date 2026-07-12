import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_GET_NODE_INFORMATION_REQ extends GW_FRAME_REQ {
    readonly NodeID: number;
    readonly Command: GatewayCommand.GW_GET_NODE_INFORMATION_REQ;
    constructor(NodeID: number);
}
