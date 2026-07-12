"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ extends GW_FRAME_REQ {
    TimeStamp;
    constructor(TimeStamp) {
        super(4);
        this.TimeStamp = TimeStamp;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt32BE(this.TimeStamp.valueOf() / 1000, 0);
    }
}
//# sourceMappingURL=GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ.js.map