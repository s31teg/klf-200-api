import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { RecordSceneStatus } from "./GW_SCENES.js";
export declare class GW_RECORD_SCENE_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_RECORD_SCENE_NTF;
    readonly Status: RecordSceneStatus;
    readonly SceneID: number;
    constructor(Data: Buffer);
}
