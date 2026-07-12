"use strict";
import { GW_COMMON_STATUS, GW_FRAME_CFM } from "./common.js";
export class GW_DELETE_SCENE_CFM extends GW_FRAME_CFM {
    SceneID;
    Status;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.SceneID = this.Data.readUInt8(1);
    }
    getError() {
        switch (this.Status) {
            case GW_COMMON_STATUS.SUCCESS:
                throw new Error("No error.");
            case GW_COMMON_STATUS.ERROR:
                return "Request failed.";
            case GW_COMMON_STATUS.INVALID_NODE_ID:
                return "Invalid scene ID.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
//# sourceMappingURL=GW_DELETE_SCENE_CFM.js.map