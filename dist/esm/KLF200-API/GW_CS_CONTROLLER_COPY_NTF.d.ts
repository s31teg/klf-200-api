import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { ControllerCopyMode } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_CS_CONTROLLER_COPY_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_CS_CONTROLLER_COPY_NTF;
    readonly ControllerCopyMode: ControllerCopyMode;
    readonly ControllerCopyStatus: number;
    constructor(Data: Buffer);
}
