import { GroupType } from "./GW_GROUPS.js";
import { NodeVariation, Velocity } from "./GW_SYSTEMTABLE_DATA.js";
import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare class GW_GET_ALL_GROUPS_INFORMATION_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_NTF;
    readonly GroupID: number;
    readonly Order: number;
    readonly Placement: number;
    readonly Name: string;
    readonly Velocity: Velocity;
    readonly GroupType: GroupType;
    readonly NodeVariation: NodeVariation;
    readonly Revision: number;
    readonly Nodes: number[];
    constructor(Data: Buffer);
}
