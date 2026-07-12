"use strict";
import { GW_FRAME_NTF } from "./common.js";
export class GW_GROUP_DELETED_NTF extends GW_FRAME_NTF {
    GroupID;
    constructor(Data) {
        super(Data);
        this.GroupID = this.Data.readUInt8(0);
    }
}
//# sourceMappingURL=GW_GROUP_DELETED_NTF.js.map