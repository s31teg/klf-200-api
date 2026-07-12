"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_SET_UTC_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_SET_UTC_REQ extends common_js_1.GW_FRAME_REQ {
    UTCTime;
    constructor(UTCTime = new Date()) {
        super(4);
        this.UTCTime = UTCTime;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt32BE(UTCTime.valueOf() / 1000, 0);
    }
}
exports.GW_SET_UTC_REQ = GW_SET_UTC_REQ;
//# sourceMappingURL=GW_SET_UTC_REQ.js.map