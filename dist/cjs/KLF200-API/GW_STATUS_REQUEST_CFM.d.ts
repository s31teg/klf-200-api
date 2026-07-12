import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
import { CommandStatus } from "./GW_COMMAND.js";
export declare class GW_STATUS_REQUEST_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_STATUS_REQUEST_CFM;
    readonly SessionID: number;
    readonly CommandStatus: CommandStatus;
    constructor(Data: Buffer);
    getError(): string;
}
