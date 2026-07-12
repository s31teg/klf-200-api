"use strict";
import { GW_FRAME_NTF, readZString } from "./common.js";
export class GW_GET_SCENE_LIST_NTF extends GW_FRAME_NTF {
    NumberOfScenes;
    NumberOfRemainingScenes;
    Scenes = [];
    constructor(Data) {
        super(Data);
        this.NumberOfScenes = this.Data.readUInt8(0);
        this.NumberOfRemainingScenes = this.Data.readUInt8(this.NumberOfScenes * 65 + 1);
        for (let sceneIndex = 0; sceneIndex < this.NumberOfScenes; sceneIndex++) {
            this.Scenes.push({
                SceneID: this.Data.readUInt8(sceneIndex * 65 + 1),
                Name: readZString(this.Data.subarray(sceneIndex * 65 + 2, sceneIndex * 65 + 66)),
            });
        }
    }
}
//# sourceMappingURL=GW_GET_SCENE_LIST_NTF.js.map