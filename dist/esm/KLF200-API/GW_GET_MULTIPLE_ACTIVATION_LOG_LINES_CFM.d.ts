import { GatewayCommand, GW_FRAME_CFM, GW_INVERSE_STATUS } from "./common.js";
export declare class GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_CFM;
    readonly LineCount: number;
    readonly Status: GW_INVERSE_STATUS;
    constructor(Data: Buffer);
    getError(): string;
}
