"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_RECORD_SCENE_REQ extends GW_FRAME_REQ {
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
//# sourceMappingURL=GW_RECORD_SCENE_REQ.js.map