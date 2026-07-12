"use strict";
import { bitArrayToArray } from "../utils/BitArray.js";
import { GW_FRAME_NTF } from "./common.js";
export var DiscoverStatus;
(function (DiscoverStatus) {
    DiscoverStatus[DiscoverStatus["OK"] = 0] = "OK";
    DiscoverStatus[DiscoverStatus["Failed"] = 5] = "Failed";
    DiscoverStatus[DiscoverStatus["PartialOK"] = 6] = "PartialOK";
    DiscoverStatus[DiscoverStatus["Busy"] = 7] = "Busy";
})(DiscoverStatus || (DiscoverStatus = {}));
export class GW_CS_DISCOVER_NODES_NTF extends GW_FRAME_NTF {
    AddedNodes;
    RFConnectionErrorNodes;
    ioKeyErrorExistingNodes;
    RemovedNodes;
    OpenNodes;
    DiscoverStatus;
    constructor(Data) {
        super(Data);
        this.AddedNodes = bitArrayToArray(this.Data.subarray(0, 26));
        this.RFConnectionErrorNodes = bitArrayToArray(this.Data.subarray(26, 52));
        this.ioKeyErrorExistingNodes = bitArrayToArray(this.Data.subarray(52, 78));
        this.RemovedNodes = bitArrayToArray(this.Data.subarray(78, 104));
        this.OpenNodes = bitArrayToArray(this.Data.subarray(104, 130));
        this.DiscoverStatus = this.Data.readUInt8(130);
    }
}
//# sourceMappingURL=GW_CS_DISCOVER_NODES_NTF.js.map