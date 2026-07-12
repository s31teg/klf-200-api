import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_SET_NETWORK_SETUP_REQ extends GW_FRAME_REQ {
    readonly DHCP: boolean;
    readonly IPAddress: string;
    readonly Mask: string;
    readonly DefaultGateway: string;
    readonly Command: GatewayCommand.GW_SET_NETWORK_SETUP_REQ;
    constructor(DHCP: boolean, IPAddress?: string, Mask?: string, DefaultGateway?: string);
}
