import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
export declare class GW_GET_NETWORK_SETUP_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_NETWORK_SETUP_CFM;
    readonly IPAddress: string;
    readonly Mask: string;
    readonly DefaultGateway: string;
    readonly DHCP: boolean;
    constructor(Data: Buffer);
}
