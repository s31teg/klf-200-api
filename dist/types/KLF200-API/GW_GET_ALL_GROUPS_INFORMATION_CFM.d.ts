import { GatewayCommand, GW_COMMON_STATUS, GW_FRAME_CFM } from "./common.js";
export declare class GW_GET_ALL_GROUPS_INFORMATION_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_CFM;
    readonly Status: GW_COMMON_STATUS;
    readonly NumberOfGroups: number;
    constructor(Data: Buffer);
    getError(): string;
}
