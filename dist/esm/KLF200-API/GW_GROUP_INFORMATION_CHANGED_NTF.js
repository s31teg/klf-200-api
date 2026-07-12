"use strict";
import { bitArrayToArray } from "../utils/BitArray.js";
import { GroupType } from "./GW_GROUPS.js";
import { GW_FRAME_NTF, readZString } from "./common.js";
export var ChangeType;
(function (ChangeType) {
    ChangeType[ChangeType["Deleted"] = 0] = "Deleted";
    ChangeType[ChangeType["Modified"] = 1] = "Modified";
})(ChangeType || (ChangeType = {}));
export class GW_GROUP_INFORMATION_CHANGED_NTF extends GW_FRAME_NTF {
    GroupID;
    ChangeType;
    Order;
    Placement;
    Name;
    Velocity;
    NodeVariation;
    GroupType;
    Nodes;
    Revision;
    constructor(Data) {
        super(Data);
        this.ChangeType = this.Data.readUInt8(0);
        this.GroupID = this.Data.readUInt8(1);
        if (this.ChangeType === ChangeType.Modified) {
            this.Order = this.Data.readUInt16BE(2);
            this.Placement = this.Data.readUInt8(4);
            this.Name = readZString(this.Data.subarray(5, 69));
            this.Velocity = this.Data.readUInt8(69);
            this.NodeVariation = this.Data.readUInt8(70);
            this.GroupType = this.Data.readUInt8(71);
            this.Revision = this.Data.readUInt16BE(98);
            if (this.GroupType === GroupType.UserGroup) {
                this.Nodes = bitArrayToArray(this.Data.subarray(73, 98));
            }
            else {
                this.Nodes = [];
            }
        }
    }
}
//# sourceMappingURL=GW_GROUP_INFORMATION_CHANGED_NTF.js.map