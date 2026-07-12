import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare enum PGCJobState {
    PGCJobStarted = 0,
    PGCJobEnded = 1,
    CSBusy = 2
}
export declare enum PGCJobStatus {
    OK = 0,
    PartialOK = 1,
    Failed_JobError = 2,
    Failed_CancelledOrTooLongKeyPress = 3
}
export declare enum PGCJobType {
    ReceiveSystemCopy = 0,
    ReceiveKey = 1,
    TransmitKey = 2,
    GenerateKey = 3
}
export declare class GW_CS_PGC_JOB_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_CS_PGC_JOB_NTF;
    readonly PGCJobState: PGCJobState;
    readonly PGCJobStatus: PGCJobStatus;
    readonly PGCJobType: PGCJobType;
    constructor(Data: Buffer);
}
