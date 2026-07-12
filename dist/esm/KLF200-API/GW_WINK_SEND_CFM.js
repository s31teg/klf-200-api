"use strict";
import { GW_FRAME_CFM, GW_INVERSE_STATUS } from "./common.js";
export class GW_WINK_SEND_CFM extends GW_FRAME_CFM {
    SessionID;
    Status;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.Status = this.Data.readUInt8(2);
    }
    getError() {
        switch (this.Status) {
            case GW_INVERSE_STATUS.SUCCESS:
                throw new Error("No error.");
            case GW_INVERSE_STATUS.ERROR:
                return "Request failed.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
//# sourceMappingURL=GW_WINK_SEND_CFM.js.map