"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_CS_GET_SYSTEMTABLE_DATA_NTF = void 0;
const common_js_1 = require("./common.js");
const GW_SYSTEMTABLE_DATA_js_1 = require("./GW_SYSTEMTABLE_DATA.js");
class GW_CS_GET_SYSTEMTABLE_DATA_NTF extends common_js_1.GW_FRAME_NTF {
    NumberOfEntries;
    RemainingNumberOfEntries;
    SystemTableEntries = [];
    constructor(Data) {
        super(Data);
        // Read number of entries from data buffer
        this.NumberOfEntries = this.Data.readUInt8(0);
        // Read number of remaining entries from buffer
        const position = this.NumberOfEntries * 11 + 1;
        this.RemainingNumberOfEntries = this.Data.readUInt8(position);
        // Read system table data entries
        for (let entryIndex = 0; entryIndex < this.NumberOfEntries; entryIndex++) {
            const entry = new GW_SYSTEMTABLE_DATA_js_1.SystemTableDataEntry(this.Data.subarray(entryIndex * 11 + 1, (entryIndex + 1) * 11 + 1));
            this.SystemTableEntries.push(entry);
        }
    }
}
exports.GW_CS_GET_SYSTEMTABLE_DATA_NTF = GW_CS_GET_SYSTEMTABLE_DATA_NTF;
//# sourceMappingURL=GW_CS_GET_SYSTEMTABLE_DATA_NTF.js.map