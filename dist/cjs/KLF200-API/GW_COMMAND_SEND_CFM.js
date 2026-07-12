"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_COMMAND_SEND_CFM = void 0;
const common_js_1 = require("./common.js");
const GW_COMMAND_js_1 = require("./GW_COMMAND.js");
class GW_COMMAND_SEND_CFM extends common_js_1.GW_FRAME_CFM {
    SessionID;
    CommandStatus;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.CommandStatus = this.Data.readUInt8(2);
    }
    getError() {
        switch (this.CommandStatus) {
            case GW_COMMAND_js_1.CommandStatus.CommandAccepted:
                return "No error.";
            case GW_COMMAND_js_1.CommandStatus.CommandRejected:
                return "Command rejected.";
            default:
                return `Unknown error ${this.CommandStatus}.`;
        }
    }
}
exports.GW_COMMAND_SEND_CFM = GW_COMMAND_SEND_CFM;
//# sourceMappingURL=GW_COMMAND_SEND_CFM.js.map