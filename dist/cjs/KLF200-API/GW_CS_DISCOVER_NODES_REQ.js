"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_DISCOVER_NODES_REQ = void 0;
const common_js_1 = require("./common.js");
const GW_SYSTEMTABLE_DATA_js_1 = require("./GW_SYSTEMTABLE_DATA.js");
class GW_CS_DISCOVER_NODES_REQ extends common_js_1.GW_FRAME_REQ {
    NodeType;
    constructor(NodeType = GW_SYSTEMTABLE_DATA_js_1.ActuatorType.NO_TYPE) {
        super(1);
        this.NodeType = NodeType;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt8(this.NodeType, 0);
    }
}
exports.GW_CS_DISCOVER_NODES_REQ = GW_CS_DISCOVER_NODES_REQ;
//# sourceMappingURL=GW_CS_DISCOVER_NODES_REQ.js.map