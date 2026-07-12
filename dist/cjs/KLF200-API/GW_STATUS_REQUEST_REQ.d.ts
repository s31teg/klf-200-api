import { GatewayCommand, GW_FRAME_COMMAND_REQ } from "./common.js";
import { StatusType } from "./GW_COMMAND.js";
export declare class GW_STATUS_REQUEST_REQ extends GW_FRAME_COMMAND_REQ {
    readonly Nodes: number[] | number;
    readonly StatusType: StatusType;
    readonly FunctionalParameters: number[];
    readonly Command: GatewayCommand.GW_STATUS_REQUEST_REQ;
    constructor(Nodes: number[] | number, StatusType: StatusType, FunctionalParameters?: number[]);
}
