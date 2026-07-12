import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
export declare class GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM;
    readonly ActivatedNodes: number[];
    readonly NoContactNodes: number[];
    readonly OtherErrorNodes: number[];
    readonly Status: number;
    constructor(Data: Buffer);
    getError(): string;
}
