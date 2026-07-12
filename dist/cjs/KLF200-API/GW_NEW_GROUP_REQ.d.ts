import { GroupType } from "./GW_GROUPS.js";
import { NodeVariation, Velocity } from "./GW_SYSTEMTABLE_DATA.js";
import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_NEW_GROUP_REQ extends GW_FRAME_REQ {
    readonly Name: string;
    readonly GroupType: GroupType;
    readonly Nodes: number[];
    readonly Order: number;
    readonly Placement: number;
    readonly Velocity: Velocity;
    readonly NodeVariation: NodeVariation;
    readonly Command: GatewayCommand.GW_NEW_GROUP_REQ;
    constructor(Name: string, GroupType: GroupType, Nodes: number[], Order?: number, Placement?: number, Velocity?: Velocity, NodeVariation?: NodeVariation);
}
