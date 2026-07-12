"use strict";
var __addDisposableResource = (this && this.__addDisposableResource) || function (env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose, inner;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
            if (async) inner = dispose;
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        if (inner) dispose = function() { try { inner.call(this); } catch (e) { return Promise.reject(e); } };
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
};
var __disposeResources = (this && this.__disposeResources) || (function (SuppressedError) {
    return function (env) {
        function fail(e) {
            env.error = env.hasError ? new SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
            env.hasError = true;
        }
        var r, s = 0;
        function next() {
            while (r = env.stack.pop()) {
                try {
                    if (!r.async && s === 1) return s = 0, env.stack.push(r), Promise.resolve().then(next);
                    if (r.dispose) {
                        var result = r.dispose.call(r.value);
                        if (r.async) return s |= 2, Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
                    }
                    else s |= 1;
                }
                catch (e) {
                    fail(e);
                }
            }
            if (s === 1) return env.hasError ? Promise.reject(env.error) : Promise.resolve();
            if (env.hasError) throw env.error;
        }
        return next();
    };
})(typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.Groups = exports.Group = void 0;
const debug_1 = require("debug");
require("disposablestack/auto");
const GW_ACTIVATE_PRODUCTGROUP_REQ_js_1 = require("./KLF200-API/GW_ACTIVATE_PRODUCTGROUP_REQ.js");
const GW_COMMAND_js_1 = require("./KLF200-API/GW_COMMAND.js");
const GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF_js_1 = require("./KLF200-API/GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF.js");
const GW_GET_ALL_GROUPS_INFORMATION_NTF_js_1 = require("./KLF200-API/GW_GET_ALL_GROUPS_INFORMATION_NTF.js");
const GW_GET_ALL_GROUPS_INFORMATION_REQ_js_1 = require("./KLF200-API/GW_GET_ALL_GROUPS_INFORMATION_REQ.js");
const GW_GET_GROUP_INFORMATION_NTF_js_1 = require("./KLF200-API/GW_GET_GROUP_INFORMATION_NTF.js");
const GW_GET_GROUP_INFORMATION_REQ_js_1 = require("./KLF200-API/GW_GET_GROUP_INFORMATION_REQ.js");
const GW_GET_NODE_INFORMATION_NTF_js_1 = require("./KLF200-API/GW_GET_NODE_INFORMATION_NTF.js");
const GW_GET_NODE_INFORMATION_REQ_js_1 = require("./KLF200-API/GW_GET_NODE_INFORMATION_REQ.js");
const GW_GROUPS_js_1 = require("./KLF200-API/GW_GROUPS.js");
const GW_GROUP_INFORMATION_CHANGED_NTF_js_1 = require("./KLF200-API/GW_GROUP_INFORMATION_CHANGED_NTF.js");
const GW_SET_GROUP_INFORMATION_REQ_js_1 = require("./KLF200-API/GW_SET_GROUP_INFORMATION_REQ.js");
const common_js_1 = require("./KLF200-API/common.js");
const PropertyChangedEvent_js_1 = require("./utils/PropertyChangedEvent.js");
const TypedEvent_js_1 = require("./utils/TypedEvent.js");
const UtilityFunctions_js_1 = require("./utils/UtilityFunctions.js");
const debug = (0, debug_1.default)(`klf-200-api:groups`);
/**
 * The gateway can hold up to 100 groups. A group is a collection of actuator nodes in
conjunction with a name and some other come characteristics.

There are three different group types. House, Room and User defined. There can be only
one instance of the group type house. The GroupID = 0 is reserved for the house group.
An actuator can only be represented in one room group. So, if an actuator is assigned to
a room group it will automatically be removed from another existing room group.
 *
 * @class Group
 */
class Group extends PropertyChangedEvent_js_1.Component {
    Connection;
    /**
     * ID of the group.
     *
     * @type {number}
     */
    GroupID;
    _order;
    _placement;
    _name;
    _velocity;
    _nodeVariation;
    _groupType;
    /**
     * List of node IDs which are part of the group.
     *
     * @type {number[]}
     */
    _Nodes = [];
    get Nodes() {
        return this._Nodes;
    }
    _revision;
    _disposables;
    /**
     * Creates an instance of Group based on the provided notification frame.
     * You shouldn't create groups by yourself but rather use the [[Groups]] class
     * to provide you with a list of all groups.
     * @param {IConnection} Connection The connection that will be used to send and receive commands.
     * @param {(GW_GET_GROUP_INFORMATION_NTF | GW_GET_ALL_GROUPS_INFORMATION_NTF | GW_GROUP_INFORMATION_CHANGED_NTF)} frame Notification frame that is used to set the properties of the Group class instance.
     */
    constructor(Connection, frame) {
        debug(`Creating Group instance.`);
        super();
        this.Connection = Connection;
        this._disposables = new DisposableStack();
        this.GroupID = frame.GroupID;
        this._order = frame.Order;
        this._placement = frame.Placement;
        this._name = frame.Name;
        this._velocity = frame.Velocity;
        this._nodeVariation = frame.NodeVariation;
        this._groupType = frame.GroupType;
        this.Nodes.push(...frame.Nodes);
        this._revision = frame.Revision;
        this._disposables.use(this.Connection.on(async (frame) => {
            debug(`Calling onNotificationHandler for GW_GET_GROUP_INFORMATION_NTF added in Group constructor for GroupID: ${this.GroupID}.`);
            await this.onNotificationHandler(frame);
        }, [common_js_1.GatewayCommand.GW_GET_GROUP_INFORMATION_NTF]));
    }
    [Symbol.dispose]() {
        debug(`Disposing Group instance.`);
        this._disposables.dispose();
        super[Symbol.dispose]();
        debug(`Disposed Group instance.`);
    }
    /**
     * This method fires PropertyChanged events based on the changes
     * in the frame provided by the parameter.
     * This method will be used internally and you shouldn't need to
     * use it on your own.
     *
     * @param {GW_GROUP_INFORMATION_CHANGED_NTF_Modified} frame Change notification frame to calculate the changes.
     */
    async changeFromNotification(frame) {
        debug(`Calling changeFromNotification for GroupID: ${this.GroupID} with frame: ${JSON.stringify(frame)}.`);
        if (this._order !== frame.Order) {
            this._order = frame.Order;
            await this.propertyChanged("Order");
        }
        if (this._placement !== frame.Placement) {
            this._placement = frame.Placement;
            await this.propertyChanged("Placement");
        }
        if (this._name !== frame.Name) {
            this._name = frame.Name;
            await this.propertyChanged("Name");
        }
        if (this._velocity !== frame.Velocity) {
            this._velocity = frame.Velocity;
            await this.propertyChanged("Velocity");
        }
        if (this._nodeVariation !== frame.NodeVariation) {
            this._nodeVariation = frame.NodeVariation;
            await this.propertyChanged("NodeVariation");
        }
        if (this._groupType !== frame.GroupType) {
            this._groupType = frame.GroupType;
            await this.propertyChanged("GroupType");
        }
        if (!(0, UtilityFunctions_js_1.isArrayEqual)(this.Nodes, frame.Nodes)) {
            this.Nodes.length = 0; // Clear nodes array
            this.Nodes.push(...frame.Nodes);
            await this.propertyChanged("Nodes");
        }
        this._revision = frame.Revision;
    }
    /**
     * The order in which the groups should be displayed by a client application.
     *
     * @readonly
     * @type {number}
     */
    get Order() {
        return this._order;
    }
    /**
     * The placement of the product. Either a house index or a room index number.
     *
     * @readonly
     * @type {number}
     */
    get Placement() {
        return this._placement;
    }
    /**
     * Name of the group.
     *
     * @readonly
     * @type {string}
     */
    get Name() {
        return this._name;
    }
    /**
     * The velocity at which the products of the group are operated at if possible.
     *
     * @readonly
     * @type {Velocity}
     */
    get Velocity() {
        return this._velocity;
    }
    /**
     * Defines the variation of the group.
     *
     * @readonly
     * @type {NodeVariation}
     */
    get NodeVariation() {
        return this._nodeVariation;
    }
    /**
     * Type of the group.
     *
     * * House - The house group can't be changed and contains all node IDs.
     * * Room - Each product can only be in one room.
     * * User group - User groups can be defined freely.
     *
     * @readonly
     * @type {GroupType}
     */
    get GroupType() {
        return this._groupType;
    }
    /**
     * Change properties of the group.
     *
     * If there are no changes in the properties the method returns directly with a resolved promise.
     *
     * @param {number} order New value for the Order property.
     * @param {number} placement New value for the Placement property.
     * @param {string} name New value for the Name property.
     * @param {Velocity} velocity New value for the Velocity property.
     * @param {NodeVariation} nodeVariation New value for the NodeVariation property.
     * @param {number[]} nodes New list of nodes.
     * @returns {Promise<void>}
     */
    async changeGroupAsync(order, placement, name, velocity, nodeVariation, nodes) {
        debug(`Calling changeGroupAsync for GroupID: ${this.GroupID} with order: ${order}, placement: ${placement}, name: ${name}, velocity: ${velocity}, nodeVariation: ${nodeVariation}, nodes: ${JSON.stringify(nodes)}.`);
        try {
            const changedProperties = [];
            if (order !== this._order)
                changedProperties.push("Order");
            if (placement !== this._placement)
                changedProperties.push("Placement");
            if (name !== this._name)
                changedProperties.push("Name");
            if (velocity !== this._velocity)
                changedProperties.push("Velocity");
            if (nodeVariation !== this._nodeVariation)
                changedProperties.push("NodeVariation");
            if (!(0, UtilityFunctions_js_1.isArrayEqual)(nodes, this.Nodes))
                changedProperties.push("Nodes");
            // If there are no changes in the properties return directly with a resolved promise.
            if (changedProperties.length === 0)
                return Promise.resolve();
            const confirmationFrame = await this.Connection.sendFrameAsync(new GW_SET_GROUP_INFORMATION_REQ_js_1.GW_SET_GROUP_INFORMATION_REQ(this.GroupID, this._revision, name, this._groupType, nodes, order, placement, velocity, nodeVariation));
            if (confirmationFrame.Status === common_js_1.GW_COMMON_STATUS.SUCCESS) {
                debug(`GroupID: ${this.GroupID} changed successfully`);
                return Promise.resolve();
            }
            else {
                debug(`Failed to change GroupID: ${this.GroupID}`);
                return Promise.reject(new Error(confirmationFrame.getError()));
            }
        }
        catch (error) {
            debug(`Failed to change GroupID: ${this.GroupID}`);
            return Promise.reject(error);
        }
    }
    /**
     * Sets a new value for the order number of the group.
     *
     * @param {number} newOrder New value for the order property.
     * @returns {Promise<void>}
     */
    async setOrderAsync(newOrder) {
        debug(`Setting order for GroupID: ${this.GroupID} to "${newOrder}"`);
        return this.changeGroupAsync(newOrder, this._placement, this._name, this._velocity, this._nodeVariation, this.Nodes);
    }
    /**
     * Sets a new value for the placement of the group.
     *
     * @param {number} newPlacement New value for the placement property.
     * @returns {Promise<void>}
     */
    async setPlacementAsync(newPlacement) {
        debug(`Setting placement for GroupID: ${this.GroupID} to "${newPlacement}"`);
        return this.changeGroupAsync(this._order, newPlacement, this._name, this._velocity, this._nodeVariation, this.Nodes);
    }
    /**
     * Renames the group.
     *
     * @param {string} newName New name of the group.
     * @returns {Promise<void>}
     */
    async setNameAsync(newName) {
        debug(`Setting name for GroupID: ${this.GroupID} to "${newName}"`);
        return this.changeGroupAsync(this._order, this._placement, newName, this._velocity, this._nodeVariation, this.Nodes);
    }
    /**
     * Sets the velocity for the group.
     *
     * @param {Velocity} newVelocity New velocity value for the group.
     * @returns {Promise<void>}
     */
    async setVelocityAsync(newVelocity) {
        debug(`Setting velocity for GroupID: ${this.GroupID} to "${newVelocity}"`);
        return this.changeGroupAsync(this._order, this._placement, this._name, newVelocity, this._nodeVariation, this.Nodes);
    }
    /**
     * Sets the variation of the group to a new value.
     *
     * @param {NodeVariation} newNodeVariation New value for the variation of the group.
     * @returns {Promise<void>}
     */
    async setNodeVariationAsync(newNodeVariation) {
        debug(`Setting NodeVariation for GroupID: ${this.GroupID} to "${newNodeVariation}"`);
        return this.changeGroupAsync(this._order, this._placement, this._name, this._velocity, newNodeVariation, this.Nodes);
    }
    /**
     * Sets the group to contain the provided list of node IDs in the group.
     *
     * @param {number[]} newNodes Array of new node IDs for the group.
     * @returns {Promise<void>}
     */
    async setNodesAsync(newNodes) {
        debug(`Setting nodes for GroupID: ${this.GroupID} to "${JSON.stringify(newNodes)}"`);
        return this.changeGroupAsync(this._order, this._placement, this._name, this._velocity, this._nodeVariation, newNodes);
    }
    /**
     * Sets the target position for all products of the group as raw value.
     *
     * @param {number} newPositionRaw New target position value as raw value.
     * @param Velocity The velocity with which the scene will be run.
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @param ParameterActive The parameter that should be set by this command. MP or FP1-FP16.
     * @param PriorityLevelLock Flag if the priority level lock should be used.
     * @param PriorityLevels Up to 8 priority levels.
     * @param LockTime Lock time for the priority levels in seconds (multiple of 30 or Infinity).
     * @returns {Promise<number>} Returns the session ID of the command.
     */
    async setTargetPositionRawAsync(newPositionRaw, Velocity = 0, PriorityLevel = 3, CommandOriginator = 1, ParameterActive = 0, PriorityLevelLock = 0, PriorityLevels = [], LockTime = Infinity) {
        debug(`Setting TargetPositionRaw for GroupID: ${this.GroupID} to ${newPositionRaw}`);
        try {
            const confirmationFrame = await this.Connection.sendFrameAsync(new GW_ACTIVATE_PRODUCTGROUP_REQ_js_1.GW_ACTIVATE_PRODUCTGROUP_REQ(this.GroupID, newPositionRaw, PriorityLevel, CommandOriginator, ParameterActive, Velocity, PriorityLevelLock, PriorityLevels, LockTime));
            if (confirmationFrame.Status === GW_COMMAND_js_1.ActivateProductGroupStatus.OK) {
                debug(`TargetPositionRaw for GroupID: ${this.GroupID} set to ${newPositionRaw}`);
                return confirmationFrame.SessionID;
            }
            else {
                debug(`Error setting TargetPositionRaw for GroupID: ${this.GroupID}`);
                return Promise.reject(new Error(confirmationFrame.getError()));
            }
        }
        catch (error) {
            debug(`Error setting TargetPositionRaw for GroupID: ${this.GroupID}`);
            return Promise.reject(error);
        }
    }
    /**
     * Sets the target position for all products of the group
     *
     * @param {number} newPosition New target position value in percent.
     * @param Velocity The velocity with which the scene will be run.
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @param ParameterActive The parameter that should be set by this command. MP or FP1-FP16.
     * @param PriorityLevelLock Flag if the priority level lock should be used.
     * @param PriorityLevels Up to 8 priority levels.
     * @param LockTime Lock time for the priority levels in seconds (multiple of 30 or Infinity).
     * @returns {Promise<number>} Returns the session ID of the command.
     */
    async setTargetPositionAsync(newPosition, Velocity = 0, PriorityLevel = 3, CommandOriginator = 1, ParameterActive = 0, PriorityLevelLock = 0, PriorityLevels = [], LockTime = Infinity) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            debug(`Setting TargetPosition for GroupID: ${this.GroupID} to ${newPosition}`);
            // Get product type from first node ID for conversion
            const nodeID = this.Nodes[0];
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            let resolve, reject;
            const nodeTypeIDPromise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            // Setup notification to receive notification with actuator type
            // Register notification handler
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const dispose = __addDisposableResource(env_1, this.Connection.on((frame) => {
                try {
                    debug(`Calling handler for GW_GET_NODE_INFORMATION_NTF in Group.setTargetPositionAsync for GroupID: ${this.GroupID}.`);
                    if (frame instanceof GW_GET_NODE_INFORMATION_NTF_js_1.GW_GET_NODE_INFORMATION_NTF && frame.NodeID === nodeID) {
                        const nodeTypeID = frame.ActuatorType;
                        resolve(nodeTypeID);
                    }
                }
                catch (error) {
                    debug(`Error calling handler for GW_GET_NODE_INFORMATION_NTF in Group.setTargetPositionAsync for GroupID: ${this.GroupID}.`);
                    reject(error);
                }
            }, [common_js_1.GatewayCommand.GW_GET_NODE_INFORMATION_NTF]), false);
            const productInformation = await this.Connection.sendFrameAsync(new GW_GET_NODE_INFORMATION_REQ_js_1.GW_GET_NODE_INFORMATION_REQ(nodeID));
            if (productInformation.Status !== common_js_1.GW_COMMON_STATUS.SUCCESS) {
                debug(`Error getting node information for GroupID: ${this.GroupID} for nodeID: ${nodeID}`);
                return Promise.reject(new Error(productInformation.getError()));
            }
            return this.setTargetPositionRawAsync((0, GW_COMMAND_js_1.convertPosition)(newPosition, await nodeTypeIDPromise), Velocity, PriorityLevel, CommandOriginator, ParameterActive, PriorityLevelLock, PriorityLevels, LockTime);
        }
        catch (e_1) {
            env_1.error = e_1;
            env_1.hasError = true;
        }
        finally {
            __disposeResources(env_1);
        }
    }
    /**
     * Refresh the data of this group and read the attributes from the gateway.
     *
     * You can use this method to refresh the state of the group in case
     * that you have missed changes, e.g. a simple remote control may change
     * the state of the group and you won't receive an event for it.
     *
     * @returns {Promise<void>}
     */
    async refreshAsync() {
        debug(`Refreshing GroupID: ${this.GroupID}`);
        const confirmationFrame = await this.Connection.sendFrameAsync(new GW_GET_GROUP_INFORMATION_REQ_js_1.GW_GET_GROUP_INFORMATION_REQ(this.GroupID));
        if (confirmationFrame.Status === common_js_1.GW_COMMON_STATUS.SUCCESS) {
            debug(`GroupID: ${this.GroupID} refreshed successfully`);
            return Promise.resolve();
        }
        else {
            debug(`Failed to refresh GroupID: ${this.GroupID}`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    async onNotificationHandler(frame) {
        if (typeof this === "undefined")
            return;
        debug(`Handling notification for GroupID: ${this.GroupID} with frame: ${JSON.stringify(frame)}`);
        if (frame instanceof GW_GET_GROUP_INFORMATION_NTF_js_1.GW_GET_GROUP_INFORMATION_NTF) {
            await this.onGetGroupInformation(frame);
        }
    }
    async onGetGroupInformation(frame) {
        debug(`Handling notification for GroupID: ${this.GroupID} with frame: ${JSON.stringify(frame)}`);
        if (frame.GroupID === this.GroupID) {
            if (frame.Order !== this._order) {
                this._order = frame.Order;
                await this.propertyChanged("Order");
            }
            if (frame.Placement !== this._placement) {
                this._placement = frame.Placement;
                await this.propertyChanged("Placement");
            }
            if (frame.Name !== this._name) {
                this._name = frame.Name;
                await this.propertyChanged("Name");
            }
            if (frame.Velocity !== this._velocity) {
                this._velocity = frame.Velocity;
                await this.propertyChanged("Velocity");
            }
            if (frame.NodeVariation !== this._nodeVariation) {
                this._nodeVariation = frame.NodeVariation;
                await this.propertyChanged("NodeVariation");
            }
            if (frame.GroupType !== this._groupType) {
                this._groupType = frame.GroupType;
                await this.propertyChanged("GroupType");
            }
            const hasRemovedNodes = this.Nodes.every((item) => frame.Nodes.includes(item));
            const hasNewNodes = frame.Nodes.every((item) => this.Nodes.includes(item));
            if (hasRemovedNodes || hasNewNodes) {
                this.Nodes.length = 0;
                this.Nodes.push(...frame.Nodes);
                await this.propertyChanged("Nodes");
            }
            this._revision = frame.Revision;
        }
    }
}
exports.Group = Group;
/**
 * The Groups class represent all groups defined in the KLF-200.
 *
 * @class Groups
 */
class Groups {
    Connection;
    groupType;
    _onChangedGroup = new TypedEvent_js_1.TypedEvent();
    _onRemovedGroup = new TypedEvent_js_1.TypedEvent();
    /**
     * Contains a list of groups.
     * The index of each group corresponds to the
     * group ID.
     *
     * @type {Group[]}
     */
    Groups = [];
    _disposables = new DisposableStack();
    constructor(Connection, groupType = GW_GROUPS_js_1.GroupType.UserGroup) {
        this.Connection = Connection;
        this.groupType = groupType;
    }
    [Symbol.dispose]() {
        debug("Disposing Groups.");
        this._disposables.dispose();
        this.Groups.forEach((group) => group[Symbol.dispose]());
        this.Groups.length = 0;
        debug("Disposed Groups.");
    }
    async initializeGroupsAsync() {
        const env_2 = { stack: [], error: void 0, hasError: false };
        try {
            debug("Initializing Groups.");
            // Setup notification to receive notification with actuator type
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            let resolve, reject;
            const notificationHandler = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const dispose = __addDisposableResource(env_2, this.Connection.on((frame) => {
                try {
                    debug(`Calling handler for GW_GET_ALL_GROUPS_INFORMATION_NTF, GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF, GW_GET_GROUP_INFORMATION_NTF in Groups.initializeGroupsAsync.`);
                    if (frame instanceof GW_GET_ALL_GROUPS_INFORMATION_NTF_js_1.GW_GET_ALL_GROUPS_INFORMATION_NTF ||
                        frame instanceof GW_GET_GROUP_INFORMATION_NTF_js_1.GW_GET_GROUP_INFORMATION_NTF) {
                        this.Groups[frame.GroupID] = new Group(this.Connection, frame);
                    }
                    else if (frame instanceof GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF_js_1.GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF) {
                        debug("Received GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF.");
                        resolve();
                    }
                }
                catch (error) {
                    debug(`Error in handler for GW_GET_ALL_GROUPS_INFORMATION_NTF, GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF, GW_GET_GROUP_INFORMATION_NTF in Groups.initializeGroupsAsync: ${error}`);
                    reject(error);
                }
            }, [
                common_js_1.GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_NTF,
                common_js_1.GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF,
                common_js_1.GatewayCommand.GW_GET_GROUP_INFORMATION_NTF,
            ]), false);
            const getAllGroupsInformation = await this.Connection.sendFrameAsync(new GW_GET_ALL_GROUPS_INFORMATION_REQ_js_1.GW_GET_ALL_GROUPS_INFORMATION_REQ(this.groupType));
            if (getAllGroupsInformation.Status !== common_js_1.GW_COMMON_STATUS.SUCCESS) {
                if (getAllGroupsInformation.Status !==
                    common_js_1.GW_COMMON_STATUS.INVALID_NODE_ID /* No groups available -> not a real error */) {
                    debug("Failed to get all groups information.");
                    return Promise.reject(new Error(getAllGroupsInformation.getError()));
                }
            }
            // Only wait for notifications if there are groups defined
            if (getAllGroupsInformation.NumberOfGroups > 0) {
                debug(`Waiting for notifications for ${getAllGroupsInformation.NumberOfGroups} groups.`);
                await notificationHandler;
            }
            // Finally, setup the event handler for notifications
            this._disposables.use(this.Connection.on(async (frame) => {
                debug(`Calling onNotificationHandler for GW_GROUP_INFORMATION_CHANGED_NTF added in Groups.initializeGroupsAsync.`);
                await this.onNotificationHandler(frame);
            }, [common_js_1.GatewayCommand.GW_GROUP_INFORMATION_CHANGED_NTF]));
        }
        catch (e_2) {
            env_2.error = e_2;
            env_2.hasError = true;
        }
        finally {
            __disposeResources(env_2);
        }
    }
    /**
     * Adds a handler that will be called if a new group is added to the KLF-200 interface or a group has been changed.
     *
     * @param {Listener<number>} handler Event handler that is called if a new group is added or a group has been changed.
     * @returns {Disposable} The event handler can be removed by using the dispose method of the returned object.
     */
    onChangedGroup(handler) {
        debug("Adding handler for onChangedGroup.");
        return this._onChangedGroup.on(handler);
    }
    /**
     * Adds a handler that will be called if a group is removed from the KLF-200 interface.
     *
     * @param {Listener<number>} handler Event handler that is called if a group is removed.
     * @returns {Disposable} The event handler can be removed by using the dispose method of the returned object.
     */
    onRemovedGroup(handler) {
        debug("Adding handler for onRemovedGroup.");
        return this._onRemovedGroup.on(handler);
    }
    async notifyChangedGroup(groupId) {
        debug("Notifying changed group.");
        await this._onChangedGroup.emit(groupId);
    }
    async notifyRemovedGroup(groupId) {
        debug("Notifying removed group.");
        await this._onRemovedGroup.emit(groupId);
    }
    async onNotificationHandler(frame) {
        debug(`Calling handler for GW_GROUP_INFORMATION_CHANGED_NTF in Groups.onNotificationHandler with frame: ${JSON.stringify(frame)}.`);
        if (frame instanceof GW_GROUP_INFORMATION_CHANGED_NTF_js_1.GW_GROUP_INFORMATION_CHANGED_NTF) {
            switch (frame.ChangeType) {
                case GW_GROUP_INFORMATION_CHANGED_NTF_js_1.ChangeType.Deleted:
                    // Remove group
                    debug(`Removing GroupID: ${frame.GroupID}`);
                    if (this.Groups[frame.GroupID]) {
                        this.Groups[frame.GroupID][Symbol.dispose]();
                    }
                    delete this.Groups[frame.GroupID];
                    await this.notifyRemovedGroup(frame.GroupID);
                    break;
                case GW_GROUP_INFORMATION_CHANGED_NTF_js_1.ChangeType.Modified:
                    // Add or change group
                    debug(`Modifying GroupID: ${frame.GroupID}`);
                    if (typeof this.Groups[frame.GroupID] === "undefined") {
                        // Add node
                        this.Groups[frame.GroupID] = new Group(this.Connection, frame);
                    }
                    else {
                        // Change group
                        await this.Groups[frame.GroupID].changeFromNotification(frame);
                    }
                    await this.notifyChangedGroup(frame.GroupID);
                    break;
                default:
                    break;
            }
        }
    }
    /**
     * Creates a new instance of the Groups class.
     * During the initialization phase of the class
     * a list of all groups will be retrieved from
     * the KLF-200 interface and stored at the
     * Groups array.
     *
     * Additionally, some notification handlers
     * will be instantiated to watch for changes
     * to the groups.
     *
     * @param {IConnection} Connection The connection object that handles the communication to the KLF interface.
     * @param [groupType=GroupType.UserGroup] The group type for which the groups should be read. Default is {@link GroupType.UserGroup}.
     * @returns {Promise<Groups>} Resolves to a new instance of the Groups class.
     */
    static async createGroupsAsync(Connection, groupType = GW_GROUPS_js_1.GroupType.UserGroup) {
        debug("Creating new instance of Groups.");
        try {
            const result = new Groups(Connection, groupType);
            await result.initializeGroupsAsync();
            debug("Successfully created new instance of Groups.");
            return result;
        }
        catch (error) {
            debug(`Error while creating new instance of Groups: ${error}`);
            return Promise.reject(error);
        }
    }
    /**
     * Finds a group by its name and returns the group object.
     *
     * @param {string} groupName The name of the group.
     * @returns {(Group | undefined)} Returns the group object if found, otherwise undefined.
     */
    findByName(groupName) {
        debug(`Calling findByName with groupName: ${groupName}.`);
        return this.Groups.find((grp) => typeof grp !== "undefined" && grp.Name === groupName);
    }
}
exports.Groups = Groups;
//# sourceMappingURL=groups.js.map