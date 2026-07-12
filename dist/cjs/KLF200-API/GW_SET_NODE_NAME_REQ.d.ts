import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_SET_NODE_NAME_REQ extends GW_FRAME_REQ {
    readonly NodeID: number;
    readonly Name: string;
    readonly Command: GatewayCommand.GW_SET_NODE_NAME_REQ;
    constructor(NodeID: number, Name: string);
}
