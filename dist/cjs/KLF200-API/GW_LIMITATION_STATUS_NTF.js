"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_LIMITATION_STATUS_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_LIMITATION_STATUS_NTF extends common_js_1.GW_FRAME_NTF {
    SessionID;
    NodeID;
    ParameterID;
    LimitationValueMin;
    LimitationValueMax;
    LimitationOriginator;
    LimitationTime;
    constructor(Data) {
        super(Data);
        this.SessionID = this.Data.readUInt16BE(0);
        this.NodeID = this.Data.readUInt8(2);
        this.ParameterID = this.Data.readUInt8(3);
        this.LimitationValueMin = this.Data.readUInt16BE(4);
        this.LimitationValueMax = this.Data.readUInt16BE(6);
        this.LimitationOriginator = this.Data.readUInt8(8);
        this.LimitationTime = this.Data.readUInt8(9);
    }
}
exports.GW_LIMITATION_STATUS_NTF = GW_LIMITATION_STATUS_NTF;
//# sourceMappingURL=GW_LIMITATION_STATUS_NTF.js.map