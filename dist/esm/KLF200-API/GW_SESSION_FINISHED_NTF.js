"use strict";
import { GW_FRAME_NTF } from "./common.js";
export class GW_SESSION_FINISHED_NTF extends GW_FRAME_NTF {
    SessionID;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
    }
}
//# sourceMappingURL=GW_SESSION_FINISHED_NTF.js.map