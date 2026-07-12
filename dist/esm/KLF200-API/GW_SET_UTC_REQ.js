"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_SET_UTC_REQ extends GW_FRAME_REQ {
    UTCTime;
    constructor(UTCTime = new Date()) {
        super(4);
        this.UTCTime = UTCTime;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        buff.writeUInt32BE(UTCTime.valueOf() / 1000, 0);
    }
}
//# sourceMappingURL=GW_SET_UTC_REQ.js.map