import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
export declare class GW_CS_REMOVE_NODES_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_CS_REMOVE_NODES_CFM;
    readonly SceneDeleted: boolean;
    constructor(Data: Buffer);
}
