import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
import { ActivateProductGroupStatus } from "./GW_COMMAND.js";
export declare class GW_ACTIVATE_PRODUCTGROUP_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_ACTIVATE_PRODUCTGROUP_CFM;
    readonly SessionID: number;
    readonly Status: ActivateProductGroupStatus;
    constructor(Data: Buffer);
    getError(): string;
}
