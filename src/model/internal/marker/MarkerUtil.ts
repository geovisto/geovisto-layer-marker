// Geovisto core
import {
    IMapAggregationBucket
} from "geovisto";

import { IMarkerIconOptions, IMarkerIconValueOptions } from "../../types/marker/IMarkerIconOptions";
import IMarkerIcon from "../../types/marker/IMarkerIcon";
import IMarkerLayerTool from "../../types/tool/IMarkerLayerTool";
import Marker from "./Marker";

/**
 * Help function which creates cluster marker icon options
 * 
 * @param markers 
 */
export function createClusterMarkersData(markers: Marker<IMarkerIcon<IMarkerIconOptions>>[]): IMarkerIconOptions {
    const values = { value: 0, subvalues: new Map<string, number>() };
    let currentIcon: IMarkerIcon<IMarkerIconOptions>;
    let subvalue: number | undefined;
    // go through all child markers and calculate sum of their values and subvalues
    for (let i = 0; i < markers.length; i++) {
        currentIcon = markers[i].getIcon();
        values.value += (currentIcon)?.options.values.value;
        for(const [key, value] of (currentIcon)?.options.values.subvalues) {
            subvalue = values.subvalues.get(key);
            if(subvalue == undefined) {
                values.subvalues.set(key, value);
            } else {
                values.subvalues.set(key, value + subvalue);
            }
        }
        // sort entries according to the keys
        values.subvalues = new Map([...values.subvalues.entries()].sort());
    }
    const options = {
        id: "<Group>",
        shortId: "<Group>",
        name: "<Group>",
        values: values,
        isGroup: true,
        useDonut: markers[0].getIcon()?.options.useDonut,
        categories: markers[0].getIcon()?.options.categories
    };
    return options;
}

// help function for popup numbers
function formatPopUpNumber(num: number) {
    const numParts = num.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return numParts.join(".");
}

/**
 * Help function which creates marker popup message.
 * 
 * @param name 
 * @param bucketMap 
 */
export function createPopupMessage(name: string, bucketMap: Map<string, IMapAggregationBucket | null>, tool: IMarkerLayerTool,
                                    useCategories: boolean): string {
    // build categories popup messages
    let popupMsg = "";
    let subValue, value = 0;
    let units = " " + tool.getState().getDimensions().units.getValue();
    if (tool.getState().getDimensions().unitsEnabled.getValue() == false) {
        units = "";
    }

    if(useCategories) {
        for(const [category, bucket] of bucketMap) {
            subValue = bucket ? bucket.getValue() : 0;
            if(subValue) {
                popupMsg += category + ": " + formatPopUpNumber(subValue) + units + "<br>";
                value += subValue;
            }
        }
    }

    // prepend title popup message
    popupMsg = "<span class='marker-popup-header'><b>" + name + "</b></span><br>" +
                   "<span class='marker-popup-total'>" + (value != null ? formatPopUpNumber(value) + units : "N/A") + "</span><br><br>"
                    + "<div class='marker-popup-data'>" + popupMsg + "</div>";
    return popupMsg;
}

/**
 * Help function which creates marker icon values options.
 * 
 * @param name 
 * @param bucketMap 
 */
export function createMarkerIconValueOptions(bucketMap: Map<string, IMapAggregationBucket | null>): IMarkerIconValueOptions {
    let subValue, value = 0;
    const subValuesMap = new Map<string, number>();
    for(const [category, bucket] of bucketMap) {
        subValue = bucket ? bucket.getValue() : 0;
        subValuesMap.set(category, subValue);
        value += subValue;
    }
    return {
        value: value,
        subvalues: subValuesMap
    };
}