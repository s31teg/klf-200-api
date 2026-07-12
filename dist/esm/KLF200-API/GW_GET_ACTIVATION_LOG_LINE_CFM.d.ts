import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
import { ParameterActive, RunStatus, StatusOwner, StatusReply } from "./GW_COMMAND.js";
export declare class GW_GET_ACTIVATION_LOG_LINE_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_ACTIVATION_LOG_LINE_CFM;
    readonly TimeStamp: Date;
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
