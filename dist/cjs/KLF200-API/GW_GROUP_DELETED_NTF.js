"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GROUP_DELETED_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_GROUP_DELETED_NTF extends common_js_1.GW_FRAME_NTF {
    GroupID;
    constructor(Data) {
        super(Data);
        this.GroupID = this.Data.readUInt8(0);
    }
}
exports.GW_GROUP_DELETED_NTF = GW_GROUP_DELETED_NTF;
//# sourceMappingURL=GW_GROUP_DELETED_NTF.js.map