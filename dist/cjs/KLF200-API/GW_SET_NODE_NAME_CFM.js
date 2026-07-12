"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_SET_NODE_NAME_CFM = void 0;
const common_js_1 = require("./common.js");
class GW_SET_NODE_NAME_CFM extends common_js_1.GW_FRAME_CFM {
    Status;
    NodeID;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
        this.NodeID = this.Data.readUInt8(1);
    }
    getError() {
        switch (this.Status) {
            case common_js_1.GW_COMMON_STATUS.SUCCESS:
                throw new Error("No error.");
            case common_js_1.GW_COMMON_STATUS.ERROR:
                return "Request failed.";
            case common_js_1.GW_COMMON_STATUS.INVALID_NODE_ID:
                return "Invalid node ID.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
exports.GW_SET_NODE_NAME_CFM = GW_SET_NODE_NAME_CFM;
//# sourceMappingURL=GW_SET_NODE_NAME_CFM.js.map