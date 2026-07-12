"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_INITIALIZE_SCENE_NTF = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const common_js_1 = require("./common.js");
class GW_INITIALIZE_SCENE_NTF extends common_js_1.GW_FRAME_NTF {
    Status;
    FailedNodes;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.FailedNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(1, 26));
    }
}
exports.GW_INITIALIZE_SCENE_NTF = GW_INITIALIZE_SCENE_NTF;
//# sourceMappingURL=GW_INITIALIZE_SCENE_NTF.js.map