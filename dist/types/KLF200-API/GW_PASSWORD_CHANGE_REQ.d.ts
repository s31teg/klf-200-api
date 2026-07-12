import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_PASSWORD_CHANGE_REQ extends GW_FRAME_REQ {
    readonly OldPassword: string;
    readonly NewPassword: string;
    readonly Command: GatewayCommand.GW_PASSWORD_CHANGE_REQ;
    constructor(OldPassword: string, NewPassword: string);
}
