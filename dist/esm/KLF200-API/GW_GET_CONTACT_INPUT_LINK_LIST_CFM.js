"use strict";
import { ContactInputAssignment } from "./GW_CONTACTINPUT.js";
import { GW_FRAME_CFM } from "./common.js";
export class GW_GET_CONTACT_INPUT_LINK_LIST_CFM extends GW_FRAME_CFM {
    ContactInputObjects = [];
    constructor(Data) {
        super(Data);
        const numberOfObjects = this.Data.readUInt8(0);
        for (let objectIndex = 0; objectIndex < numberOfObjects; objectIndex++) {
            const contactInputObject = {
                ContactInputID: this.Data.readUInt8(objectIndex * 17 + 1),
                ContactInputAssignment: this.Data.readUInt8(objectIndex * 17 + 2),
                ActionID: this.Data.readUInt8(objectIndex * 17 + 3),
                CommandOriginator: this.Data.readUInt8(objectIndex * 17 + 4),
                PriorityLevel: this.Data.readUInt8(objectIndex * 17 + 5),
                ParameterActive: this.Data.readUInt8(objectIndex * 17 + 6),
                Position: this.Data.readUInt16BE(objectIndex * 17 + 7),
                Velocity: this.Data.readUInt8(objectIndex * 17 + 9),
                LockPriorityLevel: this.Data.readUInt8(objectIndex * 17 + 10),
                PLI3: this.Data.readUInt8(objectIndex * 17 + 11),
                PLI4: this.Data.readUInt8(objectIndex * 17 + 12),
                PLI5: this.Data.readUInt8(objectIndex * 17 + 13),
                PLI6: this.Data.readUInt8(objectIndex * 17 + 14),
                PLI7: this.Data.readUInt8(objectIndex * 17 + 15),
                SuccessOutputID: this.Data.readUInt8(objectIndex * 17 + 16),
                ErrorOutputID: this.Data.readUInt8(objectIndex * 17 + 17),
            };
            if (contactInputObject.ContactInputAssignment !== ContactInputAssignment.NotAssigned) {
                this.ContactInputObjects.push(contactInputObject);
            }
        }
    }
}
//# sourceMappingURL=GW_GET_CONTACT_INPUT_LINK_LIST_CFM.js.map