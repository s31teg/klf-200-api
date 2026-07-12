"use strict";
import { GW_FRAME_CFM } from "./common.js";
import { InitializeSceneConfirmationStatus } from "./GW_SCENES.js";
export class GW_INITIALIZE_SCENE_CFM extends GW_FRAME_CFM {
    Status;
    constructor(Data) {
        super(Data);
        this.Status = this.Data.readUInt8(0);
    }
    getError() {
        switch (this.Status) {
            case InitializeSceneConfirmationStatus.OK:
                throw new Error("No error.");
            case InitializeSceneConfirmationStatus.EmptySystemTable:
                return "Empty system table.";
            case InitializeSceneConfirmationStatus.OutOfStorage:
                return "Out of storage for scene.";
            default:
                return `Unknown error ${this.Status}.`;
        }
    }
}
//# sourceMappingURL=GW_INITIALIZE_SCENE_CFM.js.map