"use strict";
import { GW_FRAME_CFM } from "./common.js";
export class GW_CS_REMOVE_NODES_CFM extends GW_FRAME_CFM {
    SceneDeleted;
    constructor(Data) {
        super(Data);
        this.SceneDeleted = this.Data.readUInt8(0) === 1;
    }
}
//# sourceMappingURL=GW_CS_REMOVE_NODES_CFM.js.map