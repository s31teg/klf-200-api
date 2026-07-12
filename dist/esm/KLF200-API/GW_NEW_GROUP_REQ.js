"use strict";
import { arrayToBitArray } from "../utils/BitArray.js";
import { GW_FRAME_REQ } from "./common.js";
export class GW_NEW_GROUP_REQ extends GW_FRAME_REQ {
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
        arrayToBitArray(this.Nodes, 25, buff.subarray(71, 96));
    }
}
//# sourceMappingURL=GW_NEW_GROUP_REQ.js.map