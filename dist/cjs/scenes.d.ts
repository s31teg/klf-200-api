import { CommandOriginator, PriorityLevel } from "./KLF200-API/GW_COMMAND.js";
import { SceneInformationEntry } from "./KLF200-API/GW_GET_SCENE_INFORMATION_NTF.js";
import { Velocity } from "./KLF200-API/GW_SYSTEMTABLE_DATA.js";
import { IConnection } from "./connection.js";
import { Component } from "./utils/PropertyChangedEvent.js";
import { Disposable, Listener } from "./utils/TypedEvent.js";
/**
 * The scene object contains the ID, name and a list of products that are contained in the scene.
 * You have methods to start and stop a scene.
 *
 * @class Scene
 */
export declare class Scene extends Component {
    readonly Connection: IConnection;
    readonly SceneID: number;
    private _isRunning;
    private _runningSession;
    private _sceneName;
    /**
     * Contains a list of node IDs with their target values.
     *
     * @type {SceneInformationEntry[]}
     */
    readonly Products: SceneInformationEntry[];
    /**
     * Creates an instance of Scene.
     * @param {IConnection} Connection The connection that will be used to send and receive commands.
     * @param {number} SceneID The ID of the scene.
     * @param {string} SceneName The name of the scene.
     */
    constructor(Connection: IConnection, SceneID: number, SceneName: string);
    /**
     * The name of the scene.
     *
     * @readonly
     * @type {string}
     */
    get SceneName(): string;
    /**
     * Set to true if the scene is currently running.
     *
     * @readonly
     * @type {boolean}
     */
    get IsRunning(): boolean;
    /**
     * Start the scene.
     *
     * @param Velocity The velocity with which the scene will be run.
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @returns {Promise<number>} Returns the session ID. You can listen for the GW_SESSION_FINISHED_NTF notification to determine when the scene has finished.
     */
    runAsync(Velocity?: Velocity, PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator): Promise<number>;
    /**
     * Stops a running scene.
     *
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @returns {Promise<number>} Returns the session ID.
     */
    stopAsync(PriorityLevel?: PriorityLevel, CommandOriginator?: CommandOriginator): Promise<number>;
    /**
     * Refreshes the Products array.
     *
     * This method is called from the Scenes class if a change notification has been received.
     *
     * @returns {Promise<void>}
     */
    refreshAsync(): Promise<void>;
    private onNotificationHandler;
    private onSessionFinished;
}
/**
 * Use the scenes object to retrieve a list of scenes known to your KLF interface and to start one of them.
 *
 * @class Scenes
 */
export declare class Scenes {
    readonly Connection: IConnection;
    private readonly _onChangedScenes;
    private readonly _onRemovedScenes;
    private readonly _onAddedScenes;
    /**
     * The list of scenes objects that correspond to the scenes defined at the KLF 200 interface.
     *
     * The array index corresponds to the scene ID.
     *
     * @type {Scene[]}
     */
    readonly Scenes: Scene[];
    private constructor();
    /**
     * Creates an instance of Scenes.
     *
     * @param {IConnection} Connection The connection that will be used to send and receive commands.
     * @returns {Promise<Scenes>} Returns a new Scenes object that is initialized, already.
     */
    static createScenesAsync(Connection: IConnection): Promise<Scenes>;
    private _notificationHandler;
    refreshScenesAsync(): Promise<void>;
    private onNotificationHandler;
    /**
     * Add an event handler that is called if a scene has been changed.
     *
     * @param {Listener<number>} handler The handler that is called if the event is emitted.
     * @returns {Disposable} Call the dispose method of the returned object to remove the handler.
     */
    onChangedScene(handler: Listener<number>): Disposable;
    /**
     * Add an event handler that is called if a scene has been removed.
     *
     * @param {Listener<number>} handler The handler that is called if the event is emitted.
     * @returns {Disposable} Call the dispose method of the returned object to remove the handler.
     */
    onRemovedScene(handler: Listener<number>): Disposable;
    /**
     * Add an event handler that is called if a scene has been added.
     *
     * @param {Listener<number>} handler The handler that is called if the event is emitted.
     * @returns {Disposable} Call the dispose method of the returned object to remove the handler.
     */
    onAddedScene(handler: Listener<number>): Disposable;
    private notifyChangedScene;
    private notifyRemovedScene;
    private notifyAddedScene;
    /**
     * Finds a scene by its name and returns the scene object.
     *
     * @param {string} sceneName The name of the scene.
     * @returns {(Scene | undefined)} Returns the scene object if found, otherwise undefined.
     */
    findByName(sceneName: string): Scene | undefined;
}
