import { InitializeSceneNotificationStatus } from "./GW_SCENES.js";
import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare class GW_INITIALIZE_SCENE_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_INITIALIZE_SCENE_NTF;
    readonly Status: InitializeSceneNotificationStatus;
    readonly FailedNodes: number[];
    constructor(Data: Buffer);
}
