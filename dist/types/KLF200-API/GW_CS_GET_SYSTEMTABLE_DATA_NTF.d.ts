import { GatewayCommand, GW_FRAME_NTF } from "./common.js";
import { SystemTableDataEntry } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_CS_GET_SYSTEMTABLE_DATA_NTF extends GW_FRAME_NTF {
    readonly Command: GatewayCommand.GW_CS_GET_SYSTEMTABLE_DATA_NTF;
    readonly NumberOfEntries: number;
    readonly RemainingNumberOfEntries: number;
    readonly SystemTableEntries: SystemTableDataEntry[];
    constructor(Data: Buffer);
}
