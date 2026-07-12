import { GatewayCommand, GW_COMMON_STATUS, GW_FRAME_CFM } from "./common.js";
export declare class GW_SET_NODE_ORDER_AND_PLACEMENT_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_SET_NODE_ORDER_AND_PLACEMENT_CFM;
    readonly Status: GW_COMMON_STATUS;
    readonly NodeID: number;
    constructor(Data: Buffer);
    getError(): string;
}
