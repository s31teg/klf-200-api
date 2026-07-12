import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { ParameterActive } from "./GW_COMMAND.js";
export declare class GW_COMMAND_REMAINING_TIME_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_COMMAND_REMAINING_TIME_NTF;
    readonly SessionID: number;
    readonly NodeID: number;
    readonly NodeParameter: ParameterActive;
    readonly RemainingTime: number;
    constructor(Data: Buffer);
}
