import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_GET_SCENE_INFORMATION_REQ extends GW_FRAME_REQ {
    readonly SceneID: number;
    readonly Command: GatewayCommand.GW_GET_SCENE_INFORMATION_REQ;
    constructor(SceneID: number);
}
