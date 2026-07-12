import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_PASSWORD_ENTER_REQ extends GW_FRAME_REQ {
    readonly Command: GatewayCommand.GW_PASSWORD_ENTER_REQ;
    constructor(password: string);
    set Password(newPassword: string);
}
