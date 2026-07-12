"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ extends common_js_1.GW_FRAME_REQ {
    TimeStamp;
    constructor(TimeStamp) {
        super(4);
        this.TimeStamp = TimeStamp;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt32BE(this.TimeStamp.valueOf() / 1000, 0);
    }
}
exports.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ = GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ;
//# sourceMappingURL=GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ.js.map