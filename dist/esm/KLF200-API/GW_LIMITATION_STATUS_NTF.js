"use strict";
import { GW_FRAME_NTF } from "./common.js";
export class GW_LIMITATION_STATUS_NTF extends GW_FRAME_NTF {
    SessionID;
    NodeID;
    ParameterID;
    LimitationValueMin;
    LimitationValueMax;
    LimitationOriginator;
    LimitationTime;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.NodeID = this.Data.readUInt8(2);
        this.ParameterID = this.Data.readUInt8(3);
        this.LimitationValueMin = this.Data.readUInt16BE(4);
        this.LimitationValueMax = this.Data.readUInt16BE(6);
        this.LimitationOriginator = this.Data.readUInt8(8);
        this.LimitationTime = this.Data.readUInt8(9);
    }
}
//# sourceMappingURL=GW_LIMITATION_STATUS_NTF.js.map