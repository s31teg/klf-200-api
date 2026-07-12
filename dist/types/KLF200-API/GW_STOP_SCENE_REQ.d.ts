import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { CommandOriginator, PriorityLevel } from "./GW_COMMAND.js";
export declare class GW_STOP_SCENE_REQ extends GW_FRAME_COMMAND_REQ {
    readonly SceneID: number;
    readonly PriorityLevel: PriorityLevel;
    readonly CommandOriginator: CommandOriginator;
    readonly Command: GatewayCommand.GW_STOP_SCENE_REQ;
    constructor(SceneID: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator);
}
