"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_SET_NODE_VARIATION_REQ extends GW_FRAME_REQ {
    NodeID;
    NodeVariation;
    constructor(NodeID, NodeVariation = 0) {
        super(2);
        this.NodeID = NodeID;
        this.NodeVariation = NodeVariation;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt8(this.NodeID, 0);
        buff.writeUInt8(this.NodeVariation, 1);
    }
}
//# sourceMappingURL=GW_SET_NODE_VARIATION_REQ.js.map