"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_GET_NODE_INFORMATION_REQ extends GW_FRAME_REQ {
    NodeID;
    constructor(NodeID) {
        super(1);
        this.NodeID = NodeID;
        this.Data.writeUInt8(this.NodeID, this.offset);
    }
}
//# sourceMappingURL=GW_GET_NODE_INFORMATION_REQ.js.map