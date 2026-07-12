"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_GET_SCENE_INFORMATION_REQ extends GW_FRAME_REQ {
    SceneID;
    constructor(SceneID) {
        super(1);
        this.SceneID = SceneID;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt8(this.SceneID, 0);
    }
}
//# sourceMappingURL=GW_GET_SCENE_INFORMATION_REQ.js.map