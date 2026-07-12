"use strict";
import { GW_FRAME_CFM } from "./common.js";
export class GW_GET_ACTIVATION_LOG_HEADER_CFM extends GW_FRAME_CFM {
    MaxLineCount;
    LineCount;
    constructor(Data) {
        super(Data);
        this.MaxLineCount = this.Data.readUInt16BE(0);
        this.LineCount = this.Data.readUInt16BE(2);
    }
}
//# sourceMappingURL=GW_GET_ACTIVATION_LOG_HEADER_CFM.js.map