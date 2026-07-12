import { GatewayState, GatewaySubState } from "./KLF200-API/GW_GET_STATE_CFM.js";
import { SoftwareVersion } from "./KLF200-API/GW_GET_VERSION_CFM.js";
import { IConnection } from "./connection.js";
/**
 * Provides basic functions to control general functions of the KLF interface.
 *
 * @class Gateway
 */
export declare class Gateway {
    readonly connection: IConnection;
    /**
     *Creates an instance of Gateway.
     * @param {IConnection} connection The connection that will be used to send and receive commands.
     */
    constructor(connection: IConnection);
    /**
     * Changes the password of the KLF interface.
     *
     * @param {string} oldPassword Provide the old password.
     * @param {string} newPassword Provide a new password. The password must not exceed 32 characters.
     * @returns {Promise<boolean>} Returns a promise that fulfills to true if the password has been changed successfully.
     */
    changePasswordAsync(oldPassword: string, newPassword: string): Promise<boolean>;
    /**
     * Reads the version information from the KLF interface, e.g. the firmware software version number
     *
     * @returns {Promise<{SoftwareVersion: SoftwareVersion, HardwareVersion: number, ProductGroup: number, ProductType: number}>}
     *          Returns an object with the several version numbers.
     */
    getVersionAsync(): Promise<{
        SoftwareVersion: SoftwareVersion;
        HardwareVersion: number;
        ProductGroup: number;
        ProductType: number;
    }>;
    /**
     * Reads the protocol version information from the KLF interface.
     *
     * @returns {Promise<{MajorVersion: number, MinorVersion: number}>}
     *          Returns an object with major and minor version number of the protocol.
     */
    getProtocolVersionAsync(): Promise<{
        MajorVersion: number;
        MinorVersion: number;
    }>;
    /**
     * Gets the current state of the gateway.
     *
     * @returns {Promise<{GatewayState: GatewayState, SubState: GatewaySubState}>}
     *          Returns the current state and sub-state of the gateway.
     */
    getStateAsync(): Promise<{
        GatewayState: GatewayState;
        SubState: GatewaySubState;
    }>;
    /**
     * Sets the internal real time clock of the interface.
     *
     * @param {Date} [utcTimestamp=new Date()] The new date that should be set. Default is the current date/time.
     * @returns {Promise<void>}
     */
    setUTCDateTimeAsync(utcTimestamp?: Date): Promise<void>;
    /**
     * Sets the time zone of the interface.
     *
     * @param {string} timeZone A string describing the time zone. See the KLF API documentation for details. Example: :GMT+1:GMT+2:0060:(1994)040102-0:110102-0
     * @returns {Promise<void>}
     */
    setTimeZoneAsync(timeZone: string): Promise<void>;
    /**
     * Reboots the KLF interface. After reboot the socket has to be reconnected.
     *
     * @returns {Promise<void>}
     */
    rebootAsync(): Promise<void>;
    /**
     * Resets the KLF interface to the factory default settings. After 30 seconds you can reconnect.
     *
     * @returns {Promise<void>}
     */
    factoryResetAsync(): Promise<void>;
    /**
     * If the gateway has been put into learn state by pressing the learn button
     * then leaveLearnStateAsync can be called to leave the learn state.
     *
     * @returns {Promise<void>}
     */
    leaveLearnStateAsync(): Promise<void>;
    /**
     * Get the network settings
     *
     * @returns {Promise<{IPAddress: string, Mask: string, DefaultGateway: string, DHCP: boolean}>}
     *          Returns an object with IP address, mask and default gateway and if DHCP is used.
     */
    getNetworkSettingsAsync(): Promise<{
        IPAddress: string;
        Mask: string;
        DefaultGateway: string;
        DHCP: boolean;
    }>;
    /**
     * Set the KLF interface to use DHCP.
     *
     * @param {true} DHCP Set DHCP to true to use DHCP.
     * @returns {Promise<void>}
     */
    setNetworkSettingsAsync(DHCP: true): Promise<void>;
    /**
     * Set the KLF interface to use a fixed IP address.
     *
     * @param {false} DHCP Set DHCP to false to use a fixed IP address.
     * @param {string} IPAddress The IP address for the KLF interface.
     * @param {string} Mask The IP mask for the network settings.
     * @param {string} DefaultGateway The default gateway of your gateway.
     * @returns {Promise<void>}
     */
    setNetworkSettingsAsync(DHCP: false, IPAddress: string, Mask: string, DefaultGateway: string): Promise<void>;
    /**
     * Enables the house status monitor.
     *
     * With the house status monitor enabled you can get
     * notifications of changes of products.
     *
     * @returns {Promise<void>}
     */
    enableHouseStatusMonitorAsync(): Promise<void>;
    /**
     * Disables the house status monitor.
     *
     * After disabling the house status monitor you will
     * no longer get notifications of changes.
     *
     * @returns {Promise<void>}
     */
    disableHouseStatusMonitorAsync(): Promise<void>;
}
