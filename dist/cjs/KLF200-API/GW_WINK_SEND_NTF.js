"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_WINK_SEND_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_WINK_SEND_NTF extends common_js_1.GW_FRAME_NTF {
    SessionID;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
    }
}
exports.GW_WINK_SEND_NTF = GW_WINK_SEND_NTF;
//# sourceMappingURL=GW_WINK_SEND_NTF.js.map