import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
export declare class GW_GET_SCENE_LIST_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_SCENE_LIST_CFM;
    readonly NumberOfScenes: number;
    constructor(Data: Buffer);
}
