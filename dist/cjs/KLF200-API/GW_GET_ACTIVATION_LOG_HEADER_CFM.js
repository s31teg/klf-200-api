"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_ACTIVATION_LOG_HEADER_CFM = void 0;
const common_js_1 = require("./common.js");
class GW_GET_ACTIVATION_LOG_HEADER_CFM extends common_js_1.GW_FRAME_CFM {
    MaxLineCount;
    LineCount;
    constructor(Data) {
        super(Data);
        this.MaxLineCount = this.Data.readUInt16BE(0);
        this.LineCount = this.Data.readUInt16BE(2);
    }
}
exports.GW_GET_ACTIVATION_LOG_HEADER_CFM = GW_GET_ACTIVATION_LOG_HEADER_CFM;
//# sourceMappingURL=GW_GET_ACTIVATION_LOG_HEADER_CFM.js.map