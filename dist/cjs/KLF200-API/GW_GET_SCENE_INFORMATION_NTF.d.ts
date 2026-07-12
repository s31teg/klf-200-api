import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { ParameterActive } from "./GW_COMMAND.js";
export type SceneInformationEntry = {
    NodeID: number;
    ParameterID: ParameterActive;
    ParameterValue: number;
};
export declare class GW_GET_SCENE_INFORMATION_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_GET_SCENE_INFORMATION_NTF;
    readonly SceneID: number;
    readonly Name: string;
    readonly NumberOfNodes: number;
    readonly NumberOfRemainingNodes: number;
    readonly Nodes: SceneInformationEntry[];
    constructor(Data: Buffer);
}
