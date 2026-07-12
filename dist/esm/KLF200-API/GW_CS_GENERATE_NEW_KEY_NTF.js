"use strict";
import { bitArrayToArray } from "../utils/BitArray.js";
import { GW_FRAME_NTF } from "./common.js";
export class GW_CS_GENERATE_NEW_KEY_NTF extends GW_FRAME_NTF {
    ChangeKeyStatus;
    KeyChangedNodes;
    KeyNotChangedNodes;
    constructor(Data) {
        super(Data);
        this.ChangeKeyStatus = this.Data.readUInt8(0);
        this.KeyChangedNodes = bitArrayToArray(this.Data.subarray(1, 27));
        this.KeyNotChangedNodes = bitArrayToArray(this.Data.subarray(27, 53));
    }
}
//# sourceMappingURL=GW_CS_GENERATE_NEW_KEY_NTF.js.map