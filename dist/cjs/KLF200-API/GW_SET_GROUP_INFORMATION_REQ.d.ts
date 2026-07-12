import { GroupType } from "./GW_GROUPS.js";
import { NodeVariation, Velocity } from "./GW_SYSTEMTABLE_DATA.js";
import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_SET_GROUP_INFORMATION_REQ extends GW_FRAME_REQ {
    readonly GroupID: number;
    readonly Revision: number;
    readonly Name: string;
    readonly GroupType: GroupType;
    readonly Nodes: number[];
    readonly Order: number;
    readonly Placement: number;
    readonly Velocity: Velocity;
    readonly NodeVariation: NodeVariation;
    readonly Command: GatewayCommand.GW_SET_GROUP_INFORMATION_REQ;
    constructor(GroupID: number, Revision: number, Name: string, GroupType: GroupType, Nodes: number[], Order?: number, Placement?: number, Velocity?: Velocity, NodeVariation?: NodeVariation);
}
