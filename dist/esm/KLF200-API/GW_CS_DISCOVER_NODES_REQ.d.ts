import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
import { ActuatorType } from "./GW_SYSTEMTABLE_DATA.js";
export declare class GW_CS_DISCOVER_NODES_REQ extends GW_FRAME_REQ {
    readonly NodeType: ActuatorType;
    readonly Command: GatewayCommand.GW_CS_DISCOVER_NODES_REQ;
    constructor(NodeType?: ActuatorType);
}
