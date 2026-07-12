import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
import { NodeVariation } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_SET_NODE_VARIATION_REQ extends GW_FRAME_REQ {
    readonly NodeID: number;
    readonly NodeVariation: NodeVariation;
    readonly Command: GatewayCommand.GW_SET_NODE_VARIATION_REQ;
    constructor(NodeID: number, NodeVariation?: NodeVariation);
}
