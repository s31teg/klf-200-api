"use strict";
import { GW_FRAME_REQ } from "./common.js";
export class GW_GET_ACTIVATION_LOG_LINE_REQ extends GW_FRAME_REQ {
    Line;
    constructor(Line) {
        super(2);
        this.Line = Line;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt16BE(this.Line, 0);
    }
}
//# sourceMappingURL=GW_GET_ACTIVATION_LOG_LINE_REQ.js.map