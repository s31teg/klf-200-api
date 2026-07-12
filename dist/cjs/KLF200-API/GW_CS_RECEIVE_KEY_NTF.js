"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_RECEIVE_KEY_NTF = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const common_js_1 = require("./common.js");
class GW_CS_RECEIVE_KEY_NTF extends common_js_1.GW_FRAME_NTF {
    ChangeKeyStatus;
    KeyChangedNodes;
    KeyNotChangedNodes;
    constructor(Data) {
        super(Data);
        this.ChangeKeyStatus = this.Data.readUInt8(0);
        this.KeyChangedNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(1, 27));
        this.KeyNotChangedNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(27, 53));
    }
}
exports.GW_CS_RECEIVE_KEY_NTF = GW_CS_RECEIVE_KEY_NTF;
//# sourceMappingURL=GW_CS_RECEIVE_KEY_NTF.js.map