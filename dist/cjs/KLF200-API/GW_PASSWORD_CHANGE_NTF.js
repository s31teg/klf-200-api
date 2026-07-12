"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_PASSWORD_CHANGE_NTF = void 0;
const common_js_1 = require("./common.js");
class GW_PASSWORD_CHANGE_NTF extends common_js_1.GW_FRAME_NTF {
    NewPassword;
    constructor(Data) {
        super(Data);
        this.NewPassword = (0, common_js_1.readZString)(this.Data);
    }
}
exports.GW_PASSWORD_CHANGE_NTF = GW_PASSWORD_CHANGE_NTF;
//# sourceMappingURL=GW_PASSWORD_CHANGE_NTF.js.map