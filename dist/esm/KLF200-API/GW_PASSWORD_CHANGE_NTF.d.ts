import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare class GW_PASSWORD_CHANGE_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_PASSWORD_CHANGE_NTF;
    readonly NewPassword: string;
    constructor(Data: Buffer);
}
