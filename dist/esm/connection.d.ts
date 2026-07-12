import { ConnectionOptions } from "tls";
import { GW_GET_STATE_REQ } from "./KLF200-API/GW_GET_STATE_REQ.js";
import { KLF200SocketProtocol } from "./KLF200-API/KLF200SocketProtocol.js";
import { GatewayCommand, IGW_FRAME_RCV, IGW_FRAME_REQ } from "./KLF200-API/common.js";
import { GW_ACTIVATE_PRODUCTGROUP_CFM, GW_ACTIVATE_PRODUCTGROUP_REQ, GW_ACTIVATE_SCENE_CFM, GW_ACTIVATE_SCENE_REQ, GW_CLEAR_ACTIVATION_LOG_CFM, GW_CLEAR_ACTIVATION_LOG_REQ, GW_COMMAND_SEND_CFM, GW_COMMAND_SEND_REQ, GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM, GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ, GW_CS_CONTROLLER_COPY_CFM, GW_CS_CONTROLLER_COPY_REQ, GW_CS_DISCOVER_NODES_CFM, GW_CS_DISCOVER_NODES_REQ, GW_CS_GENERATE_NEW_KEY_CFM, GW_CS_GENERATE_NEW_KEY_REQ, GW_CS_GET_SYSTEMTABLE_DATA_CFM, GW_CS_GET_SYSTEMTABLE_DATA_REQ, GW_CS_RECEIVE_KEY_CFM, GW_CS_RECEIVE_KEY_REQ, GW_CS_REMOVE_NODES_CFM, GW_CS_REMOVE_NODES_REQ, GW_CS_REPAIR_KEY_CFM, GW_CS_REPAIR_KEY_REQ, GW_CS_VIRGIN_STATE_CFM, GW_CS_VIRGIN_STATE_REQ, GW_DELETE_GROUP_CFM, GW_DELETE_GROUP_REQ, GW_DELETE_SCENE_CFM, GW_DELETE_SCENE_REQ, GW_GET_ACTIVATION_LOG_HEADER_CFM, GW_GET_ACTIVATION_LOG_HEADER_REQ, GW_GET_ACTIVATION_LOG_LINE_CFM, GW_GET_ACTIVATION_LOG_LINE_REQ, GW_GET_ALL_GROUPS_INFORMATION_CFM, GW_GET_ALL_GROUPS_INFORMATION_REQ, GW_GET_ALL_NODES_INFORMATION_CFM, GW_GET_ALL_NODES_INFORMATION_REQ, GW_GET_CONTACT_INPUT_LINK_LIST_CFM, GW_GET_CONTACT_INPUT_LINK_LIST_REQ, GW_GET_GROUP_INFORMATION_CFM, GW_GET_GROUP_INFORMATION_REQ, GW_GET_LIMITATION_STATUS_CFM, GW_GET_LIMITATION_STATUS_REQ, GW_GET_LOCAL_TIME_CFM, GW_GET_LOCAL_TIME_REQ, GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_CFM, GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ, GW_GET_NETWORK_SETUP_CFM, GW_GET_NETWORK_SETUP_REQ, GW_GET_NODE_INFORMATION_CFM, GW_GET_NODE_INFORMATION_REQ, GW_GET_PROTOCOL_VERSION_CFM, GW_GET_PROTOCOL_VERSION_REQ, GW_GET_SCENE_INFORMATION_CFM, GW_GET_SCENE_INFORMATION_REQ, GW_GET_SCENE_LIST_CFM, GW_GET_SCENE_LIST_REQ, GW_GET_STATE_CFM, GW_GET_VERSION_CFM, GW_GET_VERSION_REQ, GW_HOUSE_STATUS_MONITOR_DISABLE_CFM, GW_HOUSE_STATUS_MONITOR_DISABLE_REQ, GW_HOUSE_STATUS_MONITOR_ENABLE_CFM, GW_HOUSE_STATUS_MONITOR_ENABLE_REQ, GW_INITIALIZE_SCENE_CANCEL_CFM, GW_INITIALIZE_SCENE_CANCEL_REQ, GW_INITIALIZE_SCENE_CFM, GW_INITIALIZE_SCENE_REQ, GW_LEAVE_LEARN_STATE_CFM, GW_LEAVE_LEARN_STATE_REQ, GW_MODE_SEND_CFM, GW_MODE_SEND_REQ, GW_NEW_GROUP_CFM, GW_NEW_GROUP_REQ, GW_PASSWORD_CHANGE_CFM, GW_PASSWORD_CHANGE_REQ, GW_PASSWORD_ENTER_CFM, GW_PASSWORD_ENTER_REQ, GW_REBOOT_CFM, GW_REBOOT_REQ, GW_RECORD_SCENE_CFM, GW_RECORD_SCENE_REQ, GW_REMOVE_CONTACT_INPUT_LINK_CFM, GW_REMOVE_CONTACT_INPUT_LINK_REQ, GW_RENAME_SCENE_CFM, GW_RENAME_SCENE_REQ, GW_RTC_SET_TIME_ZONE_CFM, GW_RTC_SET_TIME_ZONE_REQ, GW_SET_CONTACT_INPUT_LINK_CFM, GW_SET_CONTACT_INPUT_LINK_REQ, GW_SET_FACTORY_DEFAULT_CFM, GW_SET_FACTORY_DEFAULT_REQ, GW_SET_GROUP_INFORMATION_CFM, GW_SET_GROUP_INFORMATION_REQ, GW_SET_LIMITATION_CFM, GW_SET_LIMITATION_REQ, GW_SET_NETWORK_SETUP_CFM, GW_SET_NETWORK_SETUP_REQ, GW_SET_NODE_NAME_CFM, GW_SET_NODE_NAME_REQ, GW_SET_NODE_ORDER_AND_PLACEMENT_CFM, GW_SET_NODE_ORDER_AND_PLACEMENT_REQ, GW_SET_NODE_VARIATION_CFM, GW_SET_NODE_VARIATION_REQ, GW_SET_UTC_CFM, GW_SET_UTC_REQ, GW_STATUS_REQUEST_CFM, GW_STATUS_REQUEST_REQ, GW_STOP_SCENE_CFM, GW_STOP_SCENE_REQ, GW_WINK_SEND_CFM, GW_WINK_SEND_REQ } from "./index.js";
import { Disposable, Listener } from "./utils/TypedEvent.js";
/**
 * Interface for the connection.
 *
 * @interface IConnection
 */
export interface IConnection {
    /**
     * Logs in to the KLF interface by sending the GW_PASSWORD_ENTER_REQ.
     *
     * @param {string} password The password needed for login. The factory default password is velux123.
     * @param {number} [timeout] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<void>} Returns a promise that resolves to true on success or rejects with the errors.
     */
    loginAsync(password: string, timeout?: number): Promise<void>;
    /**
     * Logs out from the KLF interface and closes the socket.
     *
     * @param {number} [timeout] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<void>} Returns a promise that resolves to true on successful logout or rejects with the errors.
     */
    logoutAsync(timeout?: number): Promise<void>;
    /**
     * Sends a request frame to the KLF interface.
     *
     * @param {IGW_FRAME_REQ} frame The frame that should be sent to the KLF interface.
     * @param {number} [timeout] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<IGW_FRAME_RCV>} Returns a promise with the corresponding confirmation message as value.
     *                                   In case of an error frame the promise will be rejected with the error number.
     *                                   If the request frame is a command (with a SessionID) than the promise will be
     *                                   resolved by the corresponding confirmation frame with a matching session ID.
     */
    sendFrameAsync(frame: GW_REBOOT_REQ, timeout?: number): Promise<GW_REBOOT_CFM>;
    sendFrameAsync(frame: GW_SET_FACTORY_DEFAULT_REQ, timeout?: number): Promise<GW_SET_FACTORY_DEFAULT_CFM>;
    sendFrameAsync(frame: GW_GET_VERSION_REQ, timeout?: number): Promise<GW_GET_VERSION_CFM>;
    sendFrameAsync(frame: GW_GET_PROTOCOL_VERSION_REQ, timeout?: number): Promise<GW_GET_PROTOCOL_VERSION_CFM>;
    sendFrameAsync(frame: GW_GET_STATE_REQ, timeout?: number): Promise<GW_GET_STATE_CFM>;
    sendFrameAsync(frame: GW_LEAVE_LEARN_STATE_REQ, timeout?: number): Promise<GW_LEAVE_LEARN_STATE_CFM>;
    sendFrameAsync(frame: GW_GET_NETWORK_SETUP_REQ, timeout?: number): Promise<GW_GET_NETWORK_SETUP_CFM>;
    sendFrameAsync(frame: GW_SET_NETWORK_SETUP_REQ, timeout?: number): Promise<GW_SET_NETWORK_SETUP_CFM>;
    sendFrameAsync(frame: GW_CS_GET_SYSTEMTABLE_DATA_REQ, timeout?: number): Promise<GW_CS_GET_SYSTEMTABLE_DATA_CFM>;
    sendFrameAsync(frame: GW_CS_DISCOVER_NODES_REQ, timeout?: number): Promise<GW_CS_DISCOVER_NODES_CFM>;
    sendFrameAsync(frame: GW_CS_REMOVE_NODES_REQ, timeout?: number): Promise<GW_CS_REMOVE_NODES_CFM>;
    sendFrameAsync(frame: GW_CS_VIRGIN_STATE_REQ, timeout?: number): Promise<GW_CS_VIRGIN_STATE_CFM>;
    sendFrameAsync(frame: GW_CS_CONTROLLER_COPY_REQ, timeout?: number): Promise<GW_CS_CONTROLLER_COPY_CFM>;
    sendFrameAsync(frame: GW_CS_RECEIVE_KEY_REQ, timeout?: number): Promise<GW_CS_RECEIVE_KEY_CFM>;
    sendFrameAsync(frame: GW_CS_GENERATE_NEW_KEY_REQ, timeout?: number): Promise<GW_CS_GENERATE_NEW_KEY_CFM>;
    sendFrameAsync(frame: GW_CS_REPAIR_KEY_REQ, timeout?: number): Promise<GW_CS_REPAIR_KEY_CFM>;
    sendFrameAsync(frame: GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ, timeout?: number): Promise<GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM>;
    sendFrameAsync(frame: GW_GET_NODE_INFORMATION_REQ, timeout?: number): Promise<GW_GET_NODE_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_GET_ALL_NODES_INFORMATION_REQ, timeout?: number): Promise<GW_GET_ALL_NODES_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_SET_NODE_VARIATION_REQ, timeout?: number): Promise<GW_SET_NODE_VARIATION_CFM>;
    sendFrameAsync(frame: GW_SET_NODE_NAME_REQ, timeout?: number): Promise<GW_SET_NODE_NAME_CFM>;
    sendFrameAsync(frame: GW_SET_NODE_ORDER_AND_PLACEMENT_REQ, timeout?: number): Promise<GW_SET_NODE_ORDER_AND_PLACEMENT_CFM>;
    sendFrameAsync(frame: GW_GET_GROUP_INFORMATION_REQ, timeout?: number): Promise<GW_GET_GROUP_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_SET_GROUP_INFORMATION_REQ, timeout?: number): Promise<GW_SET_GROUP_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_DELETE_GROUP_REQ, timeout?: number): Promise<GW_DELETE_GROUP_CFM>;
    sendFrameAsync(frame: GW_NEW_GROUP_REQ, timeout?: number): Promise<GW_NEW_GROUP_CFM>;
    sendFrameAsync(frame: GW_GET_ALL_GROUPS_INFORMATION_REQ, timeout?: number): Promise<GW_GET_ALL_GROUPS_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_HOUSE_STATUS_MONITOR_ENABLE_REQ, timeout?: number): Promise<GW_HOUSE_STATUS_MONITOR_ENABLE_CFM>;
    sendFrameAsync(frame: GW_HOUSE_STATUS_MONITOR_DISABLE_REQ, timeout?: number): Promise<GW_HOUSE_STATUS_MONITOR_DISABLE_CFM>;
    sendFrameAsync(frame: GW_COMMAND_SEND_REQ, timeout?: number): Promise<GW_COMMAND_SEND_CFM>;
    sendFrameAsync(frame: GW_STATUS_REQUEST_REQ, timeout?: number): Promise<GW_STATUS_REQUEST_CFM>;
    sendFrameAsync(frame: GW_WINK_SEND_REQ, timeout?: number): Promise<GW_WINK_SEND_CFM>;
    sendFrameAsync(frame: GW_SET_LIMITATION_REQ, timeout?: number): Promise<GW_SET_LIMITATION_CFM>;
    sendFrameAsync(frame: GW_GET_LIMITATION_STATUS_REQ, timeout?: number): Promise<GW_GET_LIMITATION_STATUS_CFM>;
    sendFrameAsync(frame: GW_MODE_SEND_REQ, timeout?: number): Promise<GW_MODE_SEND_CFM>;
    sendFrameAsync(frame: GW_INITIALIZE_SCENE_REQ, timeout?: number): Promise<GW_INITIALIZE_SCENE_CFM>;
    sendFrameAsync(frame: GW_INITIALIZE_SCENE_CANCEL_REQ, timeout?: number): Promise<GW_INITIALIZE_SCENE_CANCEL_CFM>;
    sendFrameAsync(frame: GW_RECORD_SCENE_REQ, timeout?: number): Promise<GW_RECORD_SCENE_CFM>;
    sendFrameAsync(frame: GW_DELETE_SCENE_REQ, timeout?: number): Promise<GW_DELETE_SCENE_CFM>;
    sendFrameAsync(frame: GW_RENAME_SCENE_REQ, timeout?: number): Promise<GW_RENAME_SCENE_CFM>;
    sendFrameAsync(frame: GW_GET_SCENE_LIST_REQ, timeout?: number): Promise<GW_GET_SCENE_LIST_CFM>;
    sendFrameAsync(frame: GW_GET_SCENE_INFORMATION_REQ, timeout?: number): Promise<GW_GET_SCENE_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_ACTIVATE_SCENE_REQ, timeout?: number): Promise<GW_ACTIVATE_SCENE_CFM>;
    sendFrameAsync(frame: GW_STOP_SCENE_REQ, timeout?: number): Promise<GW_STOP_SCENE_CFM>;
    sendFrameAsync(frame: GW_ACTIVATE_PRODUCTGROUP_REQ, timeout?: number): Promise<GW_ACTIVATE_PRODUCTGROUP_CFM>;
    sendFrameAsync(frame: GW_GET_CONTACT_INPUT_LINK_LIST_REQ, timeout?: number): Promise<GW_GET_CONTACT_INPUT_LINK_LIST_CFM>;
    sendFrameAsync(frame: GW_SET_CONTACT_INPUT_LINK_REQ, timeout?: number): Promise<GW_SET_CONTACT_INPUT_LINK_CFM>;
    sendFrameAsync(frame: GW_REMOVE_CONTACT_INPUT_LINK_REQ, timeout?: number): Promise<GW_REMOVE_CONTACT_INPUT_LINK_CFM>;
    sendFrameAsync(frame: GW_GET_ACTIVATION_LOG_HEADER_REQ, timeout?: number): Promise<GW_GET_ACTIVATION_LOG_HEADER_CFM>;
    sendFrameAsync(frame: GW_CLEAR_ACTIVATION_LOG_REQ, timeout?: number): Promise<GW_CLEAR_ACTIVATION_LOG_CFM>;
    sendFrameAsync(frame: GW_GET_ACTIVATION_LOG_LINE_REQ, timeout?: number): Promise<GW_GET_ACTIVATION_LOG_LINE_CFM>;
    sendFrameAsync(frame: GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ, timeout?: number): Promise<GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_CFM>;
    sendFrameAsync(frame: GW_SET_UTC_REQ, timeout?: number): Promise<GW_SET_UTC_CFM>;
    sendFrameAsync(frame: GW_RTC_SET_TIME_ZONE_REQ, timeout?: number): Promise<GW_RTC_SET_TIME_ZONE_CFM>;
    sendFrameAsync(frame: GW_GET_LOCAL_TIME_REQ, timeout?: number): Promise<GW_GET_LOCAL_TIME_CFM>;
    sendFrameAsync(frame: GW_PASSWORD_ENTER_REQ, timeout?: number): Promise<GW_PASSWORD_ENTER_CFM>;
    sendFrameAsync(frame: GW_PASSWORD_CHANGE_REQ, timeout?: number): Promise<GW_PASSWORD_CHANGE_CFM>;
    sendFrameAsync(frame: IGW_FRAME_REQ, timeout?: number): Promise<IGW_FRAME_RCV>;
    /**
     * Add a handler to listen for confirmations and notification.
     * You can provide an optional filter to listen only to
     * specific events.
     *
     * @param {Listener<IGW_FRAME_RCV>} handler Callback functions that is called for an event
     * @param {GatewayCommand[]} [filter] Array of GatewayCommand entries you want to listen to. Optional.
     * @returns {Disposable} Returns a Disposable that you can call to remove the handler.
     */
    on(handler: Listener<IGW_FRAME_RCV>, filter?: GatewayCommand[]): Disposable;
    /**
     * Add a handler to listen for confirmations and notification.
     * You can provide an optional filter to listen only to
     * specific events.
     *
     * @param {Listener<IGW_FRAME_REQ>} handler Callback functions that is called for an event
     * @param {GatewayCommand[]} [filter] Array of GatewayCommand entries you want to listen to. Optional.
     * @returns {Disposable} Returns a Disposable that you can call to remove the handler.
     */
    onFrameSent(handler: Listener<IGW_FRAME_REQ>, filter?: GatewayCommand[]): Disposable;
    /**
     * Gets the underlying socket protocol handler.
     *
     * @type {KLF200SocketProtocol}
     */
    readonly KLF200SocketProtocol?: KLF200SocketProtocol;
}
/**
 * The Connection class is used to handle the communication with the Velux KLF interface.
 * It provides login and logout functionality and provides methods to run other commands
 * on the socket API.
 *
 * ```
 * const Connection = require('velux-api').Connection;
 *
 * let conn = new Connection('velux-klf-12ab');
 * conn.loginAsync('velux123')
 *     .then(() => {
 *         ... do some other stuff ...
 *         return conn.logoutAsync();
 *      })
 *     .catch((err) => {    // always close the connection
 *         return conn.logoutAsync().reject(err);
 *      });
 * ```
 *
 * @class Connection
 */
export declare class Connection implements IConnection {
    private sckt?;
    private klfProtocol?;
    readonly host: string;
    readonly CA: Buffer;
    readonly fingerprint: string;
    readonly connectionOptions?: ConnectionOptions;
    /**
     * Creates a new connection object that connect to the given host.
     * @param {string} host Host name or IP address of the KLF-200 interface.
     * @param {Buffer} [CA=ca] A buffer with a certificate of the certificate authority.
     *                         Currently, the interface uses a self-signed certificate
     *                         thus a certificate has to be provided for the CA.
     *                         This parameter is optional and in case the certificate
     *                         will be changed with subsequent firmware updates you can
     *                         provide the matching certificate with this parameter.
     * @param {string} [fingerprint=FINGERPRINT] The fingerprint of the certificate. This parameter is optional.
     */
    constructor(host: string, CA?: Buffer, fingerprint?: string);
    /**
     * Creates a new connection object that connect to the given host.
     * @param host Host name or IP address of the KLF-200 interface.
     * @param connectionOptions Options that will be provided to the connect method of the TLS socket.
     */
    constructor(host: string, connectionOptions: ConnectionOptions);
    /**
     * Gets the [[KLF200SocketProtocol]] object used by this connection.
     * This property has a value after calling [[loginAsync]], only.
     *
     * @readonly
     */
    get KLF200SocketProtocol(): KLF200SocketProtocol | undefined;
    /**
     * This method implements the login process without timeout.
     * The [[loginAsync]] function wraps this into a timed promise.
     *
     * @private
     * @param {string} password The password needed for login. The factory default password is velux123.
     * @returns {Promise<void>} Returns a promise that resolves to true on success or rejects with the errors.
     */
    private _loginAsync;
    /**
     * Logs in to the KLF interface by sending the GW_PASSWORD_ENTER_REQ.
     *
     * @param {string} password The password needed for login. The factory default password is velux123.
     * @param {number} [timeout=60] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<void>} Returns a promise that resolves to true on success or rejects with the errors.
     */
    loginAsync(password: string, timeout?: number): Promise<void>;
    /**
     * Logs out from the KLF interface and closes the socket.
     *
     * @param {number} [timeout=10] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<void>} Returns a promise that resolves to true on successful logout or rejects with the errors.
     */
    logoutAsync(timeout?: number): Promise<void>;
    /**
     * Sends a request frame to the KLF interface.
     *
     * @param {IGW_FRAME_REQ} frame The frame that should be sent to the KLF interface.
     * @param {number} [timeout=10] A timeout in seconds. After the timeout the returned promise will be rejected.
     * @returns {Promise<IGW_FRAME_RCV>} Returns a promise with the corresponding confirmation message as value.
     *                                   In case of an error frame the promise will be rejected with the error number.
     *                                   If the request frame is a command (with a SessionID) than the promise will be
     *                                   resolved by the corresponding confirmation frame with a matching session ID.
     */
    sendFrameAsync(frame: GW_REBOOT_REQ, timeout?: number): Promise<GW_REBOOT_CFM>;
    sendFrameAsync(frame: GW_SET_FACTORY_DEFAULT_REQ, timeout?: number): Promise<GW_SET_FACTORY_DEFAULT_CFM>;
    sendFrameAsync(frame: GW_GET_VERSION_REQ, timeout?: number): Promise<GW_GET_VERSION_CFM>;
    sendFrameAsync(frame: GW_GET_PROTOCOL_VERSION_REQ, timeout?: number): Promise<GW_GET_PROTOCOL_VERSION_CFM>;
    sendFrameAsync(frame: GW_GET_STATE_REQ, timeout?: number): Promise<GW_GET_STATE_CFM>;
    sendFrameAsync(frame: GW_LEAVE_LEARN_STATE_REQ, timeout?: number): Promise<GW_LEAVE_LEARN_STATE_CFM>;
    sendFrameAsync(frame: GW_GET_NETWORK_SETUP_REQ, timeout?: number): Promise<GW_GET_NETWORK_SETUP_CFM>;
    sendFrameAsync(frame: GW_SET_NETWORK_SETUP_REQ, timeout?: number): Promise<GW_SET_NETWORK_SETUP_CFM>;
    sendFrameAsync(frame: GW_CS_GET_SYSTEMTABLE_DATA_REQ, timeout?: number): Promise<GW_CS_GET_SYSTEMTABLE_DATA_CFM>;
    sendFrameAsync(frame: GW_CS_DISCOVER_NODES_REQ, timeout?: number): Promise<GW_CS_DISCOVER_NODES_CFM>;
    sendFrameAsync(frame: GW_CS_REMOVE_NODES_REQ, timeout?: number): Promise<GW_CS_REMOVE_NODES_CFM>;
    sendFrameAsync(frame: GW_CS_VIRGIN_STATE_REQ, timeout?: number): Promise<GW_CS_VIRGIN_STATE_CFM>;
    sendFrameAsync(frame: GW_CS_CONTROLLER_COPY_REQ, timeout?: number): Promise<GW_CS_CONTROLLER_COPY_CFM>;
    sendFrameAsync(frame: GW_CS_RECEIVE_KEY_REQ, timeout?: number): Promise<GW_CS_RECEIVE_KEY_CFM>;
    sendFrameAsync(frame: GW_CS_GENERATE_NEW_KEY_REQ, timeout?: number): Promise<GW_CS_GENERATE_NEW_KEY_CFM>;
    sendFrameAsync(frame: GW_CS_REPAIR_KEY_REQ, timeout?: number): Promise<GW_CS_REPAIR_KEY_CFM>;
    sendFrameAsync(frame: GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ, timeout?: number): Promise<GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM>;
    sendFrameAsync(frame: GW_GET_NODE_INFORMATION_REQ, timeout?: number): Promise<GW_GET_NODE_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_GET_ALL_NODES_INFORMATION_REQ, timeout?: number): Promise<GW_GET_ALL_NODES_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_SET_NODE_VARIATION_REQ, timeout?: number): Promise<GW_SET_NODE_VARIATION_CFM>;
    sendFrameAsync(frame: GW_SET_NODE_NAME_REQ, timeout?: number): Promise<GW_SET_NODE_NAME_CFM>;
    sendFrameAsync(frame: GW_SET_NODE_ORDER_AND_PLACEMENT_REQ, timeout?: number): Promise<GW_SET_NODE_ORDER_AND_PLACEMENT_CFM>;
    sendFrameAsync(frame: GW_GET_GROUP_INFORMATION_REQ, timeout?: number): Promise<GW_GET_GROUP_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_SET_GROUP_INFORMATION_REQ, timeout?: number): Promise<GW_SET_GROUP_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_DELETE_GROUP_REQ, timeout?: number): Promise<GW_DELETE_GROUP_CFM>;
    sendFrameAsync(frame: GW_NEW_GROUP_REQ, timeout?: number): Promise<GW_NEW_GROUP_CFM>;
    sendFrameAsync(frame: GW_GET_ALL_GROUPS_INFORMATION_REQ, timeout?: number): Promise<GW_GET_ALL_GROUPS_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_HOUSE_STATUS_MONITOR_ENABLE_REQ, timeout?: number): Promise<GW_HOUSE_STATUS_MONITOR_ENABLE_CFM>;
    sendFrameAsync(frame: GW_HOUSE_STATUS_MONITOR_DISABLE_REQ, timeout?: number): Promise<GW_HOUSE_STATUS_MONITOR_DISABLE_CFM>;
    sendFrameAsync(frame: GW_COMMAND_SEND_REQ, timeout?: number): Promise<GW_COMMAND_SEND_CFM>;
    sendFrameAsync(frame: GW_STATUS_REQUEST_REQ, timeout?: number): Promise<GW_STATUS_REQUEST_CFM>;
    sendFrameAsync(frame: GW_WINK_SEND_REQ, timeout?: number): Promise<GW_WINK_SEND_CFM>;
    sendFrameAsync(frame: GW_SET_LIMITATION_REQ, timeout?: number): Promise<GW_SET_LIMITATION_CFM>;
    sendFrameAsync(frame: GW_GET_LIMITATION_STATUS_REQ, timeout?: number): Promise<GW_GET_LIMITATION_STATUS_CFM>;
    sendFrameAsync(frame: GW_MODE_SEND_REQ, timeout?: number): Promise<GW_MODE_SEND_CFM>;
    sendFrameAsync(frame: GW_INITIALIZE_SCENE_REQ, timeout?: number): Promise<GW_INITIALIZE_SCENE_CFM>;
    sendFrameAsync(frame: GW_INITIALIZE_SCENE_CANCEL_REQ, timeout?: number): Promise<GW_INITIALIZE_SCENE_CANCEL_CFM>;
    sendFrameAsync(frame: GW_RECORD_SCENE_REQ, timeout?: number): Promise<GW_RECORD_SCENE_CFM>;
    sendFrameAsync(frame: GW_DELETE_SCENE_REQ, timeout?: number): Promise<GW_DELETE_SCENE_CFM>;
    sendFrameAsync(frame: GW_RENAME_SCENE_REQ, timeout?: number): Promise<GW_RENAME_SCENE_CFM>;
    sendFrameAsync(frame: GW_GET_SCENE_LIST_REQ, timeout?: number): Promise<GW_GET_SCENE_LIST_CFM>;
    sendFrameAsync(frame: GW_GET_SCENE_INFORMATION_REQ, timeout?: number): Promise<GW_GET_SCENE_INFORMATION_CFM>;
    sendFrameAsync(frame: GW_ACTIVATE_SCENE_REQ, timeout?: number): Promise<GW_ACTIVATE_SCENE_CFM>;
    sendFrameAsync(frame: GW_STOP_SCENE_REQ, timeout?: number): Promise<GW_STOP_SCENE_CFM>;
    sendFrameAsync(frame: GW_ACTIVATE_PRODUCTGROUP_REQ, timeout?: number): Promise<GW_ACTIVATE_PRODUCTGROUP_CFM>;
    sendFrameAsync(frame: GW_GET_CONTACT_INPUT_LINK_LIST_REQ, timeout?: number): Promise<GW_GET_CONTACT_INPUT_LINK_LIST_CFM>;
    sendFrameAsync(frame: GW_SET_CONTACT_INPUT_LINK_REQ, timeout?: number): Promise<GW_SET_CONTACT_INPUT_LINK_CFM>;
    sendFrameAsync(frame: GW_REMOVE_CONTACT_INPUT_LINK_REQ, timeout?: number): Promise<GW_REMOVE_CONTACT_INPUT_LINK_CFM>;
    sendFrameAsync(frame: GW_GET_ACTIVATION_LOG_HEADER_REQ, timeout?: number): Promise<GW_GET_ACTIVATION_LOG_HEADER_CFM>;
    sendFrameAsync(frame: GW_CLEAR_ACTIVATION_LOG_REQ, timeout?: number): Promise<GW_CLEAR_ACTIVATION_LOG_CFM>;
    sendFrameAsync(frame: GW_GET_ACTIVATION_LOG_LINE_REQ, timeout?: number): Promise<GW_GET_ACTIVATION_LOG_LINE_CFM>;
    sendFrameAsync(frame: GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ, timeout?: number): Promise<GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_CFM>;
    sendFrameAsync(frame: GW_SET_UTC_REQ, timeout?: number): Promise<GW_SET_UTC_CFM>;
    sendFrameAsync(frame: GW_RTC_SET_TIME_ZONE_REQ, timeout?: number): Promise<GW_RTC_SET_TIME_ZONE_CFM>;
    sendFrameAsync(frame: GW_GET_LOCAL_TIME_REQ, timeout?: number): Promise<GW_GET_LOCAL_TIME_CFM>;
    sendFrameAsync(frame: GW_PASSWORD_ENTER_REQ, timeout?: number): Promise<GW_PASSWORD_ENTER_CFM>;
    sendFrameAsync(frame: GW_PASSWORD_CHANGE_REQ, timeout?: number): Promise<GW_PASSWORD_CHANGE_CFM>;
    /**
     * Add a handler to listen for confirmations and notification.
     * You can provide an optional filter to listen only to
     * specific events.
     *
     * @param {Listener<IGW_FRAME_RCV>} handler Callback functions that is called for an event
     * @param {GatewayCommand[]} [filter] Array of GatewayCommand entries you want to listen to. Optional.
     * @returns {Disposable} Returns a Disposable that you can call to remove the handler.
     */
    on(handler: Listener<IGW_FRAME_RCV>, filter?: GatewayCommand[]): Disposable;
    private _onFrameSent;
    /**
     * Add a handler to listen for sent frames.
     * You can provide an optional filter to listen only to
     * specific events.
     *
     * @param {Listener<IGW_FRAME_REQ>} handler Callback functions that is called for an event
     * @param {GatewayCommand[]} [filter] Array of GatewayCommand entries you want to listen to. Optional.
     * @returns {Disposable} Returns a Disposable that you can call to remove the handler.
     */
    onFrameSent(handler: Listener<IGW_FRAME_REQ>, filter?: GatewayCommand[]): Disposable;
    private notifyFrameSent;
    private keepAliveTimer?;
    private keepAliveInterval;
    /**
     * Start a keep-alive timer to send a message
     * at least every [[interval]] minutes to the interface.
     * The KLF-200 interface will close the connection
     * after 15 minutes of inactivity.
     *
     * @param {number} [interval=600000] Keep-alive interval in minutes. Defaults to 10 min.
     */
    startKeepAlive(interval?: number): void;
    /**
     * Stops the keep-alive timer.
     * If not timer is set nothing happens.
     *
     */
    stopKeepAlive(): void;
    /**
     * Sends a keep-alive message to the interface
     * to keep the socket connection open.
     *
     * @private
     * @returns {Promise<void>} Resolves if successful, otherwise reject
     */
    private sendKeepAlive;
    /**
     * Shifts the keep-alive timer to restart its counter.
     * If no keep-alive timer is active nothing happens.
     *
     * @private
     */
    private shiftKeepAlive;
    private initSocketAsync;
    private socketClosedEventHandler;
    private checkServerIdentity;
}
