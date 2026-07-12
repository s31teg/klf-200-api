"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LockPriorityLevel = exports.ContactInputAssignment = void 0;
var ContactInputAssignment;
(function (ContactInputAssignment) {
    ContactInputAssignment[ContactInputAssignment["NotAssigned"] = 0] = "NotAssigned";
    ContactInputAssignment[ContactInputAssignment["Scene"] = 1] = "Scene";
    ContactInputAssignment[ContactInputAssignment["ProductGroup"] = 2] = "ProductGroup";
    ContactInputAssignment[ContactInputAssignment["NodeMode"] = 3] = "NodeMode";
})(ContactInputAssignment || (exports.ContactInputAssignment = ContactInputAssignment = {}));
var LockPriorityLevel;
(function (LockPriorityLevel) {
    LockPriorityLevel[LockPriorityLevel["NoLock"] = 0] = "NoLock";
    LockPriorityLevel[LockPriorityLevel["Lock30Min"] = 1] = "Lock30Min";
    LockPriorityLevel[LockPriorityLevel["LockForever"] = 2] = "LockForever";
})(LockPriorityLevel || (exports.LockPriorityLevel = LockPriorityLevel = {}));
//# sourceMappingURL=GW_CONTACTINPUT.js.map