import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ extends GW_FRAME_REQ {
    readonly ActivateConfigurationNodes: number[];
    readonly Command: GatewayCommand.GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ;
    constructor(ActivateConfigurationNodes: number[]);
}
