"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_REMOVE_CONTACT_INPUT_LINK_REQ = void 0;
const common_js_1 = require("./common.js");
class GW_REMOVE_CONTACT_INPUT_LINK_REQ extends common_js_1.GW_FRAME_REQ {
    ContactInputID;
    constructor(ContactInputID) {
        super(1);
        this.ContactInputID = ContactInputID;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt8(this.ContactInputID, 0);
    }
}
exports.GW_REMOVE_CONTACT_INPUT_LINK_REQ = GW_REMOVE_CONTACT_INPUT_LINK_REQ;
//# sourceMappingURL=GW_REMOVE_CONTACT_INPUT_LINK_REQ.js.map