"use strict";
import { GW_FRAME_REQ } from "./common.js";
import { PriorityLevelInformation } from "./GW_COMMAND.js";
export class GW_SET_CONTACT_INPUT_LINK_REQ extends GW_FRAME_REQ {
    ContactInputID;
    ContactInputAssignment;
    SuccessOutputID;
    ErrorOutputID;
    Position;
    Velocity;
    ActionID;
    PriorityLevel;
    CommandOriginator;
    ParameterActive;
    LockPriorityLevel;
    PLI3;
    PLI4;
    PLI5;
    PLI6;
    PLI7;
    constructor(ContactInputID, ContactInputAssignment, SuccessOutputID, ErrorOutputID, Position, Velocity = 0, ActionID, PriorityLevel = 3, CommandOriginator = 1, ParameterActive = 0, LockPriorityLevel = 0, PLI3 = PriorityLevelInformation.KeepCurrent, PLI4 = PriorityLevelInformation.KeepCurrent, PLI5 = PriorityLevelInformation.KeepCurrent, PLI6 = PriorityLevelInformation.KeepCurrent, PLI7 = PriorityLevelInformation.KeepCurrent) {
        super(17);
        this.ContactInputID = ContactInputID;
        this.ContactInputAssignment = ContactInputAssignment;
        this.SuccessOutputID = SuccessOutputID;
        this.ErrorOutputID = ErrorOutputID;
        this.Position = Position;
        this.Velocity = Velocity;
        this.ActionID = ActionID;
        this.PriorityLevel = PriorityLevel;
        this.CommandOriginator = CommandOriginator;
        this.ParameterActive = ParameterActive;
        this.LockPriorityLevel = LockPriorityLevel;
        this.PLI3 = PLI3;
        this.PLI4 = PLI4;
        this.PLI5 = PLI5;
        this.PLI6 = PLI6;
        this.PLI7 = PLI7;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt8(this.ContactInputID, 0);
        buff.writeUInt8(this.ContactInputAssignment, 1);
        buff.writeUInt8(this.ActionID, 2);
        buff.writeUInt8(this.CommandOriginator, 3);
        buff.writeUInt8(this.PriorityLevel, 4);
        buff.writeUInt8(this.ParameterActive, 5);
        buff.writeUInt16BE(this.Position, 6);
        buff.writeUInt8(this.Velocity, 8);
        buff.writeUInt8(this.LockPriorityLevel, 9);
        buff.writeUInt8(this.PLI3, 10);
        buff.writeUInt8(this.PLI4, 11);
        buff.writeUInt8(this.PLI5, 12);
        buff.writeUInt8(this.PLI6, 13);
        buff.writeUInt8(this.PLI7, 14);
        buff.writeUInt8(this.SuccessOutputID, 15);
        buff.writeUInt8(this.ErrorOutputID, 16);
    }
}
//# sourceMappingURL=GW_SET_CONTACT_INPUT_LINK_REQ.js.map