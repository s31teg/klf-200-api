"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_LIMITATION_STATUS_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_GET_LIMITATION_STATUS_REQ extends common_js_1.GW_FRAME_COMMAND_REQ {
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
exports.GW_GET_LIMITATION_STATUS_REQ = GW_GET_LIMITATION_STATUS_REQ;
//# sourceMappingURL=GW_GET_LIMITATION_STATUS_REQ.js.map