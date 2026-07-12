"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_CONTROLLER_COPY_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_CS_CONTROLLER_COPY_REQ extends common_js_1.GW_FRAME_REQ {
    ControllerCopyMode;
    constructor(ControllerCopyMode) {
        super(1);
        this.ControllerCopyMode = ControllerCopyMode;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt8(this.ControllerCopyMode, 0);
    }
}
exports.GW_CS_CONTROLLER_COPY_REQ = GW_CS_CONTROLLER_COPY_REQ;
//# sourceMappingURL=GW_CS_CONTROLLER_COPY_REQ.js.map