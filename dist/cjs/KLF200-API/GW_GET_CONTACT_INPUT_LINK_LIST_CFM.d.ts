import { CommandOriginator, ParameterActive, PriorityLevel } from "./GW_COMMAND.js";
import { ContactInputAssignment, LockPriorityLevel } from "./GW_CONTACTINPUT.js";
import { Velocity } from "./GW_SYSTEMTABLE_DATA.js";
import { GatewayCommand, GW_FRAME_CFM } from "./common.js";
export type ContactInputObject = {
    ContactInputID: number;
    ContactInputAssignment: ContactInputAssignment;
    ActionID: number;
    CommandOriginator: CommandOriginator;
    PriorityLevel: PriorityLevel;
    ParameterActive: ParameterActive;
    Position: number;
    Velocity: Velocity;
    LockPriorityLevel: LockPriorityLevel;
    PLI3: number;
    PLI4: number;
    PLI5: number;
    PLI6: number;
    PLI7: number;
    SuccessOutputID: number;
    ErrorOutputID: number;
};
export declare class GW_GET_CONTACT_INPUT_LINK_LIST_CFM extends GW_FRAME_CFM {
    readonly Command: GatewayCommand.GW_GET_CONTACT_INPUT_LINK_LIST_CFM;
    readonly ContactInputObjects: ContactInputObject[];
    constructor(Data: Buffer);
}
