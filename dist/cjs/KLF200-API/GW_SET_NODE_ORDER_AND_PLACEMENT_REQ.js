"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_SET_NODE_ORDER_AND_PLACEMENT_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_SET_NODE_ORDER_AND_PLACEMENT_REQ extends common_js_1.GW_FRAME_REQ {
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
exports.GW_SET_NODE_ORDER_AND_PLACEMENT_REQ = GW_SET_NODE_ORDER_AND_PLACEMENT_REQ;
//# sourceMappingURL=GW_SET_NODE_ORDER_AND_PLACEMENT_REQ.js.map