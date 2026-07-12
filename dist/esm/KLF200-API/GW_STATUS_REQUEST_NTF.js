"use strict";
import { GW_FRAME_NTF } from "./common.js";
import { StatusType, } from "./GW_COMMAND.js";
export class GW_STATUS_REQUEST_NTF extends GW_FRAME_NTF {
    SessionID;
    StatusOwner;
    NodeID;
    RunStatus;
    StatusReply;
    StatusType;
    ParameterData;
    TargetPosition;
    CurrentPosition;
    RemainingTime;
    LastMasterExecutionAddress;
    LastCommandOriginator;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.StatusOwner = this.Data.readUInt8(2);
        this.NodeID = this.Data.readUInt8(3);
        this.RunStatus = this.Data.readUInt8(4);
        this.StatusReply = this.Data.readUInt8(5);
        this.StatusType = this.Data.readUInt8(6);
        switch (this.StatusType) {
            case StatusType.RequestMainInfo:
                this.TargetPosition = this.Data.readUInt16BE(7);
                this.CurrentPosition = this.Data.readUInt16BE(9);
                this.RemainingTime = this.Data.readUInt16BE(11);
                this.LastMasterExecutionAddress = this.Data.readUInt32BE(13);
                this.LastCommandOriginator = this.Data.readUInt8(17);
                break;
            case StatusType.RequestTargetPosition:
            case StatusType.RequestCurrentPosition:
            case StatusType.RequestRemainingTime: {
                const statusCount = this.Data.readUInt8(7);
                this.ParameterData = [];
                for (let statusIndex = 0; statusIndex < statusCount; statusIndex++) {
                    this.ParameterData.push({
                        ID: this.Data.readUInt8(statusIndex * 3 + 8),
                        Value: this.Data.readUInt16BE(statusIndex * 3 + 9),
                    });
                }
                break;
            }
            default:
                throw new Error("Unknown StatusType.");
        }
    }
}
//# sourceMappingURL=GW_STATUS_REQUEST_NTF.js.map