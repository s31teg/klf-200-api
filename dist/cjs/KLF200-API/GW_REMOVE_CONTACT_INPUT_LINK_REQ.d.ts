import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_REMOVE_CONTACT_INPUT_LINK_REQ extends GW_FRAME_REQ {
    readonly ContactInputID: number;
    readonly Command: GatewayCommand.GW_REMOVE_CONTACT_INPUT_LINK_REQ;
    constructor(ContactInputID: number);
}
