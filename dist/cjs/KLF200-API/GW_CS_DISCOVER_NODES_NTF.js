"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_DISCOVER_NODES_NTF = exports.DiscoverStatus = void 0;
const BitArray_js_1 = require("../utils/BitArray.js");
const common_js_1 = require("./common.js");
var DiscoverStatus;
(function (DiscoverStatus) {
    DiscoverStatus[DiscoverStatus["OK"] = 0] = "OK";
    DiscoverStatus[DiscoverStatus["Failed"] = 5] = "Failed";
    DiscoverStatus[DiscoverStatus["PartialOK"] = 6] = "PartialOK";
    DiscoverStatus[DiscoverStatus["Busy"] = 7] = "Busy";
})(DiscoverStatus || (exports.DiscoverStatus = DiscoverStatus = {}));
class GW_CS_DISCOVER_NODES_NTF extends common_js_1.GW_FRAME_NTF {
    AddedNodes;
    RFConnectionErrorNodes;
    ioKeyErrorExistingNodes;
    RemovedNodes;
    OpenNodes;
    DiscoverStatus;
    constructor(Data) {
        super(Data);
        this.AddedNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(0, 26));
        this.RFConnectionErrorNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(26, 52));
        this.ioKeyErrorExistingNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(52, 78));
        this.RemovedNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(78, 104));
        this.OpenNodes = (0, BitArray_js_1.bitArrayToArray)(this.Data.subarray(104, 130));
        this.DiscoverStatus = this.Data.readUInt8(130);
    }
}
exports.GW_CS_DISCOVER_NODES_NTF = GW_CS_DISCOVER_NODES_NTF;
//# sourceMappingURL=GW_CS_DISCOVER_NODES_NTF.js.map