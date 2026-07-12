import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_RENAME_SCENE_REQ extends GW_FRAME_REQ {
    readonly SceneID: number;
    readonly Name: string;
    readonly Command: GatewayCommand.GW_RENAME_SCENE_REQ;
    constructor(SceneID: number, Name: string);
}
