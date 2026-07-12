import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { CommandOriginator, PriorityLevel } from "./GW_COMMAND.js";
import { Velocity } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_ACTIVATE_SCENE_REQ extends GW_FRAME_COMMAND_REQ {
    readonly SceneID: number;
    readonly PriorityLevel: PriorityLevel;
    readonly CommandOriginator: CommandOriginator;
    readonly Velocity: Velocity;
    readonly Command: GatewayCommand.GW_ACTIVATE_SCENE_REQ;
    constructor(SceneID: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator, Velocity?: Velocity);
}
