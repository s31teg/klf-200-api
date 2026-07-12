import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { CommandOriginator, ParameterActive, PriorityLevel, PriorityLevelInformation, PriorityLevelLock } from "./GW_COMMAND.js";
export declare class GW_MODE_SEND_REQ extends GW_FRAME_COMMAND_REQ {
    readonly Nodes: number[] | number;
    readonly ModeNumber: number;
    readonly ModeParameter: ParameterActive;
    readonly PriorityLevel: PriorityLevel;
    readonly CommandOriginator: CommandOriginator;
    readonly PriorityLevelLock: PriorityLevelLock;
    readonly PriorityLevels: PriorityLevelInformation[];
    readonly LockTime: number;
    readonly Command: GatewayCommand.GW_MODE_SEND_REQ;
    constructor(Nodes: number[] | number, ModeNumber?: number, ModeParameter?: ParameterActive, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator, PriorityLevelLock?: PriorityLevelLock, PriorityLevels?: PriorityLevelInformation[], LockTime?: number);
}
