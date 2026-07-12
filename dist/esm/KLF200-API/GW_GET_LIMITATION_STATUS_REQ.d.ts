import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { LimitationType, ParameterActive } from "./GW_COMMAND.js";
export declare class GW_GET_LIMITATION_STATUS_REQ extends GW_FRAME_COMMAND_REQ {
    readonly Nodes: number[] | number;
    readonly LimitationType: LimitationType;
    readonly ParameterActive: ParameterActive;
    readonly Command: GatewayCommand.GW_GET_LIMITATION_STATUS_REQ;
    constructor(Nodes: number[] | number, LimitationType: LimitationType, ParameterActive?: ParameterActive);
}
