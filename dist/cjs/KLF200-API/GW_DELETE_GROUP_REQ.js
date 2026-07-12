"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_DELETE_GROUP_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_DELETE_GROUP_REQ extends common_js_1.GW_FRAME_REQ {
    GroupID;
    constructor(GroupID) {
        super(1);
        this.GroupID = GroupID;
        this.Data.writeUInt8(this.GroupID, this.offset);
    }
}
exports.GW_DELETE_GROUP_REQ = GW_DELETE_GROUP_REQ;
//# sourceMappingURL=GW_DELETE_GROUP_REQ.js.map