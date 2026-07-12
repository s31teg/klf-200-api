import { GatewayCommand, GW_FRAME_CFM, GW_INVERSE_STATUS } from "./common.js";
export declare class GW_GET_LIMITATION_STATUS_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_LIMITATION_STATUS_CFM;
    readonly SessionID: number;
    readonly Status: GW_INVERSE_STATUS;
    constructor(Data: Buffer);
    getError(): string;
}
