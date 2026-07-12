"use strict";
export var InitializeSceneConfirmationStatus;
(function (InitializeSceneConfirmationStatus) {
    InitializeSceneConfirmationStatus[InitializeSceneConfirmationStatus["OK"] = 0] = "OK";
    InitializeSceneConfirmationStatus[InitializeSceneConfirmationStatus["EmptySystemTable"] = 1] = "EmptySystemTable";
    InitializeSceneConfirmationStatus[InitializeSceneConfirmationStatus["OutOfStorage"] = 2] = "OutOfStorage";
})(InitializeSceneConfirmationStatus || (InitializeSceneConfirmationStatus = {}));
export var InitializeSceneNotificationStatus;
(function (InitializeSceneNotificationStatus) {
    InitializeSceneNotificationStatus[InitializeSceneNotificationStatus["OK"] = 0] = "OK";
    InitializeSceneNotificationStatus[InitializeSceneNotificationStatus["PartlyOK"] = 1] = "PartlyOK";
    InitializeSceneNotificationStatus[InitializeSceneNotificationStatus["Error"] = 2] = "Error";
})(InitializeSceneNotificationStatus || (InitializeSceneNotificationStatus = {}));
export var RecordSceneStatus;
(function (RecordSceneStatus) {
    RecordSceneStatus[RecordSceneStatus["OK"] = 0] = "OK";
    RecordSceneStatus[RecordSceneStatus["RequestFailed"] = 1] = "RequestFailed";
    RecordSceneStatus[RecordSceneStatus["NoProductStimulation"] = 2] = "NoProductStimulation";
    RecordSceneStatus[RecordSceneStatus["OutOfStorage"] = 3] = "OutOfStorage";
})(RecordSceneStatus || (RecordSceneStatus = {}));
export var RenameSceneStatus;
(function (RenameSceneStatus) {
    RenameSceneStatus[RenameSceneStatus["OK"] = 0] = "OK";
    RenameSceneStatus[RenameSceneStatus["InvalidSceneIndex"] = 1] = "InvalidSceneIndex";
    RenameSceneStatus[RenameSceneStatus["NameInUse"] = 2] = "NameInUse";
})(RenameSceneStatus || (RenameSceneStatus = {}));
export var ActivateSceneStatus;
(function (ActivateSceneStatus) {
    ActivateSceneStatus[ActivateSceneStatus["OK"] = 0] = "OK";
    ActivateSceneStatus[ActivateSceneStatus["InvalidParameter"] = 1] = "InvalidParameter";
    ActivateSceneStatus[ActivateSceneStatus["RequestRejected"] = 2] = "RequestRejected";
})(ActivateSceneStatus || (ActivateSceneStatus = {}));
//# sourceMappingURL=GW_SCENES.js.map