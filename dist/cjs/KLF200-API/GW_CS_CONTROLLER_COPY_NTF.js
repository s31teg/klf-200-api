"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_CONTROLLER_COPY_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_CS_CONTROLLER_COPY_NTF extends common_js_1.GW_FRAME_NTF {
    ControllerCopyMode;
    ControllerCopyStatus;
    constructor(Data) {
        super(Data);
        this.ControllerCopyMode = this.Data.readUInt8(0);
        this.ControllerCopyStatus = this.Data.readUInt8(1);
    }
}
exports.GW_CS_CONTROLLER_COPY_NTF = GW_CS_CONTROLLER_COPY_NTF;
//# sourceMappingURL=GW_CS_CONTROLLER_COPY_NTF.js.map