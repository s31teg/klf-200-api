import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { CommandOriginator, ParameterActive, PriorityLevel } from "./GW_COMMAND.js";
export declare class GW_SET_LIMITATION_REQ extends GW_FRAME_COMMAND_REQ {
    readonly Nodes: number[] | number;
    readonly LimitationValueMin: number;
    readonly LimitationValueMax: number;
    readonly LimitationTime: number;
    readonly PriorityLevel: PriorityLevel;
    readonly CommandOriginator: CommandOriginator;
    readonly ParameterActive: ParameterActive;
    readonly Command: GatewayCommand.GW_SET_LIMITATION_REQ;
    constructor(Nodes: number[] | number, LimitationValueMin: number, LimitationValueMax: number, LimitationTime: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator, ParameterActive?: ParameterActive);
}
