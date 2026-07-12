"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_GET_ALL_GROUPS_INFORMATION_REQ extends GW_FRAME_REQ {
    constructor(GroupType) {
        super(2);
        if (typeof GroupType !== "undefined") {
            this._useFilter = true;
            this._groupType = GroupType;
            this.Data.writeUInt8(1, this.offset);
            this.Data.writeUInt8(this._groupType, this.offset + 1);
        }
    }
    _useFilter = false;
    get UseFilter() {
        return this._useFilter;
    }
    _groupType = 0;
    get GroupType() {
        return this._groupType;
    }
}
//# sourceMappingURL=GW_GET_ALL_GROUPS_INFORMATION_REQ.js.map