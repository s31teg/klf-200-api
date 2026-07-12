import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
import { GroupType } from "./GW_GROUPS.js";
export declare class GW_GET_ALL_GROUPS_INFORMATION_REQ extends GW_FRAME_REQ {
    readonly Command: GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_REQ;
    constructor(GroupType?: GroupType);
    private _useFilter;
    get UseFilter(): boolean;
    private _groupType;
    get GroupType(): GroupType;
}
