"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_SET_NODE_ORDER_AND_PLACEMENT_REQ extends GW_FRAME_REQ {
    NodeID;
    Order;
    Placement;
    constructor(NodeID, Order, Placement) {
        super(4);
        this.NodeID = NodeID;
        this.Order = Order;
        this.Placement = Placement;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt8(this.NodeID, 0);
        buff.writeUInt16BE(this.Order, 1);
        buff.writeUInt8(this.Placement, 3);
    }
}
//# sourceMappingURL=GW_SET_NODE_ORDER_AND_PLACEMENT_REQ.js.map