"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_SCENE_LIST_CFM = void 0;
const common_js_1 = require("./common.js");
class GW_GET_SCENE_LIST_CFM extends common_js_1.GW_FRAME_CFM {
    NumberOfScenes;
    constructor(Data) {
        super(Data);
        this.NumberOfScenes = this.Data.readUInt8(0);
    }
}
exports.GW_GET_SCENE_LIST_CFM = GW_GET_SCENE_LIST_CFM;
//# sourceMappingURL=GW_GET_SCENE_LIST_CFM.js.map