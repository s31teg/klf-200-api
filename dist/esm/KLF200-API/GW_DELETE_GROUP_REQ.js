"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_DELETE_GROUP_REQ extends GW_FRAME_REQ {
    GroupID;
    constructor(GroupID) {
        super(1);
        this.GroupID = GroupID;
        this.Data.writeUInt8(this.GroupID, this.offset);
    }
}
//# sourceMappingURL=GW_DELETE_GROUP_REQ.js.map