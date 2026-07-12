import { CommandOriginator, FunctionalParameter, LimitationType, ParameterActive, PriorityLevel, PriorityLevelInformation, PriorityLevelLock, RunStatus, StatusReply, StatusType } from "./KLF200-API/GW_COMMAND.js";
import { GW_GET_ALL_NODES_INFORMATION_NTF } from "./KLF200-API/GW_GET_ALL_NODES_INFORMATION_NTF.js";
import { GW_GET_NODE_INFORMATION_NTF } from "./KLF200-API/GW_GET_NODE_INFORMATION_NTF.js";
import { ActuatorAlias, ActuatorType, NodeOperatingState, NodeVariation, PowerSaveMode, Velocity } from "./KLF200-API/GW_SYSTEMTABLE_DATA.js";
import { IConnection } from "./connection.js";
import { Component } from "./utils/PropertyChangedEvent.js";
import { Disposable, Listener } from "./utils/TypedEvent.js";
/**
 * Each product that is registered at the KLF-200 interface will be created
 * as an instance of the Product class.
 *
 * @class Product
 */
export declare class Product extends Component {
    readonly Connection: IConnection;
    private _name;
    /**
     * NodeID is an Actuator index in the system table, to get information from. It must be a
     * value from 0 to 199.
     *
     * @type {number}
     */
    readonly NodeID: number;
    private _TypeID;
    /**
     * Indicates the node type, ex. Window, Roller shutter, Light etc.
     *
     * @readonly
     * @type {ActuatorType}
     */
    get TypeID(): ActuatorType;
    private _SubType;
    /**
     * Details the node type and depends on the TypeID property.
     *
     * @readonly
     * @type {number}
     */
    get SubType(): number;
    private _order;
    private _placement;
    private _velocity;
    /**
     * Velocity the node is operated with.
     *
     * @readonly
     * @type {Velocity}
     */
    get Velocity(): Velocity;
    private _nodeVariation;
    private _PowerSaveMode;
    /**
     * The power mode of the node.
     *
     * @readonly
     * @type {PowerSaveMode}
     */
    get PowerSaveMode(): PowerSaveMode;
    private _SerialNumber;
    /**
     * The serial number of the product.
     *
     * @readonly
     * @type {Buffer}
     */
    get SerialNumber(): Buffer;
    private _ProductType;
    /**
     * Type of the product, eg. KMG, KMX.
     *
     * @readonly
     * @type {number}
     */
    get ProductType(): number;
    private _state;
    private _currentPositionRaw;
    private _targetPositionRaw;
    private _fp1CurrentPositionRaw;
    private _fp2CurrentPositionRaw;
    private _fp3CurrentPositionRaw;
    private _fp4CurrentPositionRaw;
    private _remainingTime;
    private _timeStamp;
    private _ProductAlias;
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
    get ProductAlias(): ActuatorAlias[];
    private _runStatus;
    private _statusReply;
    /**
     * Creates an instance of Product. You shouldn't create instances
     * of the [[Product]] class by yourself. Instead, use the [[Products]] class
     * to read all installed products from the KLF-200.
     *
     * @param {IConnection} Connection The connection object that handles the communication to the KLF interface.
     * @param {(GW_GET_NODE_INFORMATION_NTF | GW_GET_ALL_NODES_INFORMATION_NTF)} frame Notification frame that is used to set the properties of the Product class instance.
     */
    constructor(Connection: IConnection, frame: GW_GET_NODE_INFORMATION_NTF | GW_GET_ALL_NODES_INFORMATION_NTF);
    /**
     * Name of the product.
     *
     * @readonly
     * @type {string}
     */
    get Name(): string;
    /**
     * Renames the product.
     *
     * @param {string} newName New name of the product.
     * @returns {Promise<void>}
     */
    setNameAsync(newName: string): Promise<void>;
    /**
     * String representation of the TypeID and SubType.
     *
     * @readonly
     * @type {string}
     */
    get Category(): string;
    /**
     * Defines the variation of a product.
     *
     * @readonly
     * @type {NodeVariation}
     */
    get NodeVariation(): NodeVariation;
    /**
     * Sets the variation of a product to a new value.
     *
     * @param {NodeVariation} newNodeVariation New value for the variation of the product.
     * @returns {Promise<void>}
     */
    setNodeVariationAsync(newNodeVariation: NodeVariation): Promise<void>;
    /**
     * Sets the order and placement of the product.
     *
     * @param {number} newOrder The new order value of the product.
     * @param {number} newPlacement The new placement value of the product.
     * @returns {Promise<void>}
     */
    setOrderAndPlacementAsync(newOrder: number, newPlacement: number): Promise<void>;
    /**
     * The order in which the products should be displayed by a client application.
     *
     * @readonly
     * @type {number}
     */
    get Order(): number;
    /**
     * Sets a new value for the order number of the product.
     *
     * @param {number} newOrder New value for the order property.
     * @returns {Promise<void>}
     */
    setOrderAsync(newOrder: number): Promise<void>;
    /**
     * The placement of the product. Either a house index or a room index number.
     *
     * @readonly
     * @type {number}
     */
    get Placement(): number;
    /**
     * Sets a new value for the placement of the product.
     *
     * @param {number} newPlacement New value for the placement property.
     * @returns {Promise<void>}
     */
    setPlacementAsync(newPlacement: number): Promise<void>;
    /**
     * Current operating state of the product.
     *
     * @readonly
     * @type {NodeOperatingState}
     */
    get State(): NodeOperatingState;
    /**
     * Raw value of the current position of the product.
     *
     * @readonly
     * @type {number}
     */
    get CurrentPositionRaw(): number;
    /**
     * Raw value of the target value for the position of the product.
     *
     * @readonly
     * @type {number}
     */
    get TargetPositionRaw(): number;
    /**
     * Raw value of the current position of the functional paramter 1.
     *
     * @readonly
     * @type {number}
     */
    get FP1CurrentPositionRaw(): number;
    /**
     * Raw value of the current position of the functional paramter 2.
     *
     * @readonly
     * @type {number}
     */
    get FP2CurrentPositionRaw(): number;
    /**
     * Raw value of the current position of the functional paramter 3.
     *
     * @readonly
     * @type {number}
     */
    get FP3CurrentPositionRaw(): number;
    /**
     * Raw value of the current position of the functional paramter 4.
     *
     * @readonly
     * @type {number}
     */
    get FP4CurrentPositionRaw(): number;
    /**
     * Remaining time in seconds to reach the desired target position.
     *
     * @readonly
     * @type {number}
     */
    get RemainingTime(): number;
    /**
     * Timestamp of the last change to any of the properties.
     *
     * @readonly
     * @type {Date}
     */
    get TimeStamp(): Date;
    /**
     * The current run status of the product.
     *
     * @readonly
     * @type {RunStatus}
     */
    get RunStatus(): RunStatus;
    /**
     * Additional status information, e.g. that opening a window is overruled by the rain sensor.
     *
     * @readonly
     * @type {StatusReply}
     */
    get StatusReply(): StatusReply;
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
    get CurrentPosition(): number;
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
    setTargetPositionRawAsync(newPosition: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator, ParameterActive?: ParameterActive, FunctionalParameters?: FunctionalParameter[], PriorityLevelLock?: PriorityLevelLock, PriorityLevels?: PriorityLevelInformation[], LockTime?: number): Promise<number>;
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
    setTargetPositionAsync(newPosition: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator, ParameterActive?: ParameterActive, FunctionalParameters?: FunctionalParameter[], PriorityLevelLock?: PriorityLevelLock, PriorityLevels?: PriorityLevelInformation[], LockTime?: number): Promise<number>;
    /**
     * The target position in percent.
     *
     * @readonly
     * @type {number}
     */
    get TargetPosition(): number;
    private _limitationOriginator;
    /**
     * A read only array of the limitation originators.
     * @readonly
     * @type {CommandOriginator[]}
     */
    get LimitationOriginator(): readonly CommandOriginator[];
    /**
     * Returns the limitation originator for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Paramter for which the limitation originator should be returned.
     * @returns The limitation originator.
     */
    getLimitationOriginator(functionalParameter: ParameterActive): CommandOriginator;
    private _limitationTimeRaw;
    /**
     * A read only array of the limitation time raw values.
     * @readonly
     * @type {number[]}
     */
    get LimitationTimeRaw(): readonly number[];
    /**
     * Returns the raw value of the limitation time for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Parameter for which the limitation time raw value should be returned.
     * @returns The raw limitation time value.
     */
    getLimitationTimeRaw(functionalParameter: ParameterActive): number;
    /**
     * Returns the limitation time in seconds for a functional parameter.
     * You have to call {@link refreshLimitationAsync} to get the latest values first.
     *
     * @param functionalParameter Parameter for which the limitation time should be returned.
     * @returns The limitation time in seconds or Infinity.
     */
    getLimitationTime(functionalParameter: ParameterActive): number;
    private _limitationMinRaw;
    /**
     * A read only array of the raw limitations' min values.
     *
     * @readonly
     * @type {number[]}
     */
    get LimitationMinRaw(): readonly number[];
    /**
     * The minimum value (raw) of a limitation of the product.
     *
     * @readonly
     * @param functionalParameter Parameter for which the limitation should be returned.
     * @type {number}
     */
    getLimitationMinRaw(functionalParameter: ParameterActive): number;
    private _limitationMaxRaw;
    /**
     * A read only array of the raw limitations' max values.
     *
     * @readonly
     * @type {number[]}
     */
    get LimitationMaxRaw(): readonly number[];
    /**
     * The maximum value (raw) of a limitation of the product.
     *
     * @readonly
     * @param functionalParameter Parameter for which the limitation should be returned.
     * @type {number}
     */
    getLimitationMaxRaw(functionalParameter: ParameterActive): number;
    /**
     * Returns a tuple of min and max values for the limitation of the provided parameter.
     *
     * @param functionalParameter Parameter for which the limitations should be returned.
     * @returns A tuple of the min and max values as percentage in the range [0, 1].
     * 			The first value of the tuple corresponds always to the min raw value
     * 			and the second value corresponds always to the max raw value.
     */
    getLimitations(functionalParameter: ParameterActive): [min: number, max: number];
    /**
     * The minimum value of a limitation of the product.
     *
     * @readonly
     * @param functionalParameter Parameter for which the limitation should be returned.
     * @type {number}
     */
    getLimitationMin(functionalParameter: ParameterActive): number;
    /**
     * The maximum value of a limitation of the product.
     *
     * @readonly
     * @param functionalParameter Parameter for which the limitation should be returned.
     * @type {number}
     */
    getLimitationMax(functionalParameter: ParameterActive): number;
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
    stopAsync(PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator, ParameterActive?: ParameterActive, FunctionalParameters?: FunctionalParameter[], PriorityLevelLock?: PriorityLevelLock, PriorityLevels?: PriorityLevelInformation[], LockTime?: number): Promise<number>;
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
    winkAsync(EnableWink?: boolean, WinkTime?: number, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator): Promise<number>;
    /**
     * Refresh the data of this product and read the attributes from the gateway.
     *
     * This method re-reads the data from the KLF-200. If the product hasn't sent
     * its recent data to the KLF-200, call {@link Products.requestStatusAsync} first.
     *
     * @returns {Promise<void>}
     */
    refreshAsync(): Promise<void>;
    private setupWaitForLimitationFinished;
    /**
     * Refreshes the limitation data for the provided limitation type of a parameter.
     *
     * @param limitationType The limitation type for which the data should be refreshed.
     * @param parameterActive Parameter for which the limitation should be refreshed.
     * @returns Promise<void>
     */
    refreshLimitationAsync(limitationType: LimitationType, parameterActive?: ParameterActive): Promise<void>;
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
    setLimitationRawAsync(minValue: number, maxValue: number, parameterActive?: ParameterActive, limitationTime?: number, // Unlimited time
    commandOriginator?: CommandOriginator, priorityLevel?: PriorityLevel): Promise<void>;
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
    setLimitationAsync(minValue: number, maxValue: number, parameterActive?: ParameterActive, limitationTime?: number, // Unlimited time
    commandOriginator?: CommandOriginator, priorityLevel?: PriorityLevel): Promise<void>;
    /**
     * Clears the limitation for the parameter.
     *
     * @param parameterActive Parameter for which the limitation should be set.
     * @param commandOriginator Command Originator.
     * @param priorityLevel Priority Level.
     * @returns Promise<void>
     */
    clearLimitationAsync(parameterActive?: ParameterActive, commandOriginator?: CommandOriginator, priorityLevel?: PriorityLevel): Promise<void>;
    private onNotificationHandler;
    private onNodeInformationChanged;
    private onNodeStatePositionChanged;
    private onRunStatus;
    private onRemainingTime;
    private onGetNodeInformation;
    private onStatusRequest;
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
export declare class Products {
    readonly Connection: IConnection;
    private _onNewProduct;
    private _onRemovedProduct;
    /**
     * Contains a list of products.
     * The index of each product corresponds to the
     * system table index. The range is [0-199].
     *
     * @type {Product[]}
     */
    readonly Products: Product[];
    /**
     *Creates an instance of Products.
     * @param {IConnection} Connection The connection object that handles the communication to the KLF interface.
     */
    private constructor();
    private initializeProductsAsync;
    /**
     * Adds a handler that will be called if a new product is added to the KLF-200 interface.
     *
     * @param {Listener<number>} handler Event handler that is called if a new product is added.
     * @returns {Disposable} The event handler can be removed by using the dispose method of the returned object.
     */
    onNewProduct(handler: Listener<number>): Disposable;
    /**
     * Adds a handler that will be called if a product is removed from the KLF-200 interface.
     *
     * @param {Listener<number>} handler Event handler that is called if a product is removed.
     * @returns {Disposable} The event handler can be removed by using the dispose method of the returned object.
     */
    onRemovedProduct(handler: Listener<number>): Disposable;
    private notifyNewProduct;
    private notifiyRemovedProduct;
    private onNotificationHandler;
    private addNodeAsync;
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
    static createProductsAsync(Connection: IConnection): Promise<Products>;
    /**
     * Find a product by its name.
     *
     * @param {string} productName Name of the product
     * @returns {(Product | undefined)} Returns a [[Product]] instance if found, otherwise undefined.
     */
    findByName(productName: string): Product | undefined;
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
    requestStatusAsync(Nodes: number[] | number, StatusType: StatusType, FunctionalParameters?: number[]): Promise<number>;
}
