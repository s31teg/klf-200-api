"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const common_js_1 = require("./common.js");
class GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM extends common_js_1.GW_FRAME_CFM {
    ActivatedNodes;
    NoContactNodes;
    OtherErrorNodes;
    Status;
    constructor(Data) {
        super(Data);
        this.ActivatedNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(0, 26));
        this.NoContactNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(26, 52));
        this.OtherErrorNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(52, 78));
        this.Status = this.Data.readUInt8(78);
    }
    getError() {
        switch (this.Status) {
            case 0:
                throw new Error("No error.");
            default:
                return `Error code ${this.Status.toString()}.`;
        }
    }
}
exports.GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM = GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM;
//# sourceMappingURL=GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM.js.map