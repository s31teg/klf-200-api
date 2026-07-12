import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare enum DiscoverStatus {
    OK = 0,
    Failed = 5,
    PartialOK = 6,
    Busy = 7
}
export declare class GW_CS_DISCOVER_NODES_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_CS_DISCOVER_NODES_NTF;
    readonly AddedNodes: number[];
    readonly RFConnectionErrorNodes: number[];
    readonly ioKeyErrorExistingNodes: number[];
    readonly RemovedNodes: number[];
    readonly OpenNodes: number[];
    readonly DiscoverStatus: DiscoverStatus;
    constructor(Data: Buffer);
}
