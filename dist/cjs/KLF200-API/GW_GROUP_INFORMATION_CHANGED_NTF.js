"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GROUP_INFORMATION_CHANGED_NTF = exports.ChangeType = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const GW_GROUPS_js_1 = require("./GW_GROUPS.js");
const common_js_1 = require("./common.js");
var ChangeType;
(function (ChangeType) {
    ChangeType[ChangeType["Deleted"] = 0] = "Deleted";
    ChangeType[ChangeType["Modified"] = 1] = "Modified";
})(ChangeType || (exports.ChangeType = ChangeType = {}));
class GW_GROUP_INFORMATION_CHANGED_NTF extends common_js_1.GW_FRAME_NTF {
    GroupID;
    ChangeType;
    Order;
    Placement;
    Name;
    Velocity;
    NodeVariation;
    GroupType;
    Nodes;
    Revision;
    constructor(Data) {
        super(Data);
        this.ChangeType = this.Data.readUInt8(0);
        this.GroupID = this.Data.readUInt8(1);
        if (this.ChangeType === ChangeType.Modified) {
            this.Order = this.Data.readUInt16BE(2);
            this.Placement = this.Data.readUInt8(4);
            this.Name = (0, common_js_1.readZString)(this.Data.subarray(5, 69));
            this.Velocity = this.Data.readUInt8(69);
            this.NodeVariation = this.Data.readUInt8(70);
            this.GroupType = this.Data.readUInt8(71);
            this.Revision = this.Data.readUInt16BE(98);
            if (this.GroupType === GW_GROUPS_js_1.GroupType.UserGroup) {
                this.Nodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(73, 98));
            }
            else {
                this.Nodes = [];
            }
        }
    }
}
exports.GW_GROUP_INFORMATION_CHANGED_NTF = GW_GROUP_INFORMATION_CHANGED_NTF;
//# sourceMappingURL=GW_GROUP_INFORMATION_CHANGED_NTF.js.map