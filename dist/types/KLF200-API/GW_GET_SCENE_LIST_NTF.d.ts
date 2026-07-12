import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export type SceneListEntry = {
    SceneID: number;
    Name: string;
};
export declare class GW_GET_SCENE_LIST_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_GET_SCENE_LIST_NTF;
    readonly NumberOfScenes: number;
    readonly NumberOfRemainingScenes: number;
    readonly Scenes: SceneListEntry[];
    constructor(Data: Buffer);
}
