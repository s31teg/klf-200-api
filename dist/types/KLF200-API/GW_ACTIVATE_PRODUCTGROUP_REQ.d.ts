import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { CommandOriginator, ParameterActive, PriorityLevel, PriorityLevelInformation, PriorityLevelLock } from "./GW_COMMAND.js";
import { Velocity } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_ACTIVATE_PRODUCTGROUP_REQ extends GW_FRAME_COMMAND_REQ {
    readonly GroupID: number;
    readonly Position: number;
    readonly PriorityLevel: PriorityLevel;
    readonly CommandOriginator: CommandOriginator;
    readonly ParameterActive: ParameterActive;
    readonly Velocity: Velocity;
    readonly PriorityLevelLock: PriorityLevelLock;
    readonly PriorityLevels: PriorityLevelInformation[];
    readonly LockTime: number;
    readonly Command: GatewayCommand.GW_ACTIVATE_PRODUCTGROUP_REQ;
    constructor(GroupID: number, Position: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator, ParameterActive?: ParameterActive, Velocity?: Velocity, PriorityLevelLock?: PriorityLevelLock, PriorityLevels?: PriorityLevelInformation[], LockTime?: number);
}
