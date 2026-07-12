import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { CommandOriginator, FunctionalParameter, RunStatus, StatusOwner, StatusReply, StatusType } from "./GW_COMMAND.js";
export declare class GW_STATUS_REQUEST_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_STATUS_REQUEST_NTF;
    readonly SessionID: number;
    readonly StatusOwner: StatusOwner;
    readonly NodeID: number;
    readonly RunStatus: RunStatus;
    readonly StatusReply: StatusReply;
    readonly StatusType: StatusType;
    readonly ParameterData: FunctionalParameter[] | undefined;
    readonly TargetPosition: number | undefined;
    readonly CurrentPosition: number | undefined;
    readonly RemainingTime: number | undefined;
    readonly LastMasterExecutionAddress: number | undefined;
    readonly LastCommandOriginator: CommandOriginator | undefined;
    constructor(Data: Buffer);
}
