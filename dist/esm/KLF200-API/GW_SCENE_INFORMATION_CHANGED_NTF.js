"use strict";
import { GW_FRAME_NTF } from "./common.js";
export var SceneChangeType;
(function (SceneChangeType) {
    SceneChangeType[SceneChangeType["Deleted"] = 0] = "Deleted";
    SceneChangeType[SceneChangeType["Modified"] = 1] = "Modified";
})(SceneChangeType || (SceneChangeType = {}));
export class GW_SCENE_INFORMATION_CHANGED_NTF extends GW_FRAME_NTF {
    SceneID;
    SceneChangeType;
    constructor(Data) {
        super(Data);
        this.SceneChangeType = this.Data.readUInt8(0);
        this.SceneID = this.Data.readUInt8(1);
    }
}
//# sourceMappingURL=GW_SCENE_INFORMATION_CHANGED_NTF.js.map