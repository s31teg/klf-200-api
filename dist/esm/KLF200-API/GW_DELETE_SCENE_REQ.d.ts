import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_DELETE_SCENE_REQ extends GW_FRAME_REQ {
    readonly SceneID: number;
    readonly Command: GatewayCommand.GW_DELETE_SCENE_REQ;
    constructor(SceneID: number);
}
