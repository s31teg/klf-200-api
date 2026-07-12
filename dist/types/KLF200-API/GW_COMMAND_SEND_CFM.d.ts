import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
import { CommandStatus } from "./GW_COMMAND.js";
export declare class GW_COMMAND_SEND_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_COMMAND_SEND_CFM;
    readonly SessionID: number;
    readonly CommandStatus: CommandStatus;
    constructor(Data: Buffer);
    getError(): string;
}
