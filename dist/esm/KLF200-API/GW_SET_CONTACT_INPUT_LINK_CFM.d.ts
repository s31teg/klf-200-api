import { GatewayCommand, GW_FRAME_CFM, GW_INVERSE_STATUS } from "./common.js";
export declare class GW_SET_CONTACT_INPUT_LINK_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_SET_CONTACT_INPUT_LINK_CFM;
    readonly ContactInputID: number;
    readonly Status: GW_INVERSE_STATUS;
    constructor(Data: Buffer);
    getError(): string;
}
