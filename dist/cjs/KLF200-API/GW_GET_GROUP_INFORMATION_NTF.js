"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_GROUP_INFORMATION_NTF = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const GW_GROUPS_js_1 = require("./GW_GROUPS.js");
const common_js_1 = require("./common.js");
class GW_GET_GROUP_INFORMATION_NTF extends common_js_1.GW_FRAME_NTF {
    GroupID;
    Order;
    Placement;
    Name;
    Velocity;
    GroupType;
    NodeVariation;
    Revision;
    Nodes;
    constructor(Data) {
        super(Data);
        this.GroupID = this.Data.readUInt8(0);
        this.Order = this.Data.readUInt16BE(1);
        this.Placement = this.Data.readUInt8(3);
        this.Name = (0, common_js_1.readZString)(this.Data.subarray(4, 68));
        this.Velocity = this.Data.readUInt8(68);
        this.NodeVariation = this.Data.readUInt8(69);
        this.GroupType = this.Data.readUInt8(70);
        this.Revision = this.Data.readUInt16BE(97);
        if ([GW_GROUPS_js_1.GroupType.UserGroup, GW_GROUPS_js_1.GroupType.All].indexOf(this.GroupType) !== -1) {
            this.Nodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(72, 97));
        }
        else {
            this.Nodes = [];
        }
    }
}
exports.GW_GET_GROUP_INFORMATION_NTF = GW_GET_GROUP_INFORMATION_NTF;
//# sourceMappingURL=GW_GET_GROUP_INFORMATION_NTF.js.map