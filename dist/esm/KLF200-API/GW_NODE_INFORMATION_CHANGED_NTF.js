"use strict";
import { GW_FRAME_NTF, readZString } from "./common.js";
export class GW_NODE_INFORMATION_CHANGED_NTF extends GW_FRAME_NTF {
    NodeID;
    Order;
    Placement;
    Name;
    NodeVariation;
    constructor(Data) {
        super(Data);
        this.NodeID = this.Data.readUInt8(0);
        this.Name = readZString(this.Data.subarray(1, 65));
        this.Order = this.Data.readUInt16BE(65);
        this.Placement = this.Data.readUInt8(67);
        this.NodeVariation = this.Data.readUInt8(68);
    }
}
//# sourceMappingURL=GW_NODE_INFORMATION_CHANGED_NTF.js.map