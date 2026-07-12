"use strict";
import { GW_FRAME_COMMAND_REQ } from "./common.js";
export class GW_GET_LIMITATION_STATUS_REQ extends GW_FRAME_COMMAND_REQ {
    Nodes;
    LimitationType;
    ParameterActive;
    constructor(Nodes, LimitationType, ParameterActive = 0) {
        super(25);
        this.Nodes = Nodes;
        this.LimitationType = LimitationType;
        this.ParameterActive = ParameterActive;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt16BE(this.SessionID, 0);
        buff.writeUInt8(this.ParameterActive, 23);
        buff.writeUInt8(this.LimitationType, 24);
        // Multiple nodes are provided
        if (Array.isArray(this.Nodes)) {
            if (this.Nodes.length > 20)
                throw new Error("Too many nodes.");
            buff.writeUInt8(this.Nodes.length, 2);
            for (let nodeIndex = 0; nodeIndex < this.Nodes.length; nodeIndex++) {
                const node = this.Nodes[nodeIndex];
                buff.writeUInt8(node, 3 + nodeIndex);
            }
        }
        else {
            buff.writeUInt8(1, 2);
            buff.writeUInt8(this.Nodes, 3);
        }
    }
}
//# sourceMappingURL=GW_GET_LIMITATION_STATUS_REQ.js.map