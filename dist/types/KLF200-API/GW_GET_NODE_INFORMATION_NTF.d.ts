import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { ActuatorAlias, ActuatorType, NodeOperatingState, NodeVariation, PowerSaveMode, Velocity } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_GET_NODE_INFORMATION_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_GET_NODE_INFORMATION_NTF;
    readonly NodeID: number;
    readonly Order: number;
    readonly Placement: number;
    readonly Name: string;
    readonly Velocity: Velocity;
    readonly ActuatorType: ActuatorType;
    readonly ActuatorSubType: number;
    readonly ProductGroup: number;
    readonly ProductType: number;
    readonly NodeVariation: NodeVariation;
    readonly PowerSaveMode: PowerSaveMode;
    readonly SerialNumber: Buffer;
    readonly OperatingState: NodeOperatingState;
    readonly CurrentPosition: number;
    readonly TargetPosition: number;
    readonly FunctionalPosition1CurrentPosition: number;
    readonly FunctionalPosition2CurrentPosition: number;
    readonly FunctionalPosition3CurrentPosition: number;
    readonly FunctionalPosition4CurrentPosition: number;
    readonly RemainingTime: number;
    readonly TimeStamp: Date;
    readonly ActuatorAliases: ActuatorAlias[];
    constructor(Data: Buffer);
}
