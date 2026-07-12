"use strict";
import { GW_FRAME_CFM } from "./common.js";
import { ActivateProductGroupStatus } from "./GW_COMMAND.js";
export class GW_ACTIVATE_PRODUCTGROUP_CFM extends GW_FRAME_CFM {
    SessionID;
    Status;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.Status = this.Data.readUInt8(2);
    }
    getError() {
        switch (this.Status) {
            case ActivateProductGroupStatus.OK:
                return "No error.";
            case ActivateProductGroupStatus.UnknownProductGroup:
                return "Unknown product group.";
            case ActivateProductGroupStatus.SessionIDInUse:
                return "Session ID in use.";
            case ActivateProductGroupStatus.Busy:
                return "Busy.";
            case ActivateProductGroupStatus.WrongGroupType:
                return "Wrong group type.";
            case ActivateProductGroupStatus.Failed:
                return "Failed.";
            case ActivateProductGroupStatus.InvalidParameterUsed:
                return "Invalid parameter.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
//# sourceMappingURL=GW_ACTIVATE_PRODUCTGROUP_CFM.js.map