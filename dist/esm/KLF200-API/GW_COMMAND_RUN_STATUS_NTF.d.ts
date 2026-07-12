import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { ParameterActive, RunStatus, StatusOwner, StatusReply } from "./GW_COMMAND.js";
export declare class GW_COMMAND_RUN_STATUS_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_COMMAND_RUN_STATUS_NTF;
    readonly SessionID: number;
    readonly StatusOwner: StatusOwner;
    readonly NodeID: number;
    readonly NodeParameter: ParameterActive;
    readonly ParameterValue: number;
    readonly RunStatus: RunStatus;
    readonly StatusReply: StatusReply;
    readonly InformationCode: number;
    constructor(Data: Buffer);
}
