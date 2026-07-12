import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_RECORD_SCENE_REQ extends GW_FRAME_REQ {
    readonly Name: string;
    readonly Command: GatewayCommand.GW_RECORD_SCENE_REQ;
    constructor(Name: string);
}
