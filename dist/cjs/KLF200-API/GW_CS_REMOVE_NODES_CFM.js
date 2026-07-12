"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_REMOVE_NODES_CFM = void 0;
const common_js_1 = require("./common.js");
class GW_CS_REMOVE_NODES_CFM extends common_js_1.GW_FRAME_CFM {
    SceneDeleted;
    constructor(Data) {
        super(Data);
        this.SceneDeleted = this.Data.readUInt8(0) === 1;
    }
}
exports.GW_CS_REMOVE_NODES_CFM = GW_CS_REMOVE_NODES_CFM;
//# sourceMappingURL=GW_CS_REMOVE_NODES_CFM.js.map