"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_CS_CONTROLLER_COPY_REQ extends GW_FRAME_REQ {
    ControllerCopyMode;
    constructor(ControllerCopyMode) {
        super(1);
        this.ControllerCopyMode = ControllerCopyMode;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt8(this.ControllerCopyMode, 0);
    }
}
//# sourceMappingURL=GW_CS_CONTROLLER_COPY_REQ.js.map