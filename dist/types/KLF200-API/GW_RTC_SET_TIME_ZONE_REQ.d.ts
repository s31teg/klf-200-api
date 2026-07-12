import { GatewayCommand, GW_FRAME_REQ } from "./common.js";
export declare class GW_RTC_SET_TIME_ZONE_REQ extends GW_FRAME_REQ {
    readonly TimeZoneString: string;
    readonly Command: GatewayCommand.GW_RTC_SET_TIME_ZONE_REQ;
    /**
     * Creates an instance of GW_RTC_SET_TIME_ZONE_REQ.
     *
     * @param {string} [TimeZoneString] Time zone string, e.g. :GMT+1:GMT+2:0060:(1996)040102-0:110102-0
     */
    constructor(TimeZoneString: string);
}
