"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_NTF extends common_js_1.GW_FRAME_NTF {
    TimeStamp;
    SessionID;
    StatusOwner;
    NodeID;
    NodeParameter;
    ParameterValue;
    RunStatus;
    StatusReply;
    InformationCode;
    constructor(Data) {
        super(Data);
        this.TimeStamp = new Date(this.Data.readUInt32BE(0) * 1000);
        this.SessionID = this.Data.readUInt16BE(4);
        this.StatusOwner = this.Data.readUInt8(6);
        this.NodeID = this.Data.readUInt8(7);
        this.NodeParameter = this.Data.readUInt8(8);
        this.ParameterValue = this.Data.readUInt16BE(9);
        this.RunStatus = this.Data.readUInt8(11);
        this.StatusReply = this.Data.readUInt8(12);
        this.InformationCode = this.Data.readUInt32BE(13);
    }
}
exports.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_NTF = GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_NTF;
//# sourceMappingURL=GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_NTF.js.map