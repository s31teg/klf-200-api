"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GW_GET_STATE_CFM = exports.GatewaySubState = exports.GatewayState = void 0;
const common_js_1 = require("./common.js");
var GatewayState;
(function (GatewayState) {
    GatewayState[GatewayState["TestMode"] = 0] = "TestMode";
    GatewayState[GatewayState["GatewayMode_NoActuatorNodes"] = 1] = "GatewayMode_NoActuatorNodes";
    GatewayState[GatewayState["GatewayMode_WithActuatorNodes"] = 2] = "GatewayMode_WithActuatorNodes";
    GatewayState[GatewayState["BeaconMode_NotConfigured"] = 3] = "BeaconMode_NotConfigured";
    GatewayState[GatewayState["BeaconMode_Configured"] = 4] = "BeaconMode_Configured";
})(GatewayState || (exports.GatewayState = GatewayState = {}));
var GatewaySubState;
(function (GatewaySubState) {
    GatewaySubState[GatewaySubState["Idle"] = 0] = "Idle";
    GatewaySubState[GatewaySubState["RunningConfigurationService"] = 1] = "RunningConfigurationService";
    GatewaySubState[GatewaySubState["RunningSceneConfiguration"] = 2] = "RunningSceneConfiguration";
    GatewaySubState[GatewaySubState["RunningInformationServiceConfiguration"] = 3] = "RunningInformationServiceConfiguration";
    GatewaySubState[GatewaySubState["RunningContactInputConfiguration"] = 4] = "RunningContactInputConfiguration";
    GatewaySubState[GatewaySubState["RunningCommand"] = 128] = "RunningCommand";
    GatewaySubState[GatewaySubState["RunningActivateGroup"] = 129] = "RunningActivateGroup";
    GatewaySubState[GatewaySubState["RunningActivateScene"] = 130] = "RunningActivateScene";
})(GatewaySubState || (exports.GatewaySubState = GatewaySubState = {}));
class GW_GET_STATE_CFM extends common_js_1.GW_FRAME_CFM {
    GatewayState;
    GatewaySubState;
    StateData;
    constructor(Data) {
        super(Data);
        this.GatewayState = this.Data.readUInt8(0);
        this.GatewaySubState = this.Data.readUInt8(1);
        this.StateData = this.Data.subarray(2, 6);
    }
}
exports.GW_GET_STATE_CFM = GW_GET_STATE_CFM;
//# sourceMappingURL=GW_GET_STATE_CFM.js.map