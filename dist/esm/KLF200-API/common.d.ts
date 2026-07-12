export declare const KLF200_PORT = 51200;
export declare enum GatewayCommand {
    GW_ERROR_NTF = 0,// Provides information on what triggered the error.
    GW_REBOOT_REQ = 1,// Request gateway to reboot.
    GW_REBOOT_CFM = 2,// Acknowledge to GW_REBOOT_REQ command.
    GW_SET_FACTORY_DEFAULT_REQ = 3,// Request gateway to clear system table, scene table and set Ethernet settings to factory default. Gateway will reboot.
    GW_SET_FACTORY_DEFAULT_CFM = 4,// Acknowledge to GW_SET_FACTORY_DEFAULT_REQ command.
    GW_GET_VERSION_REQ = 8,// Request version information.
    GW_GET_VERSION_CFM = 9,// Acknowledge to GW_GET_VERSION_REQ command.
    GW_GET_PROTOCOL_VERSION_REQ = 10,// Request KLF 200 API protocol version.
    GW_GET_PROTOCOL_VERSION_CFM = 11,// Acknowledge to GW_GET_PROTOCOL_VERSION_REQ command.
    GW_GET_STATE_REQ = 12,// Request the state of the gateway
    GW_GET_STATE_CFM = 13,// Acknowledge to GW_GET_STATE_REQ command.
    GW_LEAVE_LEARN_STATE_REQ = 14,// Request gateway to leave learn state.
    GW_LEAVE_LEARN_STATE_CFM = 15,// Acknowledge to GW_LEAVE_LEARN_STATE_REQ command.
    GW_GET_NETWORK_SETUP_REQ = 224,// Request network parameters.
    GW_GET_NETWORK_SETUP_CFM = 225,// Acknowledge to GW_GET_NETWORK_SETUP_REQ.
    GW_SET_NETWORK_SETUP_REQ = 226,// Set network parameters.
    GW_SET_NETWORK_SETUP_CFM = 227,// Acknowledge to GW_SET_NETWORK_SETUP_REQ.
    GW_CS_GET_SYSTEMTABLE_DATA_REQ = 256,// Request a list of nodes in the gateways system table.
    GW_CS_GET_SYSTEMTABLE_DATA_CFM = 257,// Acknowledge to GW_CS_GET_SYSTEMTABLE_DATA_REQ
    GW_CS_GET_SYSTEMTABLE_DATA_NTF = 258,// Acknowledge to GW_CS_GET_SYSTEM_TABLE_DATA_REQList of nodes in the gateways systemtable.
    GW_CS_DISCOVER_NODES_REQ = 259,// Start CS DiscoverNodes macro in KLF200.
    GW_CS_DISCOVER_NODES_CFM = 260,// Acknowledge to GW_CS_DISCOVER_NODES_REQ command.
    GW_CS_DISCOVER_NODES_NTF = 261,// Acknowledge to GW_CS_DISCOVER_NODES_REQ command.
    GW_CS_REMOVE_NODES_REQ = 262,// Remove one or more nodes in the systemtable.
    GW_CS_REMOVE_NODES_CFM = 263,// Acknowledge to GW_CS_REMOVE_NODES_REQ.
    GW_CS_VIRGIN_STATE_REQ = 264,// Clear systemtable and delete system key.
    GW_CS_VIRGIN_STATE_CFM = 265,// Acknowledge to GW_CS_VIRGIN_STATE_REQ.
    GW_CS_CONTROLLER_COPY_REQ = 266,// Setup KLF200 to get or give a system to or from another io-homecontrol® remote control. By a system means all nodes in the systemtable and the system key.
    GW_CS_CONTROLLER_COPY_CFM = 267,// Acknowledge to GW_CS_CONTROLLER_COPY_REQ.
    GW_CS_CONTROLLER_COPY_NTF = 268,// Acknowledge to GW_CS_CONTROLLER_COPY_REQ.
    GW_CS_CONTROLLER_COPY_CANCEL_NTF = 269,// Cancellation of system copy to other controllers.
    GW_CS_RECEIVE_KEY_REQ = 270,// Receive system key from another controller.
    GW_CS_RECEIVE_KEY_CFM = 271,// Acknowledge to GW_CS_RECEIVE_KEY_REQ.
    GW_CS_RECEIVE_KEY_NTF = 272,// Acknowledge to GW_CS_RECEIVE_KEY_REQ with status.
    GW_CS_PGC_JOB_NTF = 273,// Information on Product Generic Configuration job initiated by press on PGC button.
    GW_CS_SYSTEM_TABLE_UPDATE_NTF = 274,// Broadcasted to all clients and gives information about added and removed actuator nodes in system table.
    GW_CS_GENERATE_NEW_KEY_REQ = 275,// Generate new system key and update actuators in systemtable.
    GW_CS_GENERATE_NEW_KEY_CFM = 276,// Acknowledge to GW_CS_GENERATE_NEW_KEY_REQ.
    GW_CS_GENERATE_NEW_KEY_NTF = 277,// Acknowledge to GW_CS_GENERATE_NEW_KEY_REQ with status.
    GW_CS_REPAIR_KEY_REQ = 278,// Update key in actuators holding an old key.
    GW_CS_REPAIR_KEY_CFM = 279,// Acknowledge to GW_CS_REPAIR_KEY_REQ.
    GW_CS_REPAIR_KEY_NTF = 280,// Acknowledge to GW_CS_REPAIR_KEY_REQ with status.
    GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ = 281,// Request one or more actuator to open for configuration.
    GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM = 282,// Acknowledge to GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ.
    GW_GET_NODE_INFORMATION_REQ = 512,// Request extended information of one specific actuator node.
    GW_GET_NODE_INFORMATION_CFM = 513,// Acknowledge to GW_GET_NODE_INFORMATION_REQ.
    GW_GET_NODE_INFORMATION_NTF = 528,// Acknowledge to GW_GET_NODE_INFORMATION_REQ.
    GW_GET_ALL_NODES_INFORMATION_REQ = 514,// Request extended information of all nodes.
    GW_GET_ALL_NODES_INFORMATION_CFM = 515,// Acknowledge to GW_GET_ALL_NODES_INFORMATION_REQ
    GW_GET_ALL_NODES_INFORMATION_NTF = 516,// Acknowledge to GW_GET_ALL_NODES_INFORMATION_REQ. Holds node information
    GW_GET_ALL_NODES_INFORMATION_FINISHED_NTF = 517,// Acknowledge to GW_GET_ALL_NODES_INFORMATION_REQ. No more nodes.
    GW_SET_NODE_VARIATION_REQ = 518,// Set node variation.
    GW_SET_NODE_VARIATION_CFM = 519,// Acknowledge to GW_SET_NODE_VARIATION_REQ.
    GW_SET_NODE_NAME_REQ = 520,// Set node name.
    GW_SET_NODE_NAME_CFM = 521,// Acknowledge to GW_SET_NODE_NAME_REQ.
    GW_SET_NODE_VELOCITY_REQ = 522,// Set node velocity.
    GW_SET_NODE_VELOCITY_CFM = 523,// Acknowledge to GW_SET_NODE_VELOCITY_REQ.
    GW_NODE_INFORMATION_CHANGED_NTF = 524,// Information has been updated.
    GW_NODE_STATE_POSITION_CHANGED_NTF = 529,// Information has been updated.
    GW_SET_NODE_ORDER_AND_PLACEMENT_REQ = 525,// Set search order and room placement.
    GW_SET_NODE_ORDER_AND_PLACEMENT_CFM = 526,// Acknowledge to GW_SET_NODE_ORDER_AND_PLACEMENT_REQ.
    GW_GET_GROUP_INFORMATION_REQ = 544,// Request information about all defined groups.
    GW_GET_GROUP_INFORMATION_CFM = 545,// Acknowledge to GW_GET_GROUP_INFORMATION_REQ.
    GW_GET_GROUP_INFORMATION_NTF = 560,// Acknowledge to GW_GET_NODE_INFORMATION_REQ.
    GW_SET_GROUP_INFORMATION_REQ = 546,// Change an existing group.
    GW_SET_GROUP_INFORMATION_CFM = 547,// Acknowledge to GW_SET_GROUP_INFORMATION_REQ.
    GW_GROUP_INFORMATION_CHANGED_NTF = 548,// Broadcast to all, about group information of a group has been changed.
    GW_DELETE_GROUP_REQ = 549,// Delete a group.
    GW_DELETE_GROUP_CFM = 550,// Acknowledge to GW_DELETE_GROUP_INFORMATION_REQ.
    GW_NEW_GROUP_REQ = 551,// Request new group to be created.
    GW_NEW_GROUP_CFM = 552,//
    GW_GET_ALL_GROUPS_INFORMATION_REQ = 553,// Request information about all defined groups.
    GW_GET_ALL_GROUPS_INFORMATION_CFM = 554,// Acknowledge to GW_GET_ALL_GROUPS_INFORMATION_REQ.
    GW_GET_ALL_GROUPS_INFORMATION_NTF = 555,// Acknowledge to GW_GET_ALL_GROUPS_INFORMATION_REQ.
    GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF = 556,// Acknowledge to GW_GET_ALL_GROUPS_INFORMATION_REQ.
    GW_GROUP_DELETED_NTF = 557,// GW_GROUP_DELETED_NTF is broadcasted to all, when a group has been removed.
    GW_HOUSE_STATUS_MONITOR_ENABLE_REQ = 576,// Enable house status monitor.
    GW_HOUSE_STATUS_MONITOR_ENABLE_CFM = 577,// Acknowledge to GW_HOUSE_STATUS_MONITOR_ENABLE_REQ.
    GW_HOUSE_STATUS_MONITOR_DISABLE_REQ = 578,// Disable house status monitor.
    GW_HOUSE_STATUS_MONITOR_DISABLE_CFM = 579,// Acknowledge to GW_HOUSE_STATUS_MONITOR_DISABLE_REQ.
    GW_COMMAND_SEND_REQ = 768,// Send activating command direct to one or more io-homecontrol® nodes.
    GW_COMMAND_SEND_CFM = 769,// Acknowledge to GW_COMMAND_SEND_REQ.
    GW_COMMAND_RUN_STATUS_NTF = 770,// Gives run status for io-homecontrol® node.
    GW_COMMAND_REMAINING_TIME_NTF = 771,// Gives remaining time before io-homecontrol® node enter target position.
    GW_SESSION_FINISHED_NTF = 772,// Command send, Status request, Wink, Mode or Stop session is finished.
    GW_STATUS_REQUEST_REQ = 773,// Get status request from one or more io-homecontrol® nodes.
    GW_STATUS_REQUEST_CFM = 774,// Acknowledge to GW_STATUS_REQUEST_REQ.
    GW_STATUS_REQUEST_NTF = 775,// Acknowledge to GW_STATUS_REQUEST_REQ. Status request from one or more io-homecontrol® nodes.
    GW_WINK_SEND_REQ = 776,// Request from one or more io-homecontrol® nodes to Wink.
    GW_WINK_SEND_CFM = 777,// Acknowledge to GW_WINK_SEND_REQ
    GW_WINK_SEND_NTF = 778,// Status info for performed wink request.
    GW_SET_LIMITATION_REQ = 784,// Set a parameter limitation in an actuator.
    GW_SET_LIMITATION_CFM = 785,// Acknowledge to GW_SET_LIMITATION_REQ.
    GW_GET_LIMITATION_STATUS_REQ = 786,// Get parameter limitation in an actuator.
    GW_GET_LIMITATION_STATUS_CFM = 787,// Acknowledge to GW_GET_LIMITATION_STATUS_REQ.
    GW_LIMITATION_STATUS_NTF = 788,// Hold information about limitation.
    GW_MODE_SEND_REQ = 800,// Send Activate Mode to one or more io-homecontrol® nodes.
    GW_MODE_SEND_CFM = 801,// Acknowledge to GW_MODE_SEND_REQ
    GW_MODE_SEND_NTF = 802,// Notify with Mode activation info.
    GW_INITIALIZE_SCENE_REQ = 1024,// Prepare gateway to record a scene.
    GW_INITIALIZE_SCENE_CFM = 1025,// Acknowledge to GW_INITIALIZE_SCENE_REQ.
    GW_INITIALIZE_SCENE_NTF = 1026,// Acknowledge to GW_INITIALIZE_SCENE_REQ.
    GW_INITIALIZE_SCENE_CANCEL_REQ = 1027,// Cancel record scene process.
    GW_INITIALIZE_SCENE_CANCEL_CFM = 1028,// Acknowledge to GW_INITIALIZE_SCENE_CANCEL_REQ command.
    GW_RECORD_SCENE_REQ = 1029,// Store actuator positions changes since GW_INITIALIZE_SCENE, as a scene.
    GW_RECORD_SCENE_CFM = 1030,// Acknowledge to GW_RECORD_SCENE_REQ.
    GW_RECORD_SCENE_NTF = 1031,// Acknowledge to GW_RECORD_SCENE_REQ.
    GW_DELETE_SCENE_REQ = 1032,// Delete a recorded scene.
    GW_DELETE_SCENE_CFM = 1033,// Acknowledge to GW_DELETE_SCENE_REQ.
    GW_RENAME_SCENE_REQ = 1034,// Request a scene to be renamed.
    GW_RENAME_SCENE_CFM = 1035,// Acknowledge to GW_RENAME_SCENE_REQ.
    GW_GET_SCENE_LIST_REQ = 1036,// Request a list of scenes.
    GW_GET_SCENE_LIST_CFM = 1037,// Acknowledge to GW_GET_SCENE_LIST.
    GW_GET_SCENE_LIST_NTF = 1038,// Acknowledge to GW_GET_SCENE_LIST.
    GW_GET_SCENE_INFORMATION_REQ = 1039,// Request extended information for one given scene.
    GW_GET_SCENE_INFORMATION_CFM = 1040,// Acknowledge to GW_GET_SCENE_INFOAMATION_REQ.
    GW_GET_SCENE_INFORMATION_NTF = 1041,// Acknowledge to GW_GET_SCENE_INFOAMATION_REQ.
    GW_ACTIVATE_SCENE_REQ = 1042,// Request gateway to enter a scene.
    GW_ACTIVATE_SCENE_CFM = 1043,// Acknowledge to GW_ACTIVATE_SCENE_REQ.
    GW_STOP_SCENE_REQ = 1045,// Request all nodes in a given scene to stop at their current position.
    GW_STOP_SCENE_CFM = 1046,// Acknowledge to GW_STOP_SCENE_REQ.
    GW_SCENE_INFORMATION_CHANGED_NTF = 1049,// A scene has either been changed or removed.
    GW_ACTIVATE_PRODUCTGROUP_REQ = 1095,// Activate a product group in a given direction.
    GW_ACTIVATE_PRODUCTGROUP_CFM = 1096,// Acknowledge to GW_ACTIVATE_PRODUCTGROUP_REQ.
    GW_ACTIVATE_PRODUCTGROUP_NTF = 1097,// Acknowledge to GW_ACTIVATE_PRODUCTGROUP_REQ.
    GW_GET_CONTACT_INPUT_LINK_LIST_REQ = 1120,// Get list of assignments to all Contact Input to scene or product group.
    GW_GET_CONTACT_INPUT_LINK_LIST_CFM = 1121,// Acknowledge to GW_GET_CONTACT_INPUT_LINK_LIST_REQ.
    GW_SET_CONTACT_INPUT_LINK_REQ = 1122,// Set a link from a Contact Input to a scene or product group.
    GW_SET_CONTACT_INPUT_LINK_CFM = 1123,// Acknowledge to GW_SET_CONTACT_INPUT_LINK_REQ.
    GW_REMOVE_CONTACT_INPUT_LINK_REQ = 1124,// Remove a link from a Contact Input to a scene.
    GW_REMOVE_CONTACT_INPUT_LINK_CFM = 1125,// Acknowledge to GW_REMOVE_CONTACT_INPUT_LINK_REQ.
    GW_GET_ACTIVATION_LOG_HEADER_REQ = 1280,// Request header from activation log.
    GW_GET_ACTIVATION_LOG_HEADER_CFM = 1281,// Confirm header from activation log.
    GW_CLEAR_ACTIVATION_LOG_REQ = 1282,// Request clear all data in activation log.
    GW_CLEAR_ACTIVATION_LOG_CFM = 1283,// Confirm clear all data in activation log.
    GW_GET_ACTIVATION_LOG_LINE_REQ = 1284,// Request line from activation log.
    GW_GET_ACTIVATION_LOG_LINE_CFM = 1285,// Confirm line from activation log.
    GW_ACTIVATION_LOG_UPDATED_NTF = 1286,// Confirm line from activation log.
    GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ = 1287,// Request lines from activation log.
    GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_NTF = 1288,// Error log data from activation log.
    GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_CFM = 1289,// Confirm lines from activation log.
    GW_SET_UTC_REQ = 8192,// Request to set UTC time.
    GW_SET_UTC_CFM = 8193,// Acknowledge to GW_SET_UTC_REQ.
    GW_RTC_SET_TIME_ZONE_REQ = 8194,// Set time zone and daylight savings rules.
    GW_RTC_SET_TIME_ZONE_CFM = 8195,// Acknowledge to GW_RTC_SET_TIME_ZONE_REQ.
    GW_GET_LOCAL_TIME_REQ = 8196,// Request the local time based on current time zone and daylight savings rules.
    GW_GET_LOCAL_TIME_CFM = 8197,// Acknowledge to GW_RTC_SET_TIME_ZONE_REQ.
    GW_PASSWORD_ENTER_REQ = 12288,// Enter password to authenticate request
    GW_PASSWORD_ENTER_CFM = 12289,// Acknowledge to GW_PASSWORD_ENTER_REQ
    GW_PASSWORD_CHANGE_REQ = 12290,// Request password change.
    GW_PASSWORD_CHANGE_CFM = 12291,// Acknowledge to GW_PASSWORD_CHANGE_REQ.
    GW_PASSWORD_CHANGE_NTF = 12292
}
export type GatewayCommand_Request = GatewayCommand.GW_REBOOT_REQ | GatewayCommand.GW_SET_FACTORY_DEFAULT_REQ | GatewayCommand.GW_GET_VERSION_REQ | GatewayCommand.GW_GET_PROTOCOL_VERSION_REQ | GatewayCommand.GW_GET_STATE_REQ | GatewayCommand.GW_LEAVE_LEARN_STATE_REQ | GatewayCommand.GW_GET_NETWORK_SETUP_REQ | GatewayCommand.GW_SET_NETWORK_SETUP_REQ | GatewayCommand.GW_CS_GET_SYSTEMTABLE_DATA_REQ | GatewayCommand.GW_CS_DISCOVER_NODES_REQ | GatewayCommand.GW_CS_REMOVE_NODES_REQ | GatewayCommand.GW_CS_VIRGIN_STATE_REQ | GatewayCommand.GW_CS_CONTROLLER_COPY_REQ | GatewayCommand.GW_CS_RECEIVE_KEY_REQ | GatewayCommand.GW_CS_GENERATE_NEW_KEY_REQ | GatewayCommand.GW_CS_REPAIR_KEY_REQ | GatewayCommand.GW_CS_ACTIVATE_CONFIGURATION_MODE_REQ | GatewayCommand.GW_GET_NODE_INFORMATION_REQ | GatewayCommand.GW_GET_ALL_NODES_INFORMATION_REQ | GatewayCommand.GW_SET_NODE_VARIATION_REQ | GatewayCommand.GW_SET_NODE_NAME_REQ | GatewayCommand.GW_SET_NODE_VELOCITY_REQ | GatewayCommand.GW_SET_NODE_ORDER_AND_PLACEMENT_REQ | GatewayCommand.GW_GET_GROUP_INFORMATION_REQ | GatewayCommand.GW_SET_GROUP_INFORMATION_REQ | GatewayCommand.GW_DELETE_GROUP_REQ | GatewayCommand.GW_NEW_GROUP_REQ | GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_REQ | GatewayCommand.GW_HOUSE_STATUS_MONITOR_ENABLE_REQ | GatewayCommand.GW_HOUSE_STATUS_MONITOR_DISABLE_REQ | GatewayCommand.GW_COMMAND_SEND_REQ | GatewayCommand.GW_STATUS_REQUEST_REQ | GatewayCommand.GW_WINK_SEND_REQ | GatewayCommand.GW_SET_LIMITATION_REQ | GatewayCommand.GW_GET_LIMITATION_STATUS_REQ | GatewayCommand.GW_MODE_SEND_REQ | GatewayCommand.GW_INITIALIZE_SCENE_REQ | GatewayCommand.GW_INITIALIZE_SCENE_CANCEL_REQ | GatewayCommand.GW_RECORD_SCENE_REQ | GatewayCommand.GW_DELETE_SCENE_REQ | GatewayCommand.GW_RENAME_SCENE_REQ | GatewayCommand.GW_GET_SCENE_LIST_REQ | GatewayCommand.GW_GET_SCENE_INFORMATION_REQ | GatewayCommand.GW_ACTIVATE_SCENE_REQ | GatewayCommand.GW_STOP_SCENE_REQ | GatewayCommand.GW_ACTIVATE_PRODUCTGROUP_REQ | GatewayCommand.GW_GET_CONTACT_INPUT_LINK_LIST_REQ | GatewayCommand.GW_SET_CONTACT_INPUT_LINK_REQ | GatewayCommand.GW_REMOVE_CONTACT_INPUT_LINK_REQ | GatewayCommand.GW_GET_ACTIVATION_LOG_HEADER_REQ | GatewayCommand.GW_CLEAR_ACTIVATION_LOG_REQ | GatewayCommand.GW_GET_ACTIVATION_LOG_LINE_REQ | GatewayCommand.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_REQ | GatewayCommand.GW_SET_UTC_REQ | GatewayCommand.GW_RTC_SET_TIME_ZONE_REQ | GatewayCommand.GW_GET_LOCAL_TIME_REQ | GatewayCommand.GW_PASSWORD_ENTER_REQ | GatewayCommand.GW_PASSWORD_CHANGE_REQ;
export type GatewayCommand_Confirmation = GatewayCommand.GW_REBOOT_CFM | GatewayCommand.GW_SET_FACTORY_DEFAULT_CFM | GatewayCommand.GW_GET_VERSION_CFM | GatewayCommand.GW_GET_PROTOCOL_VERSION_CFM | GatewayCommand.GW_GET_STATE_CFM | GatewayCommand.GW_LEAVE_LEARN_STATE_CFM | GatewayCommand.GW_GET_NETWORK_SETUP_CFM | GatewayCommand.GW_SET_NETWORK_SETUP_CFM | GatewayCommand.GW_CS_GET_SYSTEMTABLE_DATA_CFM | GatewayCommand.GW_CS_DISCOVER_NODES_CFM | GatewayCommand.GW_CS_REMOVE_NODES_CFM | GatewayCommand.GW_CS_VIRGIN_STATE_CFM | GatewayCommand.GW_CS_CONTROLLER_COPY_CFM | GatewayCommand.GW_CS_RECEIVE_KEY_CFM | GatewayCommand.GW_CS_GENERATE_NEW_KEY_CFM | GatewayCommand.GW_CS_REPAIR_KEY_CFM | GatewayCommand.GW_CS_ACTIVATE_CONFIGURATION_MODE_CFM | GatewayCommand.GW_GET_NODE_INFORMATION_CFM | GatewayCommand.GW_GET_ALL_NODES_INFORMATION_CFM | GatewayCommand.GW_SET_NODE_VARIATION_CFM | GatewayCommand.GW_SET_NODE_NAME_CFM | GatewayCommand.GW_SET_NODE_VELOCITY_CFM | GatewayCommand.GW_SET_NODE_ORDER_AND_PLACEMENT_CFM | GatewayCommand.GW_GET_GROUP_INFORMATION_CFM | GatewayCommand.GW_SET_GROUP_INFORMATION_CFM | GatewayCommand.GW_DELETE_GROUP_CFM | GatewayCommand.GW_NEW_GROUP_CFM | GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_CFM | GatewayCommand.GW_HOUSE_STATUS_MONITOR_ENABLE_CFM | GatewayCommand.GW_HOUSE_STATUS_MONITOR_DISABLE_CFM | GatewayCommand.GW_COMMAND_SEND_CFM | GatewayCommand.GW_STATUS_REQUEST_CFM | GatewayCommand.GW_WINK_SEND_CFM | GatewayCommand.GW_SET_LIMITATION_CFM | GatewayCommand.GW_GET_LIMITATION_STATUS_CFM | GatewayCommand.GW_MODE_SEND_CFM | GatewayCommand.GW_INITIALIZE_SCENE_CFM | GatewayCommand.GW_INITIALIZE_SCENE_CANCEL_CFM | GatewayCommand.GW_RECORD_SCENE_CFM | GatewayCommand.GW_DELETE_SCENE_CFM | GatewayCommand.GW_RENAME_SCENE_CFM | GatewayCommand.GW_GET_SCENE_LIST_CFM | GatewayCommand.GW_GET_SCENE_INFORMATION_CFM | GatewayCommand.GW_ACTIVATE_SCENE_CFM | GatewayCommand.GW_STOP_SCENE_CFM | GatewayCommand.GW_ACTIVATE_PRODUCTGROUP_CFM | GatewayCommand.GW_GET_CONTACT_INPUT_LINK_LIST_CFM | GatewayCommand.GW_SET_CONTACT_INPUT_LINK_CFM | GatewayCommand.GW_REMOVE_CONTACT_INPUT_LINK_CFM | GatewayCommand.GW_GET_ACTIVATION_LOG_HEADER_CFM | GatewayCommand.GW_CLEAR_ACTIVATION_LOG_CFM | GatewayCommand.GW_GET_ACTIVATION_LOG_LINE_CFM | GatewayCommand.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_CFM | GatewayCommand.GW_SET_UTC_CFM | GatewayCommand.GW_RTC_SET_TIME_ZONE_CFM | GatewayCommand.GW_GET_LOCAL_TIME_CFM | GatewayCommand.GW_PASSWORD_ENTER_CFM | GatewayCommand.GW_PASSWORD_CHANGE_CFM;
export type GatewayCommand_Notification = GatewayCommand.GW_ERROR_NTF | GatewayCommand.GW_CS_GET_SYSTEMTABLE_DATA_NTF | GatewayCommand.GW_CS_DISCOVER_NODES_NTF | GatewayCommand.GW_CS_CONTROLLER_COPY_NTF | GatewayCommand.GW_CS_CONTROLLER_COPY_CANCEL_NTF | GatewayCommand.GW_CS_RECEIVE_KEY_NTF | GatewayCommand.GW_CS_PGC_JOB_NTF | GatewayCommand.GW_CS_SYSTEM_TABLE_UPDATE_NTF | GatewayCommand.GW_CS_GENERATE_NEW_KEY_NTF | GatewayCommand.GW_CS_REPAIR_KEY_NTF | GatewayCommand.GW_GET_NODE_INFORMATION_NTF | GatewayCommand.GW_GET_ALL_NODES_INFORMATION_NTF | GatewayCommand.GW_GET_ALL_NODES_INFORMATION_FINISHED_NTF | GatewayCommand.GW_NODE_INFORMATION_CHANGED_NTF | GatewayCommand.GW_NODE_STATE_POSITION_CHANGED_NTF | GatewayCommand.GW_GET_GROUP_INFORMATION_NTF | GatewayCommand.GW_GROUP_INFORMATION_CHANGED_NTF | GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_NTF | GatewayCommand.GW_GET_ALL_GROUPS_INFORMATION_FINISHED_NTF | GatewayCommand.GW_GROUP_DELETED_NTF | GatewayCommand.GW_COMMAND_RUN_STATUS_NTF | GatewayCommand.GW_COMMAND_REMAINING_TIME_NTF | GatewayCommand.GW_SESSION_FINISHED_NTF | GatewayCommand.GW_STATUS_REQUEST_NTF | GatewayCommand.GW_WINK_SEND_NTF | GatewayCommand.GW_LIMITATION_STATUS_NTF | GatewayCommand.GW_MODE_SEND_NTF | GatewayCommand.GW_INITIALIZE_SCENE_NTF | GatewayCommand.GW_RECORD_SCENE_NTF | GatewayCommand.GW_GET_SCENE_LIST_NTF | GatewayCommand.GW_GET_SCENE_INFORMATION_NTF | GatewayCommand.GW_SCENE_INFORMATION_CHANGED_NTF | GatewayCommand.GW_ACTIVATE_PRODUCTGROUP_NTF | GatewayCommand.GW_ACTIVATION_LOG_UPDATED_NTF | GatewayCommand.GW_GET_MULTIPLE_ACTIVATION_LOG_LINES_NTF | GatewayCommand.GW_PASSWORD_CHANGE_NTF;
export type GatewayCommand_Receive = GatewayCommand_Confirmation | GatewayCommand_Notification;
export declare enum GW_COMMON_STATUS {
    SUCCESS = 0,
    ERROR = 1,
    INVALID_NODE_ID = 2
}
export declare enum GW_INVERSE_STATUS {
    ERROR = 0,
    SUCCESS = 1
}
export declare const C_MAX_PWD_LENGTH = 32;
export interface IGW_FRAME {
    readonly Command: GatewayCommand;
}
export interface IGW_FRAME_REQ extends IGW_FRAME {
    readonly Data: Buffer;
}
export type IGW_FRAME_RCV = IGW_FRAME;
export interface IGW_FRAME_RCV_CTOR {
    new (Data: Buffer): IGW_FRAME_RCV;
}
export type IGW_FRAME_CFM = IGW_FRAME_RCV;
export type IGW_FRAME_NTF = IGW_FRAME_RCV;
export interface IGW_FRAME_COMMAND extends IGW_FRAME {
    readonly SessionID: number;
}
export declare abstract class GW_FRAME implements IGW_FRAME {
    readonly Command: GatewayCommand;
    protected readonly offset: number;
    protected constructor();
}
export declare abstract class GW_FRAME_REQ extends GW_FRAME implements IGW_FRAME_REQ {
    readonly BufferSize: number;
    /**
     * Creates an instance of GW_FRAME_REQ.
     *
     * @param {number} BufferSize The size of the buffer (only pure data, without protocol and command bytes)
     */
    constructor(BufferSize: number);
    /**
     * Allocates a buffer in the right size for the frame.
     * The first byte contains the buffer length.
     * The next two bytes of the buffer are used for the command.
     * The remaining bytes are for the data.
     *
     * A size of 0 means that the command has no further data.
     *
     * @protected
     * @param {number} BufferSize Size for the buffer for the data part without length and command.
     * @param {boolean} CopyData Set to true to copy the data in case of reallocating the buffer. Default is true.
     */
    protected AllocBuffer(BufferSize: number, CopyData?: boolean): void;
    private data;
    get Data(): Buffer;
}
export declare abstract class GW_FRAME_COMMAND_REQ extends GW_FRAME_REQ implements IGW_FRAME_COMMAND {
    readonly SessionID: number;
    constructor(BufferSize: number);
}
export declare abstract class GW_FRAME_RCV extends GW_FRAME implements IGW_FRAME_RCV {
    readonly Data: Buffer;
    constructor(Data: Buffer);
    private CheckCommand;
}
export declare abstract class GW_FRAME_CFM extends GW_FRAME_RCV implements IGW_FRAME_CFM {
}
export declare abstract class GW_FRAME_NTF extends GW_FRAME_RCV implements IGW_FRAME_NTF {
}
/**
 * Reads a zero-terminated string from the buffer.
 *
 * @param {Buffer} data The buffer that contains the string data.
 * @returns {string} Returns the string data.
 */
export declare function readZString(data: Buffer): string;
export declare class KLF200Protocol {
    static readonly ProtocolID = 0;
    static Encode(data: Buffer): Buffer;
    static Decode(data: Buffer): Buffer;
}
export declare const SLIP_END = 192;
export declare class SLIPProtocol {
    static Encode(data: Buffer): Buffer;
    static Decode(data: Buffer): Buffer;
}
