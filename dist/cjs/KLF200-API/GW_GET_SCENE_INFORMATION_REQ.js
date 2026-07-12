"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_SCENE_INFORMATION_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_GET_SCENE_INFORMATION_REQ extends common_js_1.GW_FRAME_REQ {
    SceneID;
    constructor(SceneID) {
        super(1);
        this.SceneID = SceneID;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt8(this.SceneID, 0);
    }
}
exports.GW_GET_SCENE_INFORMATION_REQ = GW_GET_SCENE_INFORMATION_REQ;
//# sourceMappingURL=GW_GET_SCENE_INFORMATION_REQ.js.map