import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { CommandOriginator, FunctionalParameter, ParameterActive, PriorityLevel, PriorityLevelInformation, PriorityLevelLock } from "./GW_COMMAND.js";
export declare class GW_COMMAND_SEND_REQ extends GW_FRAME_COMMAND_REQ {
    readonly Nodes: number[] | number;
    readonly MainValue: number;
    readonly PriorityLevel: PriorityLevel;
    readonly CommandOriginator: CommandOriginator;
    readonly ParameterActive: ParameterActive;
    readonly FunctionalParameters: FunctionalParameter[];
    readonly PriorityLevelLock: PriorityLevelLock;
    readonly PriorityLevels: PriorityLevelInformation[];
    readonly LockTime: number;
    readonly Command: GatewayCommand.GW_COMMAND_SEND_REQ;
    constructor(Nodes: number[] | number, MainValue: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator, ParameterActive?: ParameterActive, FunctionalParameters?: FunctionalParameter[], PriorityLevelLock?: PriorityLevelLock, PriorityLevels?: PriorityLevelInformation[], LockTime?: number);
}
