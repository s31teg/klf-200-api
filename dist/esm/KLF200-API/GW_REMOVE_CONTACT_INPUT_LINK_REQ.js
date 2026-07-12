"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_REMOVE_CONTACT_INPUT_LINK_REQ extends GW_FRAME_REQ {
    ContactInputID;
    constructor(ContactInputID) {
        super(1);
        this.ContactInputID = ContactInputID;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt8(this.ContactInputID, 0);
    }
}
//# sourceMappingURL=GW_REMOVE_CONTACT_INPUT_LINK_REQ.js.map