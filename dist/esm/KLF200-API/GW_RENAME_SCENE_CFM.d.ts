import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
import { RenameSceneStatus } from "./GW_SCENES.js";
export declare class GW_RENAME_SCENE_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_RENAME_SCENE_CFM;
    readonly Status: RenameSceneStatus;
    readonly SceneID: number;
    constructor(Data: Buffer);
    getError(): string;
}
