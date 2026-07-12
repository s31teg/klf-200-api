"use strict";
import { GW_FRAME_CFM } from "./common.js";
import { RenameSceneStatus } from "./GW_SCENES.js";
export class GW_RENAME_SCENE_CFM extends GW_FRAME_CFM {
    Status;
    SceneID;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.SceneID = this.Data.readUInt8(1);
    }
    getError() {
        switch (this.Status) {
            case RenameSceneStatus.OK:
                throw new Error("No error.");
            case RenameSceneStatus.NameInUse:
                return "Name in use.";
            case RenameSceneStatus.InvalidSceneIndex:
                return "Invalid scene ID.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
//# sourceMappingURL=GW_RENAME_SCENE_CFM.js.map