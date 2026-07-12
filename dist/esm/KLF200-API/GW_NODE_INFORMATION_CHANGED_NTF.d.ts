import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { NodeVariation } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_NODE_INFORMATION_CHANGED_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_NODE_INFORMATION_CHANGED_NTF;
    readonly NodeID: number;
    readonly Order: number;
    readonly Placement: number;
    readonly Name: string;
    readonly NodeVariation: NodeVariation;
    constructor(Data: Buffer);
}
