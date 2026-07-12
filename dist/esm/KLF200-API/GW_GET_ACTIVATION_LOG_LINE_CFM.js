"use strict";
import { GW_FRAME_CFM } from "./common.js";
export class GW_GET_ACTIVATION_LOG_LINE_CFM extends GW_FRAME_CFM {
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
//# sourceMappingURL=GW_GET_ACTIVATION_LOG_LINE_CFM.js.map