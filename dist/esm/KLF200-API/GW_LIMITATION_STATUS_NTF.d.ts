import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { CommandOriginator, ParameterActive } from "./GW_COMMAND.js";
export declare class GW_LIMITATION_STATUS_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_LIMITATION_STATUS_NTF;
    readonly SessionID: number;
    readonly NodeID: number;
    readonly ParameterID: ParameterActive;
    readonly LimitationValueMin: number;
    readonly LimitationValueMax: number;
    readonly LimitationOriginator: CommandOriginator;
    readonly LimitationTime: number;
    constructor(Data: Buffer);
}
