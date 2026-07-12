"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_RENAME_SCENE_REQ extends GW_FRAME_REQ {
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
//# sourceMappingURL=GW_RENAME_SCENE_REQ.js.map