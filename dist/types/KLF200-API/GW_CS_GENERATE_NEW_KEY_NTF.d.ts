import { ChangeKeyStatus } from "./GW_SYSTEMTABLE_DATA.js";
import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
export declare class GW_CS_GENERATE_NEW_KEY_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_CS_GENERATE_NEW_KEY_NTF;
    readonly ChangeKeyStatus: ChangeKeyStatus;
    readonly KeyChangedNodes: number[];
    readonly KeyNotChangedNodes: number[];
    constructor(Data: Buffer);
}
