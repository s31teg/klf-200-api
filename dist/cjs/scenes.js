"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Scenes = exports.Scene = void 0;
const debug_1 = require("debug");
const GW_ACTIVATE_SCENE_REQ_js_1 = require("./KLF200-API/GW_ACTIVATE_SCENE_REQ.js");
const GW_GET_SCENE_INFORMATION_NTF_js_1 = require("./KLF200-API/GW_GET_SCENE_INFORMATION_NTF.js");
const GW_GET_SCENE_INFORMATION_REQ_js_1 = require("./KLF200-API/GW_GET_SCENE_INFORMATION_REQ.js");
const GW_GET_SCENE_LIST_NTF_js_1 = require("./KLF200-API/GW_GET_SCENE_LIST_NTF.js");
const GW_GET_SCENE_LIST_REQ_js_1 = require("./KLF200-API/GW_GET_SCENE_LIST_REQ.js");
const GW_SCENES_js_1 = require("./KLF200-API/GW_SCENES.js");
const GW_SCENE_INFORMATION_CHANGED_NTF_js_1 = require("./KLF200-API/GW_SCENE_INFORMATION_CHANGED_NTF.js");
const GW_SESSION_FINISHED_NTF_js_1 = require("./KLF200-API/GW_SESSION_FINISHED_NTF.js");
const GW_STOP_SCENE_REQ_js_1 = require("./KLF200-API/GW_STOP_SCENE_REQ.js");
const common_js_1 = require("./KLF200-API/common.js");
const PropertyChangedEvent_js_1 = require("./utils/PropertyChangedEvent.js");
const TypedEvent_js_1 = require("./utils/TypedEvent.js");
const debug = (0, debug_1.default)(`klf-200-api:scenes`);
/**
 * The scene object contains the ID, name and a list of products that are contained in the scene.
 * You have methods to start and stop a scene.
 *
 * @class Scene
 */
class Scene extends PropertyChangedEvent_js_1.Component {
    Connection;
    SceneID;
    _isRunning = false;
    _runningSession = -1;
    _sceneName;
    /**
     * Contains a list of node IDs with their target values.
     *
     * @type {SceneInformationEntry[]}
     */
    Products = [];
    /**
     * Creates an instance of Scene.
     * @param {IConnection} Connection The connection that will be used to send and receive commands.
     * @param {number} SceneID The ID of the scene.
     * @param {string} SceneName The name of the scene.
     */
    constructor(Connection, SceneID, SceneName) {
        super();
        this.Connection = Connection;
        this.SceneID = SceneID;
        this._sceneName = SceneName;
        this.Connection.on(async (frame) => {
            debug(`Calling onNotificationHandler for GW_SESSION_FINISHED_NTF added in Scene constructor.`);
            await this.onNotificationHandler(frame);
        }, [common_js_1.GatewayCommand.GW_SESSION_FINISHED_NTF]);
    }
    /**
     * The name of the scene.
     *
     * @readonly
     * @type {string}
     */
    get SceneName() {
        return this._sceneName;
    }
    /**
     * Set to true if the scene is currently running.
     *
     * @readonly
     * @type {boolean}
     */
    get IsRunning() {
        return this._isRunning;
    }
    /**
     * Start the scene.
     *
     * @param Velocity The velocity with which the scene will be run.
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @returns {Promise<number>} Returns the session ID. You can listen for the GW_SESSION_FINISHED_NTF notification to determine when the scene has finished.
     */
    async runAsync(Velocity = 0, PriorityLevel = 3, CommandOriginator = 1) {
        try {
            const confirmationFrame = await this.Connection.sendFrameAsync(new GW_ACTIVATE_SCENE_REQ_js_1.GW_ACTIVATE_SCENE_REQ(this.SceneID, PriorityLevel, CommandOriginator, Velocity));
            if (confirmationFrame.Status === GW_SCENES_js_1.ActivateSceneStatus.OK) {
                this._isRunning = true;
                this._runningSession = confirmationFrame.SessionID;
                await this.propertyChanged("IsRunning");
                return confirmationFrame.SessionID;
            }
            else {
                return Promise.reject(new Error(confirmationFrame.getError()));
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * Stops a running scene.
     *
     * @param PriorityLevel The priority level for the run command.
     * @param CommandOriginator The command originator for the run command.
     * @returns {Promise<number>} Returns the session ID.
     */
    async stopAsync(PriorityLevel = 3, CommandOriginator = 1) {
        try {
            const confirmationFrame = await this.Connection.sendFrameAsync(new GW_STOP_SCENE_REQ_js_1.GW_STOP_SCENE_REQ(this.SceneID, PriorityLevel, CommandOriginator));
            if (confirmationFrame.Status === GW_SCENES_js_1.ActivateSceneStatus.OK) {
                this._isRunning = false;
                this._runningSession = confirmationFrame.SessionID;
                await this.propertyChanged("IsRunning");
                return confirmationFrame.SessionID;
            }
            else {
                return Promise.reject(new Error(confirmationFrame.getError()));
            }
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    /**
     * Refreshes the Products array.
     *
     * This method is called from the Scenes class if a change notification has been received.
     *
     * @returns {Promise<void>}
     */
    async refreshAsync() {
        // Setup notification to receive notification with actuator type
        let dispose;
        try {
            const tempResult = []; // Store results temporary until finished without error.
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            let resolve, reject;
            const notificationHandler = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            dispose = this.Connection.on(async (frame) => {
                try {
                    debug(`Calling handler for GW_GET_SCENE_INFORMATION_NTF in Scene.refreshAsync.`);
                    if (frame instanceof GW_GET_SCENE_INFORMATION_NTF_js_1.GW_GET_SCENE_INFORMATION_NTF) {
                        tempResult.push(...frame.Nodes);
                        // Check, if last notification message
                        if (frame.NumberOfRemainingNodes === 0) {
                            if (dispose) {
                                dispose.dispose();
                            }
                            // Finished without error -> update Products array
                            this.Products.length = 0; // Clear array of products
                            this.Products.push(...tempResult);
                            await this.propertyChanged("Products");
                            // It seems that currently the notification frame doesn't return the scene name.
                            // Though we only change it if it's not empty and different.
                            if (frame.Name !== this._sceneName && frame.Name !== "") {
                                this._sceneName = frame.Name;
                                await this.propertyChanged("SceneName");
                            }
                            resolve();
                        }
                    }
                }
                catch (error) {
                    if (dispose) {
                        dispose.dispose();
                    }
                    reject(error);
                }
            }, [common_js_1.GatewayCommand.GW_GET_SCENE_INFORMATION_NTF]);
            const confirmationFrame = await this.Connection.sendFrameAsync(new GW_GET_SCENE_INFORMATION_REQ_js_1.GW_GET_SCENE_INFORMATION_REQ(this.SceneID));
            if (confirmationFrame.SceneID === this.SceneID) {
                if (confirmationFrame.Status !== common_js_1.GW_COMMON_STATUS.SUCCESS) {
                    if (dispose) {
                        dispose.dispose();
                    }
                    return Promise.reject(new Error(confirmationFrame.getError()));
                }
            }
            // The notifications will resolve the promise
            await notificationHandler;
        }
        catch (error) {
            if (dispose) {
                dispose.dispose();
            }
            return Promise.reject(error);
        }
    }
    async onNotificationHandler(frame) {
        if (frame instanceof GW_SESSION_FINISHED_NTF_js_1.GW_SESSION_FINISHED_NTF) {
            await this.onSessionFinished(frame);
        }
    }
    async onSessionFinished(frame) {
        if (frame.SessionID === this._runningSession) {
            this._isRunning = false;
            this._runningSession = -1;
            await this.propertyChanged("IsRunning");
        }
    }
}
exports.Scene = Scene;
/**
 * Use the scenes object to retrieve a list of scenes known to your KLF interface and to start one of them.
 *
 * @class Scenes
 */
class Scenes {
    Connection;
    _onChangedScenes = new TypedEvent_js_1.TypedEvent();
    _onRemovedScenes = new TypedEvent_js_1.TypedEvent();
    _onAddedScenes = new TypedEvent_js_1.TypedEvent();
    /**
     * The list of scenes objects that correspond to the scenes defined at the KLF 200 interface.
     *
     * The array index corresponds to the scene ID.
     *
     * @type {Scene[]}
     */
    Scenes = [];
    constructor(Connection) {
        this.Connection = Connection;
    }
    /**
     * Creates an instance of Scenes.
     *
     * @param {IConnection} Connection The connection that will be used to send and receive commands.
     * @returns {Promise<Scenes>} Returns a new Scenes object that is initialized, already.
     */
    static async createScenesAsync(Connection) {
        try {
            const result = new Scenes(Connection);
            await result.refreshScenesAsync();
            return result;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }
    _notificationHandler;
    async refreshScenesAsync() {
        // Setup notification to receive notification with actuator type
        let dispose;
        const newScenes = [];
        try {
            // Setup the event handlers first to prevent a race condition
            // where we don't see the events.
            let resolve, reject;
            const notificationHandlerSceneList = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
            dispose = this.Connection.on((frame) => {
                try {
                    debug(`Calling handler for GW_GET_SCENE_LIST_NTF in Scenes.refreshScenesAsync.`);
                    if (frame instanceof GW_GET_SCENE_LIST_NTF_js_1.GW_GET_SCENE_LIST_NTF) {
                        frame.Scenes.forEach((scene) => {
                            if (typeof this.Scenes[scene.SceneID] === "undefined") {
                                const newScene = new Scene(this.Connection, scene.SceneID, scene.Name);
                                this.Scenes[scene.SceneID] = newScene;
                                newScenes.push(newScene);
                            }
                        });
                        if (frame.NumberOfRemainingScenes === 0) {
                            if (dispose) {
                                dispose.dispose();
                            }
                            resolve();
                        }
                    }
                }
                catch (error) {
                    if (dispose) {
                        dispose.dispose();
                    }
                    reject(error);
                }
            }, [common_js_1.GatewayCommand.GW_GET_SCENE_LIST_NTF]);
            const getSceneListConfirmation = await this.Connection.sendFrameAsync(new GW_GET_SCENE_LIST_REQ_js_1.GW_GET_SCENE_LIST_REQ());
            // Wait for GW_GET_SCENE_LIST_NTF, but only if there are scenes defined
            if (getSceneListConfirmation.NumberOfScenes > 0) {
                await notificationHandlerSceneList;
            }
            else {
                // Otherwise dispose the event handler, because there won't be any events
                if (dispose) {
                    dispose.dispose();
                }
            }
            // Get more detailed information for each scene
            for (const scene of this.Scenes) {
                if (typeof scene !== "undefined") {
                    await scene.refreshAsync();
                }
            }
            // Notify about added scenes
            for (const scene of newScenes) {
                await this.notifyAddedScene(scene.SceneID);
            }
            // Setup notification handler
            if (typeof this._notificationHandler === "undefined") {
                this._notificationHandler = this.Connection.on(async (frame) => {
                    debug(`Calling onNotificationHandler for GW_SCENE_INFORMATION_CHANGED_NTF in Scenes.refreshSCenesAsync.`);
                    await this.onNotificationHandler(frame);
                }, [common_js_1.GatewayCommand.GW_SCENE_INFORMATION_CHANGED_NTF]);
            }
            return Promise.resolve();
        }
        catch (error) {
            if (dispose) {
                dispose.dispose();
            }
            return Promise.reject(error);
        }
    }
    async onNotificationHandler(frame) {
        if (frame instanceof GW_SCENE_INFORMATION_CHANGED_NTF_js_1.GW_SCENE_INFORMATION_CHANGED_NTF) {
            switch (frame.SceneChangeType) {
                case GW_SCENE_INFORMATION_CHANGED_NTF_js_1.SceneChangeType.Deleted:
                    // eslint-disable-next-line @typescript-eslint/no-array-delete
                    delete this.Scenes[frame.SceneID];
                    await this.notifyRemovedScene(frame.SceneID);
                    break;
                case GW_SCENE_INFORMATION_CHANGED_NTF_js_1.SceneChangeType.Modified:
                    await this.Scenes[frame.SceneID].refreshAsync();
                    await this.notifyChangedScene(frame.SceneID);
                default:
                    break;
            }
        }
    }
    /**
     * Add an event handler that is called if a scene has been changed.
     *
     * @param {Listener<number>} handler The handler that is called if the event is emitted.
     * @returns {Disposable} Call the dispose method of the returned object to remove the handler.
     */
    onChangedScene(handler) {
        return this._onChangedScenes.on(handler);
    }
    /**
     * Add an event handler that is called if a scene has been removed.
     *
     * @param {Listener<number>} handler The handler that is called if the event is emitted.
     * @returns {Disposable} Call the dispose method of the returned object to remove the handler.
     */
    onRemovedScene(handler) {
        return this._onRemovedScenes.on(handler);
    }
    /**
     * Add an event handler that is called if a scene has been added.
     *
     * @param {Listener<number>} handler The handler that is called if the event is emitted.
     * @returns {Disposable} Call the dispose method of the returned object to remove the handler.
     */
    onAddedScene(handler) {
        return this._onAddedScenes.on(handler);
    }
    async notifyChangedScene(sceneId) {
        await this._onChangedScenes.emit(sceneId);
    }
    async notifyRemovedScene(sceneId) {
        await this._onRemovedScenes.emit(sceneId);
    }
    async notifyAddedScene(sceneId) {
        await this._onAddedScenes.emit(sceneId);
    }
    /**
     * Finds a scene by its name and returns the scene object.
     *
     * @param {string} sceneName The name of the scene.
     * @returns {(Scene | undefined)} Returns the scene object if found, otherwise undefined.
     */
    findByName(sceneName) {
        return this.Scenes.find((sc) => typeof sc !== "undefined" && sc.SceneName === sceneName);
    }
}
exports.Scenes = Scenes;
//# sourceMappingURL=scenes.js.map