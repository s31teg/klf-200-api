"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_SCENE_LIST_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_GET_SCENE_LIST_NTF extends common_js_1.GW_FRAME_NTF {
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
                Name: (0, common_js_1.readZString)(this.Data.subarray(sceneIndex * 65 + 2, sceneIndex * 65 + 66)),
            });
        }
    }
}
exports.GW_GET_SCENE_LIST_NTF = GW_GET_SCENE_LIST_NTF;
//# sourceMappingURL=GW_GET_SCENE_LIST_NTF.js.map