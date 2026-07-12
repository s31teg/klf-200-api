import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { CommandOriginator, PriorityLevel } from "./GW_COMMAND.js";
export declare class GW_WINK_SEND_REQ extends GW_FRAME_COMMAND_REQ {
    readonly Nodes: number[] | number;
    readonly EnableWink: boolean;
    readonly WinkTime: number;
    readonly PriorityLevel: PriorityLevel;
    readonly CommandOriginator: CommandOriginator;
    readonly Command: GatewayCommand.GW_WINK_SEND_REQ;
    constructor(Nodes: number[] | number, EnableWink?: boolean, WinkTime?: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator);
}
