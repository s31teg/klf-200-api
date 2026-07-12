"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_RECORD_SCENE_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_RECORD_SCENE_REQ extends common_js_1.GW_FRAME_REQ {
    Name;
    constructor(Name) {
        super(64);
        this.Name = Name;
        if (Buffer.from(Name).byteLength > 64)
            throw new Error("Name too long.");
        const buff = this.Data.subarray(this.offset);
        buff.write(this.Name, 0);
    }
}
exports.GW_RECORD_SCENE_REQ = GW_RECORD_SCENE_REQ;
//# sourceMappingURL=GW_RECORD_SCENE_REQ.js.map