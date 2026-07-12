"use strict";
import { GW_FRAME_COMMAND_REQ } from "./common.js";
export class GW_STOP_SCENE_REQ extends GW_FRAME_COMMAND_REQ {
    SceneID;
    PriorityLevel;
    CommandOriginator;
    constructor(SceneID, PriorityLevel = 3, CommandOriginator = 1) {
        super(5);
        this.SceneID = SceneID;
        this.PriorityLevel = PriorityLevel;
        this.CommandOriginator = CommandOriginator;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt16BE(this.SessionID, 0);
        buff.writeUInt8(this.CommandOriginator, 2);
        buff.writeUInt8(this.PriorityLevel, 3);
        buff.writeUInt8(this.SceneID, 4);
    }
}
//# sourceMappingURL=GW_STOP_SCENE_REQ.js.map