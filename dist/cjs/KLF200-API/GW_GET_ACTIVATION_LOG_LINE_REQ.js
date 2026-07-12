"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_ACTIVATION_LOG_LINE_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_GET_ACTIVATION_LOG_LINE_REQ extends common_js_1.GW_FRAME_REQ {
    Line;
    constructor(Line) {
        super(2);
        this.Line = Line;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt16BE(this.Line, 0);
    }
}
exports.GW_GET_ACTIVATION_LOG_LINE_REQ = GW_GET_ACTIVATION_LOG_LINE_REQ;
//# sourceMappingURL=GW_GET_ACTIVATION_LOG_LINE_REQ.js.map