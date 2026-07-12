"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_SCENE_INFORMATION_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_GET_SCENE_INFORMATION_NTF extends common_js_1.GW_FRAME_NTF {
    SceneID;
    Name;
    NumberOfNodes;
    NumberOfRemainingNodes;
    Nodes = [];
    constructor(Data) {
        super(Data);
        this.SceneID = this.Data.readUInt8(0);
        this.Name = (0, common_js_1.readZString)(this.Data.subarray(1, 65));
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
exports.GW_GET_SCENE_INFORMATION_NTF = GW_GET_SCENE_INFORMATION_NTF;
//# sourceMappingURL=GW_GET_SCENE_INFORMATION_NTF.js.map