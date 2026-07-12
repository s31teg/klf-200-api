"use strict";
import { arrayToBitArray } from "../utils/BitArray.js";
import { GW_FRAME_REQ } from "./common.js";
export class GW_CS_REMOVE_NODES_REQ extends GW_FRAME_REQ {
    Nodes;
    constructor(Nodes) {
        super(26);
        this.Nodes = Nodes;
        const buff = this.Data.subarray(this.offset); // View on the internal buffer makes setting the data easier
        arrayToBitArray(this.Nodes, 26, buff);
    }
}
//# sourceMappingURL=GW_CS_REMOVE_NODES_REQ.js.map