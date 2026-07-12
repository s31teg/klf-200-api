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
import debugModule from "debug";
import "disposablestack/auto";
import { setImmediate } from "timers/promises";
import { CommandOriginator, CommandStatus, LimitationType, LockTime, ParameterActive, PriorityLevel, RunStatus, StatusReply, StatusType, convertPosition, convertPositionRaw, } from "./KLF200-API/GW_COMMAND.js";
import { GW_COMMAND_REMAINING_TIME_NTF } from "./KLF200-API/GW_COMMAND_REMAINING_TIME_NTF.js";
import { GW_COMMAND_RUN_STATUS_NTF } from "./KLF200-API/GW_COMMAND_RUN_STATUS_NTF.js";
import { GW_COMMAND_SEND_REQ } from "./KLF200-API/GW_COMMAND_SEND_REQ.js";
import { GW_CS_SYSTEM_TABLE_UPDATE_NTF } from "./KLF200-API/GW_CS_SYSTEM_TABLE_UPDATE_NTF.js";
import { GW_ERROR, GW_ERROR_NTF } from "./KLF200-API/GW_ERROR_NTF.js";
import { GW_GET_ALL_NODES_INFORMATION_FINISHED_NTF } from "./KLF200-API/GW_GET_ALL_NODES_INFORMATION_FINISHED_NTF.js";
import { GW_GET_ALL_NODES_INFORMATION_NTF } from "./KLF200-API/GW_GET_ALL_NODES_INFORMATION_NTF.js";
import { GW_GET_ALL_NODES_INFORMATION_REQ } from "./KLF200-API/GW_GET_ALL_NODES_INFORMATION_REQ.js";
import { GW_GET_LIMITATION_STATUS_REQ } from "./KLF200-API/GW_GET_LIMITATION_STATUS_REQ.js";
import { GW_GET_NODE_INFORMATION_NTF } from "./KLF200-API/GW_GET_NODE_INFORMATION_NTF.js";
import { GW_GET_NODE_INFORMATION_REQ } from "./KLF200-API/GW_GET_NODE_INFORMATION_REQ.js";
import { GatewayState, GatewaySubState } from "./KLF200-API/GW_GET_STATE_CFM.js";
import { GW_GET_STATE_REQ } from "./KLF200-API/GW_GET_STATE_REQ.js";
import { GW_LIMITATION_STATUS_NTF } from "./KLF200-API/GW_LIMITATION_STATUS_NTF.js";
import { GW_NODE_INFORMATION_CHANGED_NTF } from "./KLF200-API/GW_NODE_INFORMATION_CHANGED_NTF.js";
import { GW_NODE_STATE_POSITION_CHANGED_NTF } from "./KLF200-API/GW_NODE_STATE_POSITION_CHANGED_NTF.js";
import { GW_SESSION_FINISHED_NTF } from "./KLF200-API/GW_SESSION_FINISHED_NTF.js";
import { GW_SET_LIMITATION_REQ } from "./KLF200-API/GW_SET_LIMITATION_REQ.js";
import { GW_SET_NODE_NAME_REQ } from "./KLF200-API/GW_SET_NODE_NAME_REQ.js";
import { GW_SET_NODE_ORDER_AND_PLACEMENT_REQ } from "./KLF200-API/GW_SET_NODE_ORDER_AND_PLACEMENT_REQ.js";
import { GW_SET_NODE_VARIATION_REQ } from "./KLF200-API/GW_SET_NODE_VARIATION_REQ.js";
import { GW_STATUS_REQUEST_NTF } from "./KLF200-API/GW_STATUS_REQUEST_NTF.js";
import { GW_STATUS_REQUEST_REQ } from "./KLF200-API/GW_STATUS_REQUEST_REQ.js";
import { ActuatorType, } from "./KLF200-API/GW_SYSTEMTABLE_DATA.js";
import { GW_WINK_SEND_REQ } from "./KLF200-API/GW_WINK_SEND_REQ.js";
import { GW_COMMON_STATUS, GW_INVERSE_STATUS, GatewayCommand } from "./KLF200-API/common.js";
import { Component } from "./utils/PropertyChangedEvent.js";
import { TypedEvent } from "./utils/TypedEvent.js";
const debug = debugModule(`klf-200-api:products`);
/**
 * Each product that is registered at the KLF-200 interface will be created
 * as an instance of the Product class.
 *
 * @class Product
 */
export class Product extends Component {
    Connection;
    _name;
    /**
     * NodeID is an Actuator index in the system table, to get information from. It must be a
     * value from 0 to 199.
     *
     * @type {number}
     */
    NodeID;
    _TypeID;
    /**
     * Indicates the node type, ex. Window, Roller shutter, Light etc.
     *
     * @readonly
     * @type {ActuatorType}
     */
    get TypeID() {
        return this._TypeID;
    }
    _SubType;
    /**
     * Details the node type and depends on the TypeID property.
     *
     * @readonly
     * @type {number}
     */
    get SubType() {
        return this._SubType;
    }
    _order;
    _placement;
    _velocity;
    /**
     * Velocity the node is operated with.
     *
     * @readonly
     * @type {Velocity}
     */
    get Velocity() {
        return this._velocity;
    }
    _nodeVariation;
    _PowerSaveMode;
    /**
     * The power mode of the node.
     *
     * @readonly
     * @type {PowerSaveMode}
     */
    get PowerSaveMode() {
        return this._PowerSaveMode;
    }
    _SerialNumber;
    /**
     * The serial number of the product.
     *
     * @readonly
     * @type {Buffer}
     */
    get SerialNumber() {
        return this._SerialNumber;
    }
    _ProductType;
    /**
     * Type of the product, eg. KMG, KMX.
     *
     * @readonly
     * @type {number}
     */
    get ProductType() {
        return this._ProductType;
    }
    _state;
    _currentPositionRaw;
    _targetPositionRaw;
    _fp1CurrentPositionRaw;
    _fp2CurrentPositionRaw;
    _fp3CurrentPositionRaw;
    _fp4CurrentPositionRaw;
    _remainingTime;
    _timeStamp;
    _ProductAlias;
    /**
     * Contains the position values to move the product to a special position.
     * The special position is defined by the alias value.
     *
     * E.g. for a window the alias ID for secured ventilation if 0xD803.
     * To move a product into secured ventilation position you have to read
     * the value of the alias for the alias ID 0xD803 and set the
     * raw target position to that value. Different types of windows
     * may return different raw positions.
     *
     * @type {ActuatorAlias[]}
     */
    get ProductAlias() {
        return this._ProductAlias;
    }
    _runStatus = RunStatus.ExecutionCompleted;
    _statusReply = StatusReply.Unknown;
    _disposables = new DisposableStack();
    /**
     * Creates an instance of Product. You shouldn't create instances
     * of the [[Product]] class by yourself. Instead, use the [[Products]] class
     * to read all installed products from the KLF-200.
     *
     * @param {IConnection} Connection The connection object that handles the communication to the KLF interface.
     * @param {(GW_GET_NODE_INFORMATION_NTF | GW_GET_ALL_NODES_INFORMATION_NTF)} frame Notification frame that is used to set the properties of the Product class instance.
     */
    constructor(Connection, frame) {
        debug(`Creating Product instance for node ID: ${frame.NodeID}`);
        super();
        this.Connection = Connection;
        this.NodeID = frame.NodeID;
        this._name = frame.Name;
        this._TypeID = frame.ActuatorType;
        this._SubType = frame.ActuatorSubType;
        this._order = frame.Order;
        this._placement = frame.Placement;
        this._velocity = frame.Velocity;
        this._nodeVariation = frame.NodeVariation;
        this._PowerSaveMode = frame.PowerSaveMode;
        this._SerialNumber = frame.SerialNumber;
        this._ProductType = frame.ProductType;
        this._state = frame.OperatingState;
        this._currentPositionRaw = frame.CurrentPosition;
        this._targetPositionRaw = frame.TargetPosition;
        this._fp1CurrentPositionRaw = frame.FunctionalPosition1CurrentPosition;
        this._fp2CurrentPositionRaw = frame.FunctionalPosition2CurrentPosition;
        this._fp3CurrentPositionRaw = frame.FunctionalPosition3CurrentPosition;
        this._fp4CurrentPositionRaw = frame.FunctionalPosition4CurrentPosition;
        this._remainingTime = frame.RemainingTime;
        this._timeStamp = frame.TimeStamp;
        this._ProductAlias = frame.ActuatorAliases;
        this._limitationMinRaw = new Array(17).fill(0);
        this._limitationMaxRaw = new Array(17).fill(0xc800);
        this._limitationOriginator = new Array(17).fill(CommandOriginator.User);
        this._limitationOriginatorMin = new Array(17).fill(CommandOriginator.User);
        this._limitationOriginatorMax = new Array(17).fill(CommandOriginator.User);
        this._limitationTimeRaw = new Array(17).fill(LockTime.lockTimeTolockTimeValueForLimitation(Infinity));
        this._limitationTimeRawMin = new Array(17).fill(LockTime.lockTimeTolockTimeValueForLimitation(Infinity));
        this._limitationTimeRawMax = new Array(17).fill(LockTime.lockTimeTolockTimeValueForLimitation(Infinity));
        this._disposables.use(this.Connection.on(async (frame) => {
            debug(`Handling notification for Product NodeID: ${this.NodeID}`);
            await this.onNotificationHandler(frame);
        }, [
            GatewayCommand.GW_NODE_INFORMATION_CHANGED_NTF,
            GatewayCommand.GW_NODE_STATE_POSITION_CHANGED_NTF,
            GatewayCommand.GW_COMMAND_RUN_STATUS_NTF,
            GatewayCommand.GW_COMMAND_REMAINING_TIME_NTF,
            GatewayCommand.GW_GET_NODE_INFORMATION_NTF,
            GatewayCommand.GW_STATUS_REQUEST_NTF,
        ]));
    }
    [Symbol.dispose]() {
        debug(`Disposing Product instance for NodeID: ${this.NodeID}`);
        this._disposables.dispose();
        super[Symbol.dispose]();
    }
    /**
     * Name of the product.
     *
     * @readonly
     * @type {string}
     */
    get Name() {
        return this._name;
    }
    /**
     * Renames the product.
     *
     * @param {string} newName New name of the product.
     * @returns {Promise<void>}
     */
    async setNameAsync(newName) {
        debug(`Setting name for Product NodeID: ${this.NodeID} to "${newName}"`);
        const confirmationFrame = await this.Connection.sendFrameAsync(new GW_SET_NODE_NAME_REQ(this.NodeID, newName));
        if (confirmationFrame.Status === GW_COMMON_STATUS.SUCCESS) {
            this._name = newName;
            debug(`Name set successfully for Product NodeID: ${this.NodeID}`);
        }
        else {
            debug(`Failed to set name for Product NodeID: ${this.NodeID}`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    /**
     * String representation of the TypeID and SubType.
     *
     * @readonly
     * @type {string}
     */
    get Category() {
        switch (this.TypeID) {
            case ActuatorType.VenetianBlind:
                return "Interior venetian blind";
            case ActuatorType.RollerShutter:
                switch (this.SubType) {
                    case 1:
                        return "Adjustable slats roller shutter";
                    case 2:
                        return "Roller shutter with projection";
                    default:
                        return "Roller shutter";
                }
            case ActuatorType.Awning:
                return "Vertical exterior awning";
            case ActuatorType.WindowOpener:
                switch (this.SubType) {
                    case 1:
                        return "Window opener with integrated rain sensor";
                    default:
                        return "Window opener";
                }
            case ActuatorType.GarageOpener:
                return "Garage door opener";
            case ActuatorType.Light:
                return "Light";
            case ActuatorType.GateOpener:
                return "Gate opener";
            case ActuatorType.Lock:
                switch (this.SubType) {
                    case 1:
                        return "Window lock";
                    default:
                        return "Door lock";
                }
            case ActuatorType.Blind:
                return "Vertical interior blind";
            case ActuatorType.DualShutter:
                return "Dual roller shutter";
            case ActuatorType.OnOffSwitch:
                return "On/Off switch";
            case ActuatorType.HorizontalAwning:
                return "Horizontal awning";
            case ActuatorType.ExternalVentianBlind:
                return "Exterior venetion blind";
            case ActuatorType.LouvreBlind:
                return "Louvre blind";
            case ActuatorType.CurtainTrack:
                return "Curtain track";
            case ActuatorType.VentilationPoint:
                switch (this.SubType) {
                    case 1:
                        return "Air inlet";
                    case 2:
                        return "Air transfer";
                    case 3:
                        return "Air outlet";
                    default:
                        return "Ventilation point";
                }
            case ActuatorType.ExteriorHeating:
                return "Exterior heating";
            case ActuatorType.SwingingShutter:
                switch (this.SubType) {
                    case 1:
                        return "Swinging shutter with independent handling of the leaves";
                    default:
                        return "Swinging shutter";
                }
            default:
                return `${this.TypeID.toString()}.${this.SubType.toString()}`;
        }
    }
    /**
     * Defines the variation of a product.
     *
     * @readonly
     * @type {NodeVariation}
     */
    get NodeVariation() {
        return this._nodeVariation;
    }
    /**
     * Sets the variation of a product to a new value.
     *
     * @param {NodeVariation} newNodeVariation New value for the variation of the product.
     * @returns {Promise<void>}
     */
    async setNodeVariationAsync(newNodeVariation) {
        debug(`Setting NodeVariation for Product NodeID: ${this.NodeID} to "${newNodeVariation}"`);
        const confirmationFrame = await this.Connection.sendFrameAsync(new GW_SET_NODE_VARIATION_REQ(this.NodeID, newNodeVariation));
        if (confirmationFrame.Status === GW_COMMON_STATUS.SUCCESS) {
            this._nodeVariation = newNodeVariation;
            debug(`NodeVariation set successfully for Product NodeID: ${this.NodeID}`);
        }
        else {
            debug(`Failed to set NodeVariation for Product NodeID: ${this.NodeID}`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    /**
     * Sets the order and placement of the product.
     *
     * @param {number} newOrder The new order value of the product.
     * @param {number} newPlacement The new placement value of the product.
     * @returns {Promise<void>}
     */
    async setOrderAndPlacementAsync(newOrder, newPlacement) {
        debug(`Setting order and placement for Product NodeID: ${this.NodeID} to "${newOrder}" and "${newPlacement}"`);
        const confirmationFrame = await this.Connection.sendFrameAsync(new GW_SET_NODE_ORDER_AND_PLACEMENT_REQ(this.NodeID, newOrder, newPlacement));
        if (confirmationFrame.Status === GW_COMMON_STATUS.SUCCESS) {
            this._order = newOrder;
            this._placement = newPlacement;
            debug(`Order and placement set successfully for Product NodeID: ${this.NodeID} to "${newOrder}" and "${newPlacement}"`);
        }
        else {
            debug(`Failed to set order and placement for Product NodeID: ${this.NodeID}`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    /**
     * The order in which the products should be displayed by a client application.
     *
     * @readonly
     * @type {number}
     */
    get Order() {
        return this._order;
    }
    /**
     * Sets a new value for the order number of the product.
     *
     * @param {number} newOrder New value for the order property.
     * @returns {Promise<void>}
     */
    async setOrderAsync(newOrder) {
        return this.setOrderAndPlacementAsync(newOrder, this._placement);
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
     * Sets a new value for the placement of the product.
     *
     * @param {number} newPlacement New value for the placement property.
     * @returns {Promise<void>}
     */
    async setPlacementAsync(newPlacement) {
        return this.setOrderAndPlacementAsync(this._order, newPlacement);
    }
    /**
     * Current operating state of the product.
     *
     * @readonly
     * @type {NodeOperatingState}
     */
    get State() {
        return this._state;
    }
    /**
     * Raw value of the current position of the product.
     *
     * @readonly
     * @type {number}
     */
    get CurrentPositionRaw() {
        return this._currentPositionRaw;
    }
    /**
     * Raw value of the target value for the position of the product.
     *
     * @readonly
     * @type {number}
     */
    get TargetPositionRaw() {
        return this._targetPositionRaw;
    }
    /**
     * Raw value of the current position of the functional paramter 1.
     *
     * @readonly
     * @type {number}
     */
    get FP1CurrentPositionRaw() {
        return this._fp1CurrentPositionRaw;
    }
    /**
     * Raw value of the current position of the functional paramter 2.
     *
     * @readonly
     * @type {number}
     */
    get FP2CurrentPositionRaw() {
        return this._fp2CurrentPositionRaw;
    }
    /**
     * Raw value of the current position of the functional paramter 3.
     *
     * @readonly
     * @type {number}
     */
    get FP3CurrentPositionRaw() {
        return this._fp3CurrentPositionRaw;
    }
    /**
     * Raw value of the current position of the functional paramter 4.
     *
     * @readonly
     * @type {number}
     */
    get FP4CurrentPositionRaw() {
        return this._fp4CurrentPositionRaw;
    }
    /**
     * Remaining time in seconds to reach the desired target position.
     *
     * @readonly
     * @type {number}
     */
    get RemainingTime() {
        return this._remainingTime;
    }
    /**
     * Timestamp of the last change to any of the properties.
     *
     * @readonly
     * @type {Date}
     */
    get TimeStamp() {
        return this._timeStamp;
    }
    /**
     * The current run status of the product.
     *
     * @readonly
     * @type {RunStatus}
     */
    get RunStatus() {
        return this._runStatus;
    }
    /**
     * Additional status information, e.g. that opening a window is overruled by the rain sensor.
     *
     * @readonly
     * @type {StatusReply}
     */
    get StatusReply() {
        return this._statusReply;
    }
    /**
     * The current position of the product in percent.
     *
     * The value is derived from the raw value and depending on
     * the type ID it is inverted, so that 100% means e.g.
     * window is fully open, roller shutter is fully closed,
     * light is at full power etc.
     *
     * @readonly
     * @type {number}
     */
    get CurrentPosition() {
        return convertPositionRaw(this._currentPositionRaw, this.TypeID);
    }
    /**
     * Sets the product to a new position as raw value.
     *
     * @param {number} newPosition New position value as raw value.
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @param ParameterActive The parameter that should be returned in the notifications. MP or FP1-FP16.
     * @param FunctionalParameters Additional functional paramters can be set during the command.
     * @param PriorityLevelLock Flag if the priority level lock should be used.
     * @param PriorityLevels Up to 8 priority levels.
     * @param LockTime Lock time for the priority levels in seconds (multiple of 30 or Infinity).
     * @returns {Promise<number>}
     */
    async setTargetPositionRawAsync(newPosition, PriorityLevel = 3, CommandOriginator = 1, ParameterActive = 0, FunctionalParameters = [], PriorityLevelLock = 0, PriorityLevels = [], LockTime = Infinity) {
        debug(`Setting TargetPositionRaw for Product NodeID: ${this.NodeID} to ${newPosition}`);
        const req = new GW_COMMAND_SEND_REQ(this.NodeID, newPosition, PriorityLevel, CommandOriginator, ParameterActive, FunctionalParameters, PriorityLevelLock, PriorityLevels, LockTime);
        const confirmationFrame = await this.Connection.sendFrameAsync(req);
        if (confirmationFrame.CommandStatus === CommandStatus.CommandAccepted) {
            debug(`TargetPositionRaw set successfully for Product NodeID: ${this.NodeID}`);
            return confirmationFrame.SessionID;
        }
        else {
            debug(`Failed to set TargetPositionRaw for Product NodeID: ${this.NodeID}`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    /**
     * Sets the product to a new position in percent.
     *
     * @param {number} newPosition New position value in percent.
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @param ParameterActive The parameter that should be returned in the notifications. MP or FP1-FP16.
     * @param FunctionalParameters Additional functional paramters can be set during the command.
     * @param PriorityLevelLock Flag if the priority level lock should be used.
     * @param PriorityLevels Up to 8 priority levels.
     * @param LockTime Lock time for the priority levels in seconds (multiple of 30 or Infinity).
     * @returns {Promise<number>}
     */
    async setTargetPositionAsync(newPosition, PriorityLevel = 3, CommandOriginator = 1, ParameterActive = 0, FunctionalParameters = [], PriorityLevelLock = 0, PriorityLevels = [], LockTime = Infinity) {
        debug(`Setting TargetPosition for Product NodeID: ${this.NodeID} to ${newPosition}`);
        return await this.setTargetPositionRawAsync(convertPosition(newPosition, this.TypeID), PriorityLevel, CommandOriginator, ParameterActive, FunctionalParameters, PriorityLevelLock, PriorityLevels, LockTime);
    }
    /**
     * The target position in percent.
     *
     * @readonly
     * @type {number}
     */
    get TargetPosition() {
        return convertPositionRaw(this._targetPositionRaw, this.TypeID);
    }
    _limitationOriginator;
    /**
     * A read only array of the limitation originators.
     * @readonly
     * @type {CommandOriginator[]}
     * @deprecated Use {@link LimitationOriginatorMin} or {@link LimitationOriginatorMax} instead.
     */
    get LimitationOriginator() {
        return Array.from(this._limitationOriginator);
    }
    /**
     * Returns the limitation originator for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Paramter for which the limitation originator should be returned.
     * @returns The limitation originator.
     * @deprecated Use {@link getLimitationOriginatorMin} or {@link getLimitationOriginatorMax} instead.
     */
    getLimitationOriginator(functionalParameter) {
        return this._limitationOriginator[functionalParameter];
    }
    _limitationOriginatorMin;
    /**
     * A read only array of the limitation originators for the minimum values.
     * @readonly
     * @type {CommandOriginator[]}
     */
    get LimitationOriginatorMin() {
        return Array.from(this._limitationOriginatorMin);
    }
    /**
     * Returns the limitation originator for a functional parameter for the minimum value.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Paramter for which the limitation originator should be returned.
     * @returns The limitation originator.
     */
    getLimitationOriginatorMin(functionalParameter) {
        return this._limitationOriginatorMin[functionalParameter];
    }
    _limitationOriginatorMax;
    /**
     * A read only array of the limitation originators for the maximum values.
     * @readonly
     * @type {CommandOriginator[]}
     */
    get LimitationOriginatorMax() {
        return Array.from(this._limitationOriginatorMax);
    }
    /**
     * Returns the limitation originator for a functional parameter for the maximum value.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Paramter for which the limitation originator should be returned.
     * @returns The limitation originator.
     */
    getLimitationOriginatorMax(functionalParameter) {
        return this._limitationOriginatorMax[functionalParameter];
    }
    _limitationTimeRaw;
    /**
     * A read only array of the limitation time raw values.
     * @readonly
     * @type {number[]}
     * @deprecated Use {@link LimitationTimeRawMin} or {@link LimitationTimeRawMax} instead.
     */
    get LimitationTimeRaw() {
        return Array.from(this._limitationTimeRaw);
    }
    /**
     * Returns the raw value of the limitation time for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Parameter for which the limitation time raw value should be returned.
     * @returns The raw limitation time value.
     * @deprecated Use {@link getLimitationTimeRawMin} or {@link getLimitationTimeRawMax} instead.
     */
    getLimitationTimeRaw(functionalParameter) {
        return this._limitationTimeRaw[functionalParameter];
    }
    /**
     * Returns the limitation time in seconds for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Parameter for which the limitation time should be returned.
     * @returns The limitation time in seconds or Infinity.
     * @deprecated Use {@link getLimitationTimeMin} or {@link getLimitationTimeMax} instead.
     */
    getLimitationTime(functionalParameter) {
        return LockTime.lockTimeValueToLockTimeForLimitation(this.getLimitationTimeRaw(functionalParameter));
    }
    _limitationTimeRawMin;
    /**
     * A read only array of the limitation time raw values for the minimum value.
     * @readonly
     * @type {number[]}
     */
    get LimitationTimeRawMin() {
        return Array.from(this._limitationTimeRawMin);
    }
    /**
     * Returns the raw value of the limitation time of the minimum value for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Parameter for which the limitation time raw value should be returned.
     * @returns The raw limitation time value.
     */
    getLimitationTimeRawMin(functionalParameter) {
        return this._limitationTimeRawMin[functionalParameter];
    }
    /**
     * Returns the limitation time of the minimum value in seconds for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Parameter for which the limitation time should be returned.
     * @returns The limitation time in seconds or Infinity.
     */
    getLimitationTimeMin(functionalParameter) {
        return LockTime.lockTimeValueToLockTimeForLimitation(this.getLimitationTimeRawMin(functionalParameter));
    }
    _limitationTimeRawMax;
    /**
     * A read only array of the limitation time raw values for the maximum value.
     * @readonly
     * @type {number[]}
     */
    get LimitationTimeRawMax() {
        return Array.from(this._limitationTimeRawMax);
    }
    /**
     * Returns the raw value of the limitation time of the maximum value for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Parameter for which the limitation time raw value should be returned.
     * @returns The raw limitation time value.
     */
    getLimitationTimeRawMax(functionalParameter) {
        return this._limitationTimeRawMax[functionalParameter];
    }
    /**
     * Returns the limitation time ot the maximum value in seconds for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Parameter for which the limitation time should be returned.
     * @returns The limitation time in seconds or Infinity.
     */
    getLimitationTimeMax(functionalParameter) {
        return LockTime.lockTimeValueToLockTimeForLimitation(this.getLimitationTimeRawMax(functionalParameter));
    }
    _limitationMinRaw;
    /**
     * A read only array of the raw limitations' min values.
     *
     * @readonly
     * @type {number[]}
     */
    get LimitationMinRaw() {
        return Array.from(this._limitationMinRaw);
    }
    /**
     * The minimum value (raw) of a limitation of the product.
     *
     * @readonly
     * @param functionalParameter Parameter for which the limitation should be returned.
     * @type {number}
     */
    getLimitationMinRaw(functionalParameter) {
        return this._limitationMinRaw[functionalParameter];
    }
    _limitationMaxRaw;
    /**
     * A read only array of the raw limitations' max values.
     *
     * @readonly
     * @type {number[]}
     */
    get LimitationMaxRaw() {
        return Array.from(this._limitationMaxRaw);
    }
    /**
     * The maximum value (raw) of a limitation of the product.
     *
     * @readonly
     * @param functionalParameter Parameter for which the limitation should be returned.
     * @type {number}
     */
    getLimitationMaxRaw(functionalParameter) {
        return this._limitationMaxRaw[functionalParameter];
    }
    /**
     * Returns a tuple of min and max values for the limitation of the provided parameter.
     *
     * @param functionalParameter Parameter for which the limitations should be returned.
     * @returns A tuple of the min and max values as percentage in the range [0, 1].
     * 			The first value of the tuple corresponds always to the min raw value
     * 			and the second value corresponds always to the max raw value.
     */
    getLimitations(functionalParameter) {
        const limitationMin = convertPositionRaw(this.getLimitationMinRaw(functionalParameter), this.TypeID);
        const limitationMax = convertPositionRaw(this.getLimitationMaxRaw(functionalParameter), this.TypeID);
        return [limitationMin, limitationMax];
    }
    /**
     * The minimum value of a limitation of the product.
     *
     * @readonly
     * @param functionalParameter Parameter for which the limitation should be returned.
     * @type {number}
     */
    getLimitationMin(functionalParameter) {
        return this.getLimitations(functionalParameter)[0];
    }
    /**
     * The maximum value of a limitation of the product.
     *
     * @readonly
     * @param functionalParameter Parameter for which the limitation should be returned.
     * @type {number}
     */
    getLimitationMax(functionalParameter) {
        return this.getLimitations(functionalParameter)[1];
    }
    /**
     * Stops the product at the current position.
     *
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @param ParameterActive The parameter that should be returned in the notifications. MP or FP1-FP16.
     * @param FunctionalParameters Additional functional paramters can be set during the command.
     * @param PriorityLevelLock Flag if the priority level lock should be used.
     * @param PriorityLevels Up to 8 priority levels.
     * @param LockTime Lock time for the priority levels in seconds (multiple of 30 or Infinity).
     * @returns {Promise<number>}
     */
    async stopAsync(PriorityLevel = 3, CommandOriginator = 1, ParameterActive = 0, FunctionalParameters = [], PriorityLevelLock = 0, PriorityLevels = [], LockTime = Infinity) {
        debug(`Calling Stop for Product NodeID: ${this.NodeID}`);
        const confirmationFrame = await this.Connection.sendFrameAsync(new GW_COMMAND_SEND_REQ(this.NodeID, 0xd200, PriorityLevel, CommandOriginator, ParameterActive, FunctionalParameters, PriorityLevelLock, PriorityLevels, LockTime));
        if (confirmationFrame.CommandStatus === CommandStatus.CommandAccepted) {
            debug(`Stopped successfully for Product NodeID: ${this.NodeID}`);
            return confirmationFrame.SessionID;
        }
        else {
            debug(`Failed to stop for Product NodeID: ${this.NodeID}`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    /**
     * Let the product "wink". Its main intention is to identify a product.
     *
     * Winking depends on the product, e.g. a window moves the handle
     * a little bit.
     *
     * @param EnableWink If false wink will be stopped.
     * @param WinkTime Wink time in seconds (up to 253) or 254 for manufactor defined or 255 for infinite time.
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @returns {Promise<number>}
     */
    async winkAsync(EnableWink = true, WinkTime = 254, PriorityLevel = 3, CommandOriginator = 1) {
        debug(`Calling Wink for Product NodeID: ${this.NodeID}`);
        const confirmationFrame = await this.Connection.sendFrameAsync(new GW_WINK_SEND_REQ(this.NodeID, EnableWink, WinkTime, PriorityLevel, CommandOriginator));
        if (confirmationFrame.Status === GW_INVERSE_STATUS.SUCCESS) {
            debug(`Called Wink successfully for Product NodeID: ${this.NodeID}`);
            return confirmationFrame.SessionID;
        }
        else {
            debug(`Failed to call Wink for Product NodeID: ${this.NodeID}`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    /**
     * Refresh the data of this product and read the attributes from the gateway.
     *
     * This method re-reads the data from the KLF-200. If the product hasn't sent
     * its recent data to the KLF-200, call {@link Products.requestStatusAsync} first.
     *
     * @returns {Promise<void>}
     */
    async refreshAsync() {
        debug(`Refreshing Product NodeID: ${this.NodeID}`);
        const confirmationFrame = await this.Connection.sendFrameAsync(new GW_GET_NODE_INFORMATION_REQ(this.NodeID));
        if (confirmationFrame.Status === GW_COMMON_STATUS.SUCCESS) {
            debug(`Product NodeID: ${this.NodeID} refreshed successfully`);
        }
        else {
            debug(`Failed to refresh Product NodeID: ${this.NodeID}`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    setupWaitForLimitationFinished(sessionID, limitationType, parameterActive, resolve, reject) {
        debug(`Calling setupWaitForLimitationFinished for Product NodeID: ${this.NodeID} for session ID: ${sessionID} and limitation type(s): ${JSON.stringify(limitationType)}`);
        const limitationTypes = [];
        if (Array.isArray(limitationType)) {
            limitationTypes.push(...limitationType);
        }
        else {
            limitationTypes.push(limitationType);
        }
        // Listen to notifications:
        const dispose = this.Connection.on(async (frame) => {
            try {
                debug(`Calling handler for GW_LIMITATION_STATUS_NTF, GW_SESSION_FINISHED_NTF in Product.setupWaitForLimitationFinished for Product NodeID: ${this.NodeID} with frame: ${JSON.stringify(frame)}.`);
                if (frame instanceof GW_LIMITATION_STATUS_NTF && frame.SessionID === sessionID) {
                    if (frame.NodeID !== this.NodeID) {
                        throw new Error(`Unexpected node ID: ${frame.NodeID}`);
                    }
                    if (frame.ParameterID !== parameterActive) {
                        throw new Error(`Unexpected parameter ID: ${frame.ParameterID}`);
                    }
                    if (limitationTypes.indexOf(LimitationType.MinimumLimitation) !== -1) {
                        if (frame.LimitationValueMin !== this._limitationMinRaw[frame.ParameterID]) {
                            this._limitationMinRaw[frame.ParameterID] = frame.LimitationValueMin;
                            await this.propertyChanged("LimitationMinRaw");
                        }
                        if (frame.LimitationOriginator !== this._limitationOriginatorMin[frame.ParameterID]) {
                            this._limitationOriginatorMin[frame.ParameterID] = frame.LimitationOriginator;
                            await this.propertyChanged("LimitationOriginatorMin");
                        }
                        if (frame.LimitationTime !== this._limitationTimeRawMin[frame.ParameterID]) {
                            this._limitationTimeRawMin[frame.ParameterID] = frame.LimitationTime;
                            await this.propertyChanged("LimitationTimeRawMin");
                        }
                    }
                    if (limitationTypes.indexOf(LimitationType.MaximumLimitation) !== -1) {
                        if (frame.LimitationValueMax !== this._limitationMaxRaw[frame.ParameterID]) {
                            this._limitationMaxRaw[frame.ParameterID] = frame.LimitationValueMax;
                            await this.propertyChanged("LimitationMaxRaw");
                        }
                        if (frame.LimitationOriginator !== this._limitationOriginatorMax[frame.ParameterID]) {
                            this._limitationOriginatorMax[frame.ParameterID] = frame.LimitationOriginator;
                            await this.propertyChanged("LimitationOriginatorMax");
                        }
                        if (frame.LimitationTime !== this._limitationTimeRawMax[frame.ParameterID]) {
                            this._limitationTimeRawMax[frame.ParameterID] = frame.LimitationTime;
                            await this.propertyChanged("LimitationTimeRawMax");
                        }
                    }
                    if (frame.LimitationOriginator !== this._limitationOriginator[frame.ParameterID]) {
                        this._limitationOriginator[frame.ParameterID] = frame.LimitationOriginator;
                        await this.propertyChanged("LimitationOriginator");
                    }
                    if (frame.LimitationTime !== this._limitationTimeRaw[frame.ParameterID]) {
                        this._limitationTimeRaw[frame.ParameterID] = frame.LimitationTime;
                        await this.propertyChanged("LimitationTimeRaw");
                    }
                }
                else if (frame instanceof GW_SESSION_FINISHED_NTF && frame.SessionID === sessionID) {
                    dispose[Symbol.dispose]();
                    resolve();
                }
            }
            catch (error) {
                dispose[Symbol.dispose]();
                reject(error);
            }
        }, [GatewayCommand.GW_LIMITATION_STATUS_NTF, GatewayCommand.GW_SESSION_FINISHED_NTF]);
        return dispose;
    }
    /**
     * Refreshes the limitation data for the provided limitation type of a parameter.
     *
     * @param limitationType The limitation type for which the data should be refreshed.
     * @param parameterActive Parameter for which the limitation should be refreshed.
     * @returns Promise<void>
     */
    async refreshLimitationAsync(limitationType, parameterActive = ParameterActive.MP) {
        const env_1 = { stack: [], error: void 0, hasError: false };
        try {
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            debug(`Calling refreshLimitationAsync for Product NodeID: ${this.NodeID} for limitation type: ${limitationType}.`);
            let resolve, reject;
            const waitForLimitationFinishedPromise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            const stack = __addDisposableResource(env_1, new DisposableStack(), false);
            const frameToSend = new GW_GET_LIMITATION_STATUS_REQ(this.NodeID, limitationType, parameterActive);
            stack.use(this.setupWaitForLimitationFinished(frameToSend.SessionID, limitationType, parameterActive, resolve, reject));
            const waitForSessionFinishedNtfPromise = new Promise((res, rej) => {
                try {
                    stack.use(this.Connection.on((frame) => {
                        debug(`Calling handler for GW_SESSION_FINISHED_NTF in refreshLimitationAsync for Product NodeID: ${this.NodeID} with frame ${JSON.stringify(frame)}.`);
                        if (frame instanceof GW_SESSION_FINISHED_NTF && frame.SessionID === frameToSend.SessionID) {
                            debug(`GW_SESSION_FINISHED_NTF received for Product NodeID: ${this.NodeID} and session ID: ${frame.SessionID}.`);
                            res();
                        }
                    }, [GatewayCommand.GW_SESSION_FINISHED_NTF]));
                }
                catch (error) {
                    debug(`Error in setupWaitForSessionFinishedNtfPromise in refreshLimitationAsync for Product NodeID: ${this.NodeID}.`);
                    rej(error);
                }
            });
            const confirmationFrame = await this.Connection.sendFrameAsync(frameToSend);
            if (confirmationFrame.Status === GW_INVERSE_STATUS.SUCCESS) {
                try {
                    await waitForLimitationFinishedPromise;
                }
                finally {
                    // Wait for the session to be finished
                    await waitForSessionFinishedNtfPromise;
                }
            }
            else {
                debug(`Error in refreshLimitationAsync for Product NodeID: ${this.NodeID}.`);
                return Promise.reject(new Error(confirmationFrame.getError()));
            }
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
     * Sets a new limitation with raw values.
     *
     * @param minValue Raw min value of the limitation.
     * @param maxValue Raw max value of the limitation.
     * @param parameterActive Parameter for which the limitation should be set.
     * @param limitationTime Limitation time.
     * @param commandOriginator Command Originator.
     * @param priorityLevel Priority Level.
     * @returns Promise<void>
     */
    async setLimitationRawAsync(minValue, maxValue, parameterActive = ParameterActive.MP, limitationTime = 253, // Unlimited time
    commandOriginator = CommandOriginator.SAAC, priorityLevel = PriorityLevel.ComfortLevel2) {
        debug(`Setting LimitationRaw for Product NodeID: ${this.NodeID} to min: ${minValue}, max: ${maxValue}.`);
        // Setup the event handlers first to prevent a race condition
        // where we don't see the events.
        let resolve, reject;
        const waitForLimitationFinishedPromise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        const frameToSend = new GW_SET_LIMITATION_REQ(this.NodeID, minValue, maxValue, limitationTime, priorityLevel, commandOriginator, parameterActive);
        this.setupWaitForLimitationFinished(frameToSend.SessionID, [LimitationType.MinimumLimitation, LimitationType.MaximumLimitation], parameterActive, resolve, reject);
        const confirmationFrame = await this.Connection.sendFrameAsync(frameToSend);
        if (confirmationFrame.Status === GW_INVERSE_STATUS.SUCCESS) {
            await waitForLimitationFinishedPromise;
            debug(`LimitationRaw set successfully for Product NodeID: ${this.NodeID}.`);
        }
        else {
            debug(`Failed to setLimitationRaw for Product NodeID: ${this.NodeID}.`);
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
    /**
     * Sets a new limitation.
     *
     * @param minValue Min value of the limitation in the range [0, 1].
     * @param maxValue Max value of the limitation in the range [0, 1].
     * @param parameterActive Parameter for which the limitation should be set.
     * @param limitationTime Limitation time in seconds. Must be a multiple of 30.
     * @param commandOriginator Command Originator.
     * @param priorityLevel Priority Level.
     * @returns Promise<void>
     */
    async setLimitationAsync(minValue, maxValue, parameterActive = ParameterActive.MP, limitationTime = Infinity, // Unlimited time
    commandOriginator = CommandOriginator.SAAC, priorityLevel = PriorityLevel.ComfortLevel2) {
        debug(`Setting Limitation for Product NodeID: ${this.NodeID} to min: ${minValue}, max: ${maxValue}.`);
        if (minValue > maxValue) {
            throw new Error(`Parameter minValue (${minValue}) must be less than or equal to parameter maxValue (${maxValue}).`);
        }
        if (minValue < 0 || minValue > 1) {
            throw new Error("Parameter minValue must be between 0 and 1.");
        }
        if (maxValue < 0 || maxValue > 1) {
            throw new Error("Parameter maxValue must be between 0 and 1.");
        }
        let rawMinValue = convertPosition(minValue, this.TypeID);
        let rawMaxValue = convertPosition(maxValue, this.TypeID);
        const rawLimitationTime = LockTime.lockTimeTolockTimeValueForLimitation(limitationTime);
        if (rawMinValue > rawMaxValue) {
            // Based on the actuator type the min/max values have to be swapped
            [rawMinValue, rawMaxValue] = [rawMaxValue, rawMinValue];
        }
        return this.setLimitationRawAsync(rawMinValue, rawMaxValue, parameterActive, rawLimitationTime, commandOriginator, priorityLevel);
    }
    /**
     * Clears the limitation for the parameter.
     *
     * @param parameterActive Parameter for which the limitation should be set.
     * @param commandOriginator Command Originator.
     * @param priorityLevel Priority Level.
     * @returns Promise<void>
     */
    async clearLimitationAsync(parameterActive = ParameterActive.MP, commandOriginator = CommandOriginator.SAAC, priorityLevel = PriorityLevel.ComfortLevel2) {
        debug(`Clearing Limitation for Product NodeID: ${this.NodeID}.`);
        return this.setLimitationRawAsync(0xd400, 0xd400, parameterActive, 255, commandOriginator, priorityLevel);
    }
    async onNotificationHandler(frame) {
        debug(`Received notification for Product NodeID: ${this.NodeID} frame: ${JSON.stringify(frame)}.`);
        if (typeof this === "undefined")
            return;
        if (frame instanceof GW_NODE_INFORMATION_CHANGED_NTF) {
            await this.onNodeInformationChanged(frame);
        }
        else if (frame instanceof GW_NODE_STATE_POSITION_CHANGED_NTF) {
            await this.onNodeStatePositionChanged(frame);
        }
        else if (frame instanceof GW_COMMAND_RUN_STATUS_NTF) {
            await this.onRunStatus(frame);
        }
        else if (frame instanceof GW_COMMAND_REMAINING_TIME_NTF) {
            await this.onRemainingTime(frame);
        }
        else if (frame instanceof GW_GET_NODE_INFORMATION_NTF) {
            await this.onGetNodeInformation(frame);
        }
        else if (frame instanceof GW_STATUS_REQUEST_NTF) {
            await this.onStatusRequest(frame);
        }
    }
    async onNodeInformationChanged(frame) {
        debug(`Received node information changed for Product NodeID: ${this.NodeID} frame: ${JSON.stringify(frame)}.`);
        if (frame.NodeID === this.NodeID) {
            if (frame.Name !== this._name) {
                this._name = frame.Name;
                await this.propertyChanged("Name");
            }
            if (frame.NodeVariation !== this._nodeVariation) {
                this._nodeVariation = frame.NodeVariation;
                await this.propertyChanged("NodeVariation");
            }
            if (frame.Order !== this._order) {
                this._order = frame.Order;
                await this.propertyChanged("Order");
            }
            if (frame.Placement !== this._placement) {
                this._placement = frame.Placement;
                await this.propertyChanged("Placement");
            }
        }
    }
    async onNodeStatePositionChanged(frame) {
        debug(`Received node state position changed for Product NodeID: ${this.NodeID} frame: ${JSON.stringify(frame)}.`);
        if (frame.NodeID === this.NodeID) {
            if (frame.OperatingState !== this._state) {
                this._state = frame.OperatingState;
                await this.propertyChanged("State");
            }
            if (frame.CurrentPosition !== this._currentPositionRaw) {
                this._currentPositionRaw = frame.CurrentPosition;
                await this.propertyChanged("CurrentPositionRaw");
                await this.propertyChanged("CurrentPosition");
            }
            if (frame.TargetPosition !== this._targetPositionRaw) {
                this._targetPositionRaw = frame.TargetPosition;
                await this.propertyChanged("TargetPositionRaw");
                await this.propertyChanged("TargetPosition");
            }
            if (frame.FunctionalPosition1CurrentPosition !== this._fp1CurrentPositionRaw) {
                this._fp1CurrentPositionRaw = frame.FunctionalPosition1CurrentPosition;
                await this.propertyChanged("FP1CurrentPositionRaw");
            }
            if (frame.FunctionalPosition2CurrentPosition !== this._fp2CurrentPositionRaw) {
                this._fp2CurrentPositionRaw = frame.FunctionalPosition2CurrentPosition;
                await this.propertyChanged("FP2CurrentPositionRaw");
            }
            if (frame.FunctionalPosition3CurrentPosition !== this._fp3CurrentPositionRaw) {
                this._fp3CurrentPositionRaw = frame.FunctionalPosition3CurrentPosition;
                await this.propertyChanged("FP3CurrentPositionRaw");
            }
            if (frame.FunctionalPosition4CurrentPosition !== this._fp4CurrentPositionRaw) {
                this._fp4CurrentPositionRaw = frame.FunctionalPosition4CurrentPosition;
                await this.propertyChanged("FP4CurrentPositionRaw");
            }
            if (frame.RemainingTime !== this._remainingTime) {
                this._remainingTime = frame.RemainingTime;
                await this.propertyChanged("RemainingTime");
            }
            // if (frame.TimeStamp.valueOf() !== this._timeStamp.valueOf()) {
            //     this._timeStamp = frame.TimeStamp;
            //     await this.propertyChanged("TimeStamp");
            // }
        }
    }
    async onRunStatus(frame) {
        debug(`Received run status for Product NodeID: ${this.NodeID} frame: ${JSON.stringify(frame)}.`);
        if (frame.NodeID === this.NodeID) {
            switch (frame.NodeParameter) {
                case ParameterActive.MP:
                    if (frame.ParameterValue !== this._currentPositionRaw) {
                        this._currentPositionRaw = frame.ParameterValue;
                        await this.propertyChanged("CurrentPositionRaw");
                        await this.propertyChanged("CurrentPosition");
                    }
                    break;
                case ParameterActive.FP1:
                    if (frame.ParameterValue !== this._fp1CurrentPositionRaw) {
                        this._fp1CurrentPositionRaw = frame.ParameterValue;
                        await this.propertyChanged("FP1CurrentPositionRaw");
                    }
                    break;
                case ParameterActive.FP2:
                    if (frame.ParameterValue !== this._fp2CurrentPositionRaw) {
                        this._fp2CurrentPositionRaw = frame.ParameterValue;
                        await this.propertyChanged("FP2CurrentPositionRaw");
                    }
                    break;
                case ParameterActive.FP3:
                    if (frame.ParameterValue !== this._fp3CurrentPositionRaw) {
                        this._fp3CurrentPositionRaw = frame.ParameterValue;
                        await this.propertyChanged("FP3CurrentPositionRaw");
                    }
                    break;
                case ParameterActive.FP4:
                    if (frame.ParameterValue !== this._fp4CurrentPositionRaw) {
                        this._fp4CurrentPositionRaw = frame.ParameterValue;
                        await this.propertyChanged("FP4CurrentPositionRaw");
                    }
                    break;
                default:
                    break;
            }
            if (frame.RunStatus !== this._runStatus) {
                this._runStatus = frame.RunStatus;
                await this.propertyChanged("RunStatus");
            }
            if (frame.StatusReply !== this._statusReply) {
                this._statusReply = frame.StatusReply;
                await this.propertyChanged("StatusReply");
            }
        }
    }
    async onRemainingTime(frame) {
        debug(`Received remaining time for Product NodeID: ${this.NodeID} frame: ${JSON.stringify(frame)}.`);
        if (frame.NodeID === this.NodeID &&
            frame.NodeParameter === ParameterActive.MP &&
            frame.RemainingTime !== this._remainingTime) {
            this._remainingTime = frame.RemainingTime;
            await this.propertyChanged("RemainingTime");
        }
    }
    async onGetNodeInformation(frame) {
        debug(`Received node information for Product NodeID: ${this.NodeID} frame: ${JSON.stringify(frame)}.`);
        if (frame.NodeID === this.NodeID) {
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
            if (frame.ActuatorType !== this._TypeID) {
                this._TypeID = frame.ActuatorType;
                await this.propertyChanged("TypeID");
            }
            if (frame.ActuatorSubType !== this._SubType) {
                this._SubType = frame.ActuatorSubType;
                await this.propertyChanged("SubType");
            }
            if (frame.ProductType !== this._ProductType) {
                this._ProductType = frame.ProductType;
                await this.propertyChanged("ProductType");
            }
            if (frame.NodeVariation !== this._nodeVariation) {
                this._nodeVariation = frame.NodeVariation;
                await this.propertyChanged("NodeVariation");
            }
            if (frame.PowerSaveMode !== this._PowerSaveMode) {
                this._PowerSaveMode = frame.PowerSaveMode;
                await this.propertyChanged("PowerSaveMode");
            }
            if (!frame.SerialNumber.equals(this._SerialNumber)) {
                this._SerialNumber = frame.SerialNumber;
                await this.propertyChanged("SerialNumber");
            }
            if (frame.OperatingState !== this._state) {
                this._state = frame.OperatingState;
                await this.propertyChanged("State");
            }
            if (frame.CurrentPosition !== this._currentPositionRaw) {
                this._currentPositionRaw = frame.CurrentPosition;
                await this.propertyChanged("CurrentPositionRaw");
                await this.propertyChanged("CurrentPosition");
            }
            if (frame.TargetPosition !== this._targetPositionRaw) {
                this._targetPositionRaw = frame.TargetPosition;
                await this.propertyChanged("TargetPositionRaw");
                await this.propertyChanged("TargetPosition");
            }
            if (frame.FunctionalPosition1CurrentPosition !== this._fp1CurrentPositionRaw) {
                this._fp1CurrentPositionRaw = frame.FunctionalPosition1CurrentPosition;
                await this.propertyChanged("FP1CurrentPositionRaw");
            }
            if (frame.FunctionalPosition2CurrentPosition !== this._fp2CurrentPositionRaw) {
                this._fp2CurrentPositionRaw = frame.FunctionalPosition2CurrentPosition;
                await this.propertyChanged("FP2CurrentPositionRaw");
            }
            if (frame.FunctionalPosition3CurrentPosition !== this._fp3CurrentPositionRaw) {
                this._fp3CurrentPositionRaw = frame.FunctionalPosition3CurrentPosition;
                await this.propertyChanged("FP3CurrentPositionRaw");
            }
            if (frame.FunctionalPosition4CurrentPosition !== this._fp4CurrentPositionRaw) {
                this._fp4CurrentPositionRaw = frame.FunctionalPosition4CurrentPosition;
                await this.propertyChanged("FP4CurrentPositionRaw");
            }
            if (frame.RemainingTime !== this._remainingTime) {
                this._remainingTime = frame.RemainingTime;
                await this.propertyChanged("RemainingTime");
            }
            if (frame.TimeStamp.valueOf() !== this._timeStamp.valueOf()) {
                this._timeStamp = frame.TimeStamp;
                await this.propertyChanged("TimeStamp");
            }
            if (
            // If length differ, then they can't be equal anymore
            this._ProductAlias.length !== frame.ActuatorAliases.length ||
                // Check if some current elements are missing in new frame elements
                this._ProductAlias.some((v1) => !frame.ActuatorAliases.some((v2) => v1.AliasType === v2.AliasType && v1.AliasValue === v2.AliasValue)) ||
                // Check if some new frame elements are missing in current elements
                frame.ActuatorAliases.some((v1) => !this._ProductAlias.some((v2) => v1.AliasType === v2.AliasType && v1.AliasValue === v2.AliasValue))) {
                this._ProductAlias = frame.ActuatorAliases;
                await this.propertyChanged("ProductAlias");
            }
        }
    }
    async onStatusRequest(frame) {
        debug(`Received status request for Product NodeID: ${this.NodeID} frame: ${JSON.stringify(frame)}.`);
        if (frame.NodeID === this.NodeID) {
            if (this._runStatus !== frame.RunStatus) {
                this._runStatus = frame.RunStatus;
                await this.propertyChanged("RunStatus");
            }
            if (this._statusReply !== frame.StatusReply) {
                this._statusReply = frame.StatusReply;
                await this.propertyChanged("StatusReply");
            }
            switch (frame.StatusType) {
                case StatusType.RequestMainInfo:
                    if (this._targetPositionRaw !== frame.TargetPosition) {
                        this._targetPositionRaw = frame.TargetPosition;
                        await this.propertyChanged("TargetPositionRaw");
                        await this.propertyChanged("TargetPosition");
                    }
                    if (this._currentPositionRaw !== frame.CurrentPosition) {
                        this._currentPositionRaw = frame.CurrentPosition;
                        await this.propertyChanged("CurrentPositionRaw");
                        await this.propertyChanged("CurrentPosition");
                    }
                    if (this._remainingTime !== frame.RemainingTime) {
                        this._remainingTime = frame.RemainingTime;
                        await this.propertyChanged("RemainingTime");
                    }
                    break;
                case StatusType.RequestTargetPosition:
                    for (const paramData of frame.ParameterData || []) {
                        if (paramData.ID === 0) {
                            if (this._targetPositionRaw !== paramData.Value) {
                                this._targetPositionRaw = paramData.Value;
                                await this.propertyChanged("TargetPositionRaw");
                                await this.propertyChanged("TargetPosition");
                            }
                        }
                    }
                    break;
                case StatusType.RequestCurrentPosition:
                    for (const paramData of frame.ParameterData || []) {
                        switch (paramData.ID) {
                            case 0:
                                if (this._currentPositionRaw !== paramData.Value) {
                                    this._currentPositionRaw = paramData.Value;
                                    await this.propertyChanged("CurrentPositionRaw");
                                    await this.propertyChanged("CurrentPosition");
                                }
                                break;
                            case 1:
                                if (this._fp1CurrentPositionRaw !== paramData.Value) {
                                    this._fp1CurrentPositionRaw = paramData.Value;
                                    await this.propertyChanged("FP1CurrentPositionRaw");
                                }
                                break;
                            case 2:
                                if (this._fp2CurrentPositionRaw !== paramData.Value) {
                                    this._fp2CurrentPositionRaw = paramData.Value;
                                    await this.propertyChanged("FP2CurrentPositionRaw");
                                }
                                break;
                            case 3:
                                if (this._fp3CurrentPositionRaw !== paramData.Value) {
                                    this._fp3CurrentPositionRaw = paramData.Value;
                                    await this.propertyChanged("FP3CurrentPositionRaw");
                                }
                                break;
                            case 4:
                                if (this._fp4CurrentPositionRaw !== paramData.Value) {
                                    this._fp4CurrentPositionRaw = paramData.Value;
                                    await this.propertyChanged("FP4CurrentPositionRaw");
                                }
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                case StatusType.RequestRemainingTime:
                    for (const paramData of frame.ParameterData || []) {
                        if (paramData.ID === 0) {
                            if (this._remainingTime !== paramData.Value) {
                                this._remainingTime = paramData.Value;
                                await this.propertyChanged("RemainingTime");
                            }
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }
}
/**
 * Use the products object to retrieve a list of products known to your KLF interface.
 * Products are e.g. windows, roller shutters, awnings.
 *
 * To create an instance of the Products class use the
 * static method {@link Products.createProductsAsync}.
 *
 * @class Products
 */
export class Products {
    Connection;
    _onNewProduct = new TypedEvent();
    _onRemovedProduct = new TypedEvent();
    /**
     * Contains a list of products.
     * The index of each product corresponds to the
     * system table index. The range is [0-199].
     *
     * @type {Product[]}
     */
    Products = [];
    _disposables = new DisposableStack();
    /**
     *Creates an instance of Products.
     * @param {IConnection} Connection The connection object that handles the communication to the KLF interface.
     */
    constructor(Connection) {
        this.Connection = Connection;
    }
    [Symbol.dispose]() {
        debug(`Disposing Products`);
        this._disposables.dispose();
        this._onNewProduct.removeAllListeners();
        this._onRemovedProduct.removeAllListeners();
        this.Products.forEach((product) => product[Symbol.dispose]());
        this.Products.length = 0;
        debug(`Products disposed`);
    }
    async initializeProductsAsync() {
        const env_2 = { stack: [], error: void 0, hasError: false };
        try {
            debug(`Initializing Products`);
            // Setup notification to receive notification with actuator type
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            let resolve, reject;
            const onNotificationHandler = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const dispose = __addDisposableResource(env_2, this.Connection.on((frame) => {
                try {
                    debug(`Calling handler for GW_GET_ALL_NODES_INFORMATION_NTF, GW_GET_ALL_NODES_INFORMATION_FINISHED_NTF in Products.initializeProductsAsync with frame ${JSON.stringify(frame)}.`);
                    if (frame instanceof GW_GET_ALL_NODES_INFORMATION_NTF) {
                        const newProduct = new Product(this.Connection, frame);
                        this.Products[frame.NodeID] = newProduct;
                    }
                    else if (frame instanceof GW_GET_ALL_NODES_INFORMATION_FINISHED_NTF) {
                        this._disposables.use(this.Connection.on(async (frame) => {
                            debug(`Calling handler for GW_CS_SYTEM_TABLE_UPDATE_NTF in Products.initializeProductsAsync with frame ${JSON.stringify(frame)}.`);
                            await this.onNotificationHandler(frame);
                        }, [GatewayCommand.GW_CS_SYSTEM_TABLE_UPDATE_NTF]));
                        resolve();
                    }
                }
                catch (error) {
                    debug(`Error in onNotificationHandler in Products.initializeProductsAsync`);
                    reject(error);
                }
            }, [GatewayCommand.GW_GET_ALL_NODES_INFORMATION_NTF, GatewayCommand.GW_GET_ALL_NODES_INFORMATION_FINISHED_NTF]), false);
            const getAllNodesInformation = await this.Connection.sendFrameAsync(new GW_GET_ALL_NODES_INFORMATION_REQ());
            if (getAllNodesInformation.Status !== GW_COMMON_STATUS.SUCCESS) {
                if (getAllNodesInformation.Status !== GW_COMMON_STATUS.ERROR /* No nodes available -> not a real error */) {
                    return Promise.reject(new Error(getAllNodesInformation.getError()));
                }
            }
            // Wait for nodes information notifications, but only, if there are nodes
            if (getAllNodesInformation.NumberOfNode > 0) {
                await onNotificationHandler;
                // After reading all the products we would read the limitations once:
                for (const product of this.Products) {
                    if (product) {
                        // Read the limitations for at least the main parameter (MP)
                        await product.refreshLimitationAsync(LimitationType.MinimumLimitation);
                        await product.refreshLimitationAsync(LimitationType.MaximumLimitation);
                    }
                }
            }
            debug(`Products initialized successfully`);
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
     * Adds a handler that will be called if a new product is added to the KLF-200 interface.
     *
     * @param {Listener<number>} handler Event handler that is called if a new product is added.
     * @returns {Disposable} The event handler can be removed by using the dispose method of the returned object.
     */
    onNewProduct(handler) {
        debug("Adding handler for onNewProduct.");
        return this._onNewProduct.on(handler);
    }
    /**
     * Adds a handler that will be called if a product is removed from the KLF-200 interface.
     *
     * @param {Listener<number>} handler Event handler that is called if a product is removed.
     * @returns {Disposable} The event handler can be removed by using the dispose method of the returned object.
     */
    onRemovedProduct(handler) {
        debug("Adding handler for onRemovedProduct.");
        return this._onRemovedProduct.on(handler);
    }
    async notifyNewProduct(nodeId) {
        debug(`Notifying new product ${nodeId}`);
        await this._onNewProduct.emit(nodeId);
    }
    async notifyRemovedProduct(nodeId) {
        debug(`Notifying removed product ${nodeId}`);
        await this._onRemovedProduct.emit(nodeId);
    }
    async onNotificationHandler(frame) {
        debug(`Notification received in Products with frame ${JSON.stringify(frame)}.`);
        if (frame instanceof GW_CS_SYSTEM_TABLE_UPDATE_NTF) {
            // Remove nodes
            debug(`Removing ${frame.RemovedNodes.length} nodes`);
            for (const nodeID of frame.RemovedNodes) {
                if (this.Products[nodeID]) {
                    this.Products[nodeID][Symbol.dispose]();
                }
                delete this.Products[nodeID];
                await this.notifyRemovedProduct(nodeID);
            }
            // Add nodes
            debug(`Adding ${frame.AddedNodes.length} nodes`);
            if (frame.AddedNodes.length > 0) {
                // Wait until the KLF-200 leaves configuration services handler.
                // Otherwise, we would receive a Busy error.
                const maxRetryTimestamp = Date.now() + 60_000; // Wait max. 60 seconds.
                const checkForIdle = async () => {
                    // Check if the KLF-200 is in Idle state
                    debug("Checking if the KLF-200 is in Idle state");
                    if (Date.now() > maxRetryTimestamp) {
                        throw new Error("Can't read node information of added node after 60 seconds.");
                    }
                    try {
                        const getStateCfm = await this.Connection.sendFrameAsync(new GW_GET_STATE_REQ());
                        return (getStateCfm.GatewayState === GatewayState.GatewayMode_WithActuatorNodes &&
                            getStateCfm.GatewaySubState === GatewaySubState.Idle);
                    }
                    catch (error) {
                        if (error instanceof Error &&
                            error.cause instanceof GW_ERROR_NTF &&
                            error.cause.ErrorNumber === GW_ERROR.Busy) {
                            debug("KLF-200 is not in Idle state yet");
                            return false;
                        }
                        debug(`Error checking if the KLF-200 is in Idle state: ${error}`);
                        throw error;
                    }
                };
                // Checking for Idle state and adding nodes will be done outside of this handler
                const waitForIdle = async () => {
                    if (!(await checkForIdle())) {
                        await setImmediate(await waitForIdle());
                    }
                };
                debug("Waiting for the KLF-200 to leave configuration services handler");
                await setImmediate(await waitForIdle());
                debug("Done waiting for the KLF-200 to leave configuration services handler");
                for (const nodeID of frame.AddedNodes) {
                    this.Products[nodeID] = await this.addNodeAsync(nodeID);
                    await this.notifyNewProduct(nodeID);
                }
            }
        }
    }
    async addNodeAsync(nodeID) {
        const env_3 = { stack: [], error: void 0, hasError: false };
        try {
            debug(`Adding node ${nodeID} to Products`);
            // Setup notification to receive notification with actuator type
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            let resolve, reject;
            const notificationHandler = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const dispose = __addDisposableResource(env_3, this.Connection.on((frame) => {
                try {
                    debug(`Calling handler for GW_GET_NODE_INFORMATION_NTF in Products.addNodeAsync with frame ${JSON.stringify(frame)}.`);
                    resolve(new Product(this.Connection, frame));
                }
                catch (error) {
                    reject(error);
                }
            }, [GatewayCommand.GW_GET_NODE_INFORMATION_NTF]), false);
            const maxRetryTimestamp = Date.now() + 60_000; // Wait max. 60 seconds.
            const retryIfNotBusy = async () => {
                if (Date.now() > maxRetryTimestamp) {
                    throw new Error("Can't read node information of added node after 60 seconds.");
                }
                try {
                    const getNodeInformation = await this.Connection.sendFrameAsync(new GW_GET_NODE_INFORMATION_REQ(nodeID));
                    return getNodeInformation;
                }
                catch (error) {
                    if (error instanceof Error &&
                        error.cause instanceof GW_ERROR_NTF &&
                        error.cause.ErrorNumber === GW_ERROR.Busy) {
                        return await setImmediate(await retryIfNotBusy());
                    }
                    debug(`Error reading node information of added node: ${error}`);
                    throw error;
                }
            };
            const getNodeInformation = await setImmediate(await retryIfNotBusy());
            if (getNodeInformation.Status !== GW_COMMON_STATUS.SUCCESS) {
                return Promise.reject(new Error(getNodeInformation.getError()));
            }
            // The notifications will resolve the promise
            return await notificationHandler;
        }
        catch (e_3) {
            env_3.error = e_3;
            env_3.hasError = true;
        }
        finally {
            __disposeResources(env_3);
        }
    }
    /**
     * Creates a new instance of the Products class.
     * During the initialization phase of the class
     * a list of all registered products will be
     * retrieved from the KFL-200 interface and
     * stored at the Product array.
     *
     * Additionally, some notification handlers
     * will be instantiated to watch for changes
     * to the products.
     *
     * @param {IConnection} Connection The connection object that handles the communication to the KLF interface.
     * @returns {Promise<Products>} Resolves to a new instance of the Products class.
     */
    static async createProductsAsync(Connection) {
        debug("Creating new instance of Products");
        const result = new Products(Connection);
        await result.initializeProductsAsync();
        return result;
    }
    /**
     * Find a product by its name.
     *
     * @param {string} productName Name of the product
     * @returns {(Product | undefined)} Returns a [[Product]] instance if found, otherwise undefined.
     */
    findByName(productName) {
        debug(`Finding product with name ${productName}`);
        return this.Products.find((pr) => typeof pr !== "undefined" && pr.Name === productName);
    }
    /**
     * Requests status data directly from one or more products.
     *
     * You can use this method to refresh the state of products in case
     * that you have missed changes, e.g. a simple remote control may change
     * the state of the product and you won't receive an event for it.
     *
     * @param Nodes The ID of a single product node or an array of IDs of multiple product nodes for which you want to get the status.
     * @param StatusType The type of request, e.g. current position, target position
     * @param [FunctionalParameters=[]] Additional functional parameters (FP1-FP16) that should be requested. A maximum of 7 functional parameters can be requested with each call.
     * @returns {Promise<numer>} The fulfilled promise will return the SessionID.
     */
    async requestStatusAsync(Nodes, StatusType, FunctionalParameters = []) {
        debug(`Requesting status for Nodes ${JSON.stringify(Nodes)} with StatusType ${StatusType}`);
        const confirmationFrame = await this.Connection.sendFrameAsync(new GW_STATUS_REQUEST_REQ(Nodes, StatusType, FunctionalParameters));
        if (confirmationFrame.CommandStatus === CommandStatus.CommandAccepted) {
            return Promise.resolve(confirmationFrame.SessionID);
        }
        else {
            return Promise.reject(new Error(confirmationFrame.getError()));
        }
    }
}
//# sourceMappingURL=products.js.map