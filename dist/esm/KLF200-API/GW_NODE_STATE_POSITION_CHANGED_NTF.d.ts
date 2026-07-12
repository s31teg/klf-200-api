import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { NodeOperatingState } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_NODE_STATE_POSITION_CHANGED_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_NODE_STATE_POSITION_CHANGED_NTF;
    readonly NodeID: number;
    readonly OperatingState: NodeOperatingState;
    readonly CurrentPosition: number;
    readonly TargetPosition: number;
    readonly FunctionalPosition1CurrentPosition: number;
    readonly FunctionalPosition2CurrentPosition: number;
    readonly FunctionalPosition3CurrentPosition: number;
    readonly FunctionalPosition4CurrentPosition: number;
    readonly RemainingTime: number;
    readonly TimeStamp: Date;
    constructor(Data: Buffer);
}
