"use strict";
import { GW_FRAME_NTF } from "./common.js";
export class GW_RECORD_SCENE_NTF extends GW_FRAME_NTF {
    Status;
    SceneID;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.SceneID = this.Data.readUInt8(1);
    }
}
//# sourceMappingURL=GW_RECORD_SCENE_NTF.js.map