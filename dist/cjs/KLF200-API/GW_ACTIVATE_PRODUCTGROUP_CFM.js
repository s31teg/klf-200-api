"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_ACTIVATE_PRODUCTGROUP_CFM = void 0;
const common_js_1 = require("./common.js");
const GW_COMMAND_js_1 = require("./GW_COMMAND.js");
class GW_ACTIVATE_PRODUCTGROUP_CFM extends common_js_1.GW_FRAME_CFM {
    SessionID;
    Status;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.Status = this.Data.readUInt8(2);
    }
    getError() {
        switch (this.Status) {
            case GW_COMMAND_js_1.ActivateProductGroupStatus.OK:
                return "No error.";
            case GW_COMMAND_js_1.ActivateProductGroupStatus.UnknownProductGroup:
                return "Unknown product group.";
            case GW_COMMAND_js_1.ActivateProductGroupStatus.SessionIDInUse:
                return "Session ID in use.";
            case GW_COMMAND_js_1.ActivateProductGroupStatus.Busy:
                return "Busy.";
            case GW_COMMAND_js_1.ActivateProductGroupStatus.WrongGroupType:
                return "Wrong group type.";
            case GW_COMMAND_js_1.ActivateProductGroupStatus.Failed:
                return "Failed.";
            case GW_COMMAND_js_1.ActivateProductGroupStatus.InvalidParameterUsed:
                return "Invalid parameter.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
exports.GW_ACTIVATE_PRODUCTGROUP_CFM = GW_ACTIVATE_PRODUCTGROUP_CFM;
//# sourceMappingURL=GW_ACTIVATE_PRODUCTGROUP_CFM.js.map