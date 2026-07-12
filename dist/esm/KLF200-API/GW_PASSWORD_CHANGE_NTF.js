"use strict";
import { GW_FRAME_NTF, readZString } from "./common.js";
export class GW_PASSWORD_CHANGE_NTF extends GW_FRAME_NTF {
    NewPassword;
    constructor(Data) {
        super(Data);
        this.NewPassword = readZString(this.Data);
    }
}
//# sourceMappingURL=GW_PASSWORD_CHANGE_NTF.js.map