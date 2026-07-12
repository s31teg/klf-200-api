"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const common_js_1 = require("./common.js");
class GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ extends common_js_1.GW_FRAME_REQ {
    ActivateConfigurationNodes;
    constructor(ActivateConfigurationNodes) {
        super(26);
        this.ActivateConfigurationNodes = ActivateConfigurationNodes;
        const buff = this.Data.subarray(this.offset);
        (0, BitArray_js_1.arrayToBitArray)(this.ActivateConfigurationNodes, 26, buff);
    }
}
exports.GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ = GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ;
//# sourceMappingURL=GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ.js.map