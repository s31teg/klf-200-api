import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_CS_REMOVE_NODES_REQ extends GW_FRAME_REQ {
    readonly Nodes: number[];
    readonly Command: GatewayCommand.GW_CS_REMOVE_NODES_REQ;
    constructor(Nodes: number[]);
}
