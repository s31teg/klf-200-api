"use strict";
import { GW_FRAME_CFM, GW_INVERSE_STATUS } from "./common.js";
export class GW_SET_CONTACT_INPUT_LINK_CFM extends GW_FRAME_CFM {
    ContactInputID;
    Status;
    constructor(Data) {
        super(Data);
        this.ContactInputID = this.Data.readUInt8(0);
        this.Status = this.Data.readUInt8(1);
    }
    getError() {
        switch (this.Status) {
            case GW_INVERSE_STATUS.SUCCESS:
                throw new Error("No error.");
            case GW_INVERSE_STATUS.ERROR:
                return "Request failed.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
//# sourceMappingURL=GW_SET_CONTACT_INPUT_LINK_CFM.js.map