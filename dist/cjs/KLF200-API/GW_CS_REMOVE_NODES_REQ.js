"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_REMOVE_NODES_REQ = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const common_js_1 = require("./common.js");
class GW_CS_REMOVE_NODES_REQ extends common_js_1.GW_FRAME_REQ {
    Nodes;
    constructor(Nodes) {
        super(26);
        this.Nodes = Nodes;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        (0, BitArray_js_1.arrayToBitArray)(this.Nodes, 26, buff);
    }
}
exports.GW_CS_REMOVE_NODES_REQ = GW_CS_REMOVE_NODES_REQ;
//# sourceMappingURL=GW_CS_REMOVE_NODES_REQ.js.map