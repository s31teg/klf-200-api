import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
import { InitializeSceneConfirmationStatus } from "./GW_SCENES.js";
export declare class GW_INITIALIZE_SCENE_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_INITIALIZE_SCENE_CFM;
    readonly Status: InitializeSceneConfirmationStatus;
    constructor(Data: Buffer);
    getError(): string;
}
