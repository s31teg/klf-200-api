"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_COMMAND_REMAINING_TIME_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_COMMAND_REMAINING_TIME_NTF extends common_js_1.GW_FRAME_NTF {
    SessionID;
    NodeID;
    NodeParameter;
    RemainingTime;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.NodeID = this.Data.readUInt8(2);
        this.NodeParameter = this.Data.readUInt8(3);
        this.RemainingTime = this.Data.readUInt16BE(4);
    }
}
exports.GW_COMMAND_REMAINING_TIME_NTF = GW_COMMAND_REMAINING_TIME_NTF;
//# sourceMappingURL=GW_COMMAND_REMAINING_TIME_NTF.js.map