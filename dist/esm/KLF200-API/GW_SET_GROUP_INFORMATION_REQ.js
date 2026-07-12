"use strict";
import { arrayToBitArray } from "../utils/BitArray.js";
import { GW_FRAME_REQ } from "./common.js";
export class GW_SET_GROUP_INFORMATION_REQ extends GW_FRAME_REQ {
    GroupID;
    Revision;
    Name;
    GroupType;
    Nodes;
    Order;
    Placement;
    Velocity;
    NodeVariation;
    constructor(GroupID, Revision, Name, GroupType, Nodes, Order = 0, Placement = 0, Velocity = 0, NodeVariation = 0) {
        super(99);
        this.GroupID = GroupID;
        this.Revision = Revision;
        this.Name = Name;
        this.GroupType = GroupType;
        this.Nodes = Nodes;
        this.Order = Order;
        this.Placement = Placement;
        this.Velocity = Velocity;
        this.NodeVariation = NodeVariation;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt8(this.GroupID, 0);
        buff.writeUInt16BE(this.Order, 1);
        buff.writeUInt8(this.Placement, 3);
        buff.write(this.Name, 4, 64, "utf8");
        buff.writeUInt8(this.Velocity, 68);
        buff.writeUInt8(this.NodeVariation, 69);
        buff.writeUInt8(this.GroupType, 70);
        buff.writeUInt8(this.Nodes.length, 71);
        arrayToBitArray(this.Nodes, 25, buff.subarray(72, 97));
        buff.writeUInt16BE(this.Revision, 97);
    }
}
//# sourceMappingURL=GW_SET_GROUP_INFORMATION_REQ.js.map