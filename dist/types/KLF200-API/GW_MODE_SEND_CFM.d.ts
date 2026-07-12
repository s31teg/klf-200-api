import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
import { ModeStatus } from "./GW_COMMAND.js";
export declare class GW_MODE_SEND_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_MODE_SEND_CFM;
    readonly SessionID: number;
    readonly ModeStatus: ModeStatus;
    constructor(Data: Buffer);
    getError(): string;
}
