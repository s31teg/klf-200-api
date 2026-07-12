"use strict";
import { GW_FRAME_NTF, readZString } from "./common.js";
export class GW_GET_SCENE_INFORMATION_NTF extends GW_FRAME_NTF {
    SceneID;
    Name;
    NumberOfNodes;
    NumberOfRemainingNodes;
    Nodes = [];
    constructor(Data) {
        super(Data);
        this.SceneID = this.Data.readUInt8(0);
        this.Name = readZString(this.Data.subarray(1, 65));
        this.NumberOfNodes = this.Data.readUInt8(65);
        this.NumberOfRemainingNodes = this.Data.readUInt8(this.NumberOfNodes * 4 + 66);
        for (let nodeIndex = 0; nodeIndex < this.NumberOfNodes; nodeIndex++) {
            this.Nodes.push({
                NodeID: this.Data.readUInt8(nodeIndex * 4 + 66),
                ParameterID: this.Data.readUInt8(nodeIndex * 4 + 67),
                ParameterValue: this.Data.readUInt16BE(nodeIndex * 4 + 68),
            });
        }
    }
}
//# sourceMappingURL=GW_GET_SCENE_INFORMATION_NTF.js.map