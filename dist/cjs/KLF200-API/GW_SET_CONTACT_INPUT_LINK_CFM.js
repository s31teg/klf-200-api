"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_SET_CONTACT_INPUT_LINK_CFM = void 0;
const common_js_1 = require("./common.js");
class GW_SET_CONTACT_INPUT_LINK_CFM extends common_js_1.GW_FRAME_CFM {
    ContactInputID;
    Status;
    constructor(Data) {
        super(Data);
        this.ContactInputID = this.Data.readUInt8(0);
        this.Status = this.Data.readUInt8(1);
    }
    getError() {
        switch (this.Status) {
            case common_js_1.GW_INVERSE_STATUS.SUCCESS:
                throw new Error("No error.");
            case common_js_1.GW_INVERSE_STATUS.ERROR:
                return "Request failed.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
exports.GW_SET_CONTACT_INPUT_LINK_CFM = GW_SET_CONTACT_INPUT_LINK_CFM;
//# sourceMappingURL=GW_SET_CONTACT_INPUT_LINK_CFM.js.map