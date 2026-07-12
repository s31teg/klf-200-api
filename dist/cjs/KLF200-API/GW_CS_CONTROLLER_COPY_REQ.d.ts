import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
import { ControllerCopyMode } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_CS_CONTROLLER_COPY_REQ extends GW_FRAME_REQ {
    readonly ControllerCopyMode: ControllerCopyMode;
    readonly Command: GatewayCommand.GW_CS_CONTROLLER_COPY_REQ;
    constructor(ControllerCopyMode: ControllerCopyMode);
}
