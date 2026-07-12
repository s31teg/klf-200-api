"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_SET_NODE_NAME_REQ extends GW_FRAME_REQ {
    NodeID;
    Name;
    constructor(NodeID, Name) {
        super(65);
        this.NodeID = NodeID;
        this.Name = Name;
        if (this.Name.length > 64) {
            throw new Error("Name too long. Max. 64 characters allowed.");
        }
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt8(this.NodeID, 0);
        buff.write(this.Name, 1, 64, "utf8");
    }
}
//# sourceMappingURL=GW_SET_NODE_NAME_REQ.js.map