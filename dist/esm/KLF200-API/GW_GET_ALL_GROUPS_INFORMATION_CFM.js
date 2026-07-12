"use strict";
import { GW_COMMON_STATUS, GW_FRAME_CFM } from "./common.js";
export class GW_GET_ALL_GROUPS_INFORMATION_CFM extends GW_FRAME_CFM {
    Status;
    NumberOfGroups;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.NumberOfGroups = this.Data.readUInt8(1);
    }
    getError() {
        switch (this.Status) {
            case GW_COMMON_STATUS.SUCCESS:
                throw new Error("No error.");
            case GW_COMMON_STATUS.ERROR:
                return "Request failed.";
            case GW_COMMON_STATUS.INVALID_NODE_ID:
                return "No groups available.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
//# sourceMappingURL=GW_GET_ALL_GROUPS_INFORMATION_CFM.js.map