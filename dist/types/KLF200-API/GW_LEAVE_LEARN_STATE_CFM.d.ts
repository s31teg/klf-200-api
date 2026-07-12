import { GatewayCommand, GW_FRAME_CFM, GW_INVERSE_STATUS } from "./common.js";
export declare class GW_LEAVE_LEARN_STATE_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_LEAVE_LEARN_STATE_CFM;
    readonly Status: GW_INVERSE_STATUS;
    constructor(Data: Buffer);
    getError(): string;
}
