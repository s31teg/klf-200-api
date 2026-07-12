"use strict";
import { GW_FRAME_NTF } from "./common.js";
export class GW_CS_CONTROLLER_COPY_NTF extends GW_FRAME_NTF {
    ControllerCopyMode;
    ControllerCopyStatus;
    constructor(Data) {
        super(Data);
        this.ControllerCopyMode = this.Data.readUInt8(0);
        this.ControllerCopyStatus = this.Data.readUInt8(1);
    }
}
//# sourceMappingURL=GW_CS_CONTROLLER_COPY_NTF.js.map