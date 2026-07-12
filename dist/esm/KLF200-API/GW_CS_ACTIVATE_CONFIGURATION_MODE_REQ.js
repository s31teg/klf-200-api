"use strict";
import { arrayToBitArray } from "../utils/BitArray.js";
import { GW_FRAME_REQ } from "./common.js";
export class GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ extends GW_FRAME_REQ {
    ActivateConfigurationNodes;
    constructor(ActivateConfigurationNodes) {
        super(26);
        this.ActivateConfigurationNodes = ActivateConfigurationNodes;
        const buff = this.Data.subarray(this.offset);
        arrayToBitArray(this.ActivateConfigurationNodes, 26, buff);
    }
}
//# sourceMappingURL=GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ.js.map