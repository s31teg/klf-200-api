"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_RENAME_SCENE_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_RENAME_SCENE_REQ extends common_js_1.GW_FRAME_REQ {
    SceneID;
    Name;
    constructor(SceneID, Name) {
        super(65);
        this.SceneID = SceneID;
        this.Name = Name;
        if (Buffer.from(this.Name).byteLength > 64)
            throw new Error("Name too long.");
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt8(this.SceneID, 0);
        buff.write(this.Name, 1);
    }
}
exports.GW_RENAME_SCENE_REQ = GW_RENAME_SCENE_REQ;
//# sourceMappingURL=GW_RENAME_SCENE_REQ.js.map