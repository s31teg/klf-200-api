"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_STOP_SCENE_CFM = void 0;
const common_js_1 = require("./common.js");
const GW_SCENES_js_1 = require("./GW_SCENES.js");
class GW_STOP_SCENE_CFM extends common_js_1.GW_FRAME_CFM {
    SessionID;
    Status;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.SessionID = this.Data.readUInt16BE(1);
    }
    getError() {
        switch (this.Status) {
            case GW_SCENES_js_1.ActivateSceneStatus.OK:
                throw new Error("No error.");
            case GW_SCENES_js_1.ActivateSceneStatus.RequestRejected:
                return "Request failed.";
            case GW_SCENES_js_1.ActivateSceneStatus.InvalidParameter:
                return "Invalid parameter.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
exports.GW_STOP_SCENE_CFM = GW_STOP_SCENE_CFM;
//# sourceMappingURL=GW_STOP_SCENE_CFM.js.map