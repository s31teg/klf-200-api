"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_NODE_INFORMATION_CHANGED_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_NODE_INFORMATION_CHANGED_NTF extends common_js_1.GW_FRAME_NTF {
    NodeID;
    Order;
    Placement;
    Name;
    NodeVariation;
    constructor(Data) {
        super(Data);
        this.NodeID = this.Data.readUInt8(0);
        this.Name = (0, common_js_1.readZString)(this.Data.subarray(1, 65));
        this.Order = this.Data.readUInt16BE(65);
        this.Placement = this.Data.readUInt8(67);
        this.NodeVariation = this.Data.readUInt8(68);
    }
}
exports.GW_NODE_INFORMATION_CHANGED_NTF = GW_NODE_INFORMATION_CHANGED_NTF;
//# sourceMappingURL=GW_NODE_INFORMATION_CHANGED_NTF.js.map