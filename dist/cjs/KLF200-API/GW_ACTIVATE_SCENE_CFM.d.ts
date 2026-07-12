import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
import { ActivateSceneStatus } from "./GW_SCENES.js";
export declare class GW_ACTIVATE_SCENE_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_ACTIVATE_SCENE_CFM;
    readonly SessionID: number;
    readonly Status: ActivateSceneStatus;
    constructor(Data: Buffer);
    getError(): string;
}
