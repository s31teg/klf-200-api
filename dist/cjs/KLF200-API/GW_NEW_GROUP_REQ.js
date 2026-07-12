"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_NEW_GROUP_REQ = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const common_js_1 = require("./common.js");
class GW_NEW_GROUP_REQ extends common_js_1.GW_FRAME_REQ {
    Name;
    GroupType;
    Nodes;
    Order;
    Placement;
    Velocity;
    NodeVariation;
    constructor(Name, GroupType, Nodes, Order = 0, Placement = 0, Velocity = 0, NodeVariation = 0) {
        super(96);
        this.Name = Name;
        this.GroupType = GroupType;
        this.Nodes = Nodes;
        this.Order = Order;
        this.Placement = Placement;
        this.Velocity = Velocity;
        this.NodeVariation = NodeVariation;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt16BE(this.Order, 0);
        buff.writeUInt8(this.Placement, 2);
        buff.write(this.Name, 3, 64, "utf8");
        buff.writeUInt8(this.Velocity, 67);
        buff.writeUInt8(this.NodeVariation, 68);
        buff.writeUInt8(this.GroupType, 69);
        buff.writeUInt8(this.Nodes.length, 70);
        (0, BitArray_js_1.arrayToBitArray)(this.Nodes, 25, buff.subarray(71, 96));
    }
}
exports.GW_NEW_GROUP_REQ = GW_NEW_GROUP_REQ;
//# sourceMappingURL=GW_NEW_GROUP_REQ.js.map