"use strict";
import { GW_FRAME_CFM } from "./common.js";
import { CommandStatus } from "./GW_COMMAND.js";
export class GW_COMMAND_SEND_CFM extends GW_FRAME_CFM {
    SessionID;
    CommandStatus;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.CommandStatus = this.Data.readUInt8(2);
    }
    getError() {
        switch (this.CommandStatus) {
            case CommandStatus.CommandAccepted:
                return "No error.";
            case CommandStatus.CommandRejected:
                return "Command rejected.";
            default:
                return `Unknown error ${this.CommandStatus}.`;
        }
    }
}
//# sourceMappingURL=GW_COMMAND_SEND_CFM.js.map