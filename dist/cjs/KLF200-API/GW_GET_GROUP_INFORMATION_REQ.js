"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_GROUP_INFORMATION_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_GET_GROUP_INFORMATION_REQ extends common_js_1.GW_FRAME_REQ {
    GroupID;
    constructor(GroupID) {
        super(1);
        this.GroupID = GroupID;
        this.Data.writeUInt8(this.GroupID, this.offset);
    }
}
exports.GW_GET_GROUP_INFORMATION_REQ = GW_GET_GROUP_INFORMATION_REQ;
//# sourceMappingURL=GW_GET_GROUP_INFORMATION_REQ.js.map