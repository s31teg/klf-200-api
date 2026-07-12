"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_COMMAND_RUN_STATUS_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_COMMAND_RUN_STATUS_NTF extends common_js_1.GW_FRAME_NTF {
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
        this.SessionID = this.Data.readUInt16BE(0);
        this.StatusOwner = this.Data.readUInt8(2);
        this.NodeID = this.Data.readUInt8(3);
        this.NodeParameter = this.Data.readUInt8(4);
        this.ParameterValue = this.Data.readUInt16BE(5);
        this.RunStatus = this.Data.readUInt8(7);
        this.StatusReply = this.Data.readUInt8(8);
        this.InformationCode = this.Data.readUInt32BE(9);
    }
}
exports.GW_COMMAND_RUN_STATUS_NTF = GW_COMMAND_RUN_STATUS_NTF;
//# sourceMappingURL=GW_COMMAND_RUN_STATUS_NTF.js.map