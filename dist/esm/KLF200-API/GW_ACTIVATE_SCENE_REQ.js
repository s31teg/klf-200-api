"use strict";
import { GW_FRAME_COMMAND_REQ } from "./common.js";
export class GW_ACTIVATE_SCENE_REQ extends GW_FRAME_COMMAND_REQ {
    SceneID;
    PriorityLevel;
    CommandOriginator;
    Velocity;
    constructor(SceneID, PriorityLevel = 3, CommandOriginator = 1, Velocity = 0) {
        super(6);
        this.SceneID = SceneID;
        this.PriorityLevel = PriorityLevel;
        this.CommandOriginator = CommandOriginator;
        this.Velocity = Velocity;
        const buff = this.Data.subarray(this.offset);
        buff.writeUInt16BE(this.SessionID, 0);
        buff.writeUInt8(this.CommandOriginator, 2);
        buff.writeUInt8(this.PriorityLevel, 3);
        buff.writeUInt8(this.SceneID, 4);
        buff.writeUInt8(this.Velocity, 5);
    }
}
//# sourceMappingURL=GW_ACTIVATE_SCENE_REQ.js.map