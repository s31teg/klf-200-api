"use strict";
import { GW_COMMON_STATUS, GW_FRAME_CFM } from "./common.js";
export class GW_PASSWORD_CHANGE_CFM extends GW_FRAME_CFM {
    Status;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
    }
    getError() {
        switch (this.Status) {
            case GW_COMMON_STATUS.SUCCESS:
                throw new Error("No error.");
            case GW_COMMON_STATUS.ERROR:
                return "Request failed.";
            case GW_COMMON_STATUS.INVALID_NODE_ID:
                return "Invalid ID.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
//# sourceMappingURL=GW_PASSWORD_CHANGE_CFM.js.map