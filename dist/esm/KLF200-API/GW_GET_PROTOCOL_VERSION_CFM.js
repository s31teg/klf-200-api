"use strict";
import { GW_FRAME_CFM } from "./common.js";
export class GW_GET_PROTOCOL_VERSION_CFM extends GW_FRAME_CFM {
    MajorVersion;
    MinorVersion;
    constructor(Data) {
        super(Data);
        this.MajorVersion = this.Data.readUInt16BE(0);
        this.MinorVersion = this.Data.readUInt16BE(2);
    }
}
//# sourceMappingURL=GW_GET_PROTOCOL_VERSION_CFM.js.map