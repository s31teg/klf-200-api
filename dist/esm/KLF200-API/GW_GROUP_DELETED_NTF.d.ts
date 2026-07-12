import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare class GW_GROUP_DELETED_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_GROUP_DELETED_NTF;
    readonly GroupID: number;
    constructor(Data: Buffer);
}
