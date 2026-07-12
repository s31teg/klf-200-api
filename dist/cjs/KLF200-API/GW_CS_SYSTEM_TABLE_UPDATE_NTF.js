"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_SYSTEM_TABLE_UPDATE_NTF = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const common_js_1 = require("./common.js");
class GW_CS_SYSTEM_TABLE_UPDATE_NTF extends common_js_1.GW_FRAME_NTF {
    AddedNodes;
    RemovedNodes;
    constructor(Data) {
        super(Data);
        // Added nodes
        this.AddedNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(0, 26));
        // Removed nodes
        this.RemovedNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(26, 52));
    }
}
exports.GW_CS_SYSTEM_TABLE_UPDATE_NTF = GW_CS_SYSTEM_TABLE_UPDATE_NTF;
//# sourceMappingURL=GW_CS_SYSTEM_TABLE_UPDATE_NTF.js.map