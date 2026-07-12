"use strict";
import { GW_FRAME_NTF } from "./common.js";
export class GW_COMMAND_REMAINING_TIME_NTF extends GW_FRAME_NTF {
    SessionID;
    NodeID;
    NodeParameter;
    RemainingTime;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.NodeID = this.Data.readUInt8(2);
        this.NodeParameter = this.Data.readUInt8(3);
        this.RemainingTime = this.Data.readUInt16BE(4);
    }
}
//# sourceMappingURL=GW_COMMAND_REMAINING_TIME_NTF.js.map