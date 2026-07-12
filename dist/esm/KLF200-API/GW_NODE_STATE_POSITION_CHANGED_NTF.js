"use strict";
import { GW_FRAME_NTF } from "./common.js";
export class GW_NODE_STATE_POSITION_CHANGED_NTF extends GW_FRAME_NTF {
    NodeID;
    OperatingState;
    CurrentPosition;
    TargetPosition;
    FunctionalPosition1CurrentPosition;
    FunctionalPosition2CurrentPosition;
    FunctionalPosition3CurrentPosition;
    FunctionalPosition4CurrentPosition;
    RemainingTime;
    TimeStamp;
    constructor(Data) {
        super(Data);
        this.NodeID = this.Data.readUInt8(0);
        this.OperatingState = this.Data.readUInt8(1);
        this.CurrentPosition = this.Data.readUInt16BE(2);
        this.TargetPosition = this.Data.readUInt16BE(4);
        this.FunctionalPosition1CurrentPosition = this.Data.readUInt16BE(6);
        this.FunctionalPosition2CurrentPosition = this.Data.readUInt16BE(8);
        this.FunctionalPosition3CurrentPosition = this.Data.readUInt16BE(10);
        this.FunctionalPosition4CurrentPosition = this.Data.readUInt16BE(12);
        this.RemainingTime = this.Data.readUInt16BE(14);
        this.TimeStamp = new Date(this.Data.readUInt32BE(16) * 1000);
    }
}
//# sourceMappingURL=GW_NODE_STATE_POSITION_CHANGED_NTF.js.map