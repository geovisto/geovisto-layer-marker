// Leaflet
import {
    LatLngExpression,
} from "leaflet";

// Geovisto core
import {
    CountAggregationFunction,
    IGeoData,
    IMap,
    IMapAggregationFunction,
    IMapDataDomain,
    IMapDomainDimension,
    LayerToolDefaults,
    MapDomainDimension,
    MapDomainArrayManager,
    MapDynamicDomainDimension,
    SumAggregationFunction,
    IMapTypeDimension,
    MapTypeDimension,
    StringTypeManager,
    IntegerTypeManager,
    BooleanTypeManager
} from "geovisto";

import IMarker from "../../types/marker/IMarker";
import IMarkerIcon from "../../types/marker/IMarkerIcon";
import { IMarkerIconOptions } from "../../types/marker/IMarkerIconOptions";
import IMarkerLayerToolDefaults from "../../types/tool/IMarkerLayerToolDefaults";
import IMarkerLayerToolDimensions from "../../types/tool/IMarkerLayerToolDimensions";
import IMarkerOptions from "../../types/marker/IMarkerOptions";
import Marker from "../marker/Marker";
import { MarkerIcon } from "../marker/MarkerIcon";

/**
 * This class provide functions which return the default state values.
 * 
 * @author Jiri Hynek
 */
class MarkerLayerToolDefaults extends LayerToolDefaults implements IMarkerLayerToolDefaults {

    /**
     * Static tool type constant.
     */
    public static TYPE = "geovisto-tool-layer-marker";

    /**
     * It returns a unique type string of the tool which is based on the layer it wraps.
     */
    public getType(): string {
        return MarkerLayerToolDefaults.TYPE;
    }

    /**
     * It returns the layer name.
     */
    public getLayerName(): string {
        return "Marker layer";
    }

    /**
     * It returns the label of the tool.
     */
    public getLabel(): string {
        return this.getLayerName();
    }

    /**
     * It returns the icon of the tool.
     */
    public getIcon(): string {
        return '<i class="fa fa-map-marker"></i>';
    }

    /**
     * It returns the map of layer dimensions.
     */
    public getDimensions(map?: IMap): IMarkerLayerToolDimensions {
        return {
            geoData: this.getGeoDataDimension(map),
            geoId: this.getGeoIdDimension(map),
            value: this.getValueDimension(map),
            aggregation: this.getAggregationDimension(),
            category: this.getCategoryDimension(map),
            units: this.getUnitsDimension(),
            unitsDesc: this.getUnitsDescDimension(),
            unitsEnabled: this.getUnitsEnabledDimension(),
            round: this.getRoundDimension()
        };
    }

    /**
     * It returns the default geo ID dimension.
     */
    public getGeoDataDimension(map?: IMap): IMapDomainDimension<IGeoData> {
        return new MapDynamicDomainDimension(
            "geo-data",
            () => map?.getState().getGeoDataManager() ?? this.getGeoDataManager(this.getGeoData()),
            ""
        );
    }

    /**
     * It returns the default geo ID dimension.
     */
    public getGeoIdDimension(map?: IMap): IMapDomainDimension<IMapDataDomain> {
        return new MapDynamicDomainDimension(
            "geo",
            () => map?.getState().getMapData() ?? this.getDataManager(),
            ""
        );
    }

    /**
     * It returns the default value dimension.
     */
    public getValueDimension(map?: IMap): IMapDomainDimension<IMapDataDomain> {
        return new MapDynamicDomainDimension(
            "value",
            () => map?.getState().getMapData() ?? this.getDataManager(),
            ""
        );
    }

    /**
     * It returns the default aggregation function dimension.
     */
    public getAggregationDimension(): IMapDomainDimension<IMapAggregationFunction> {
        const domainManager = new MapDomainArrayManager(
            [
                new CountAggregationFunction(),
                new SumAggregationFunction()
            ]
        );

        return new MapDomainDimension(
            "aggregation",
            domainManager,
            domainManager.getDefault()
        );
    }

    /**
     * It returns the default category dimension.
     */
    public getCategoryDimension(map?: IMap): IMapDomainDimension<IMapDataDomain> {
        return new MapDynamicDomainDimension(
            "category",
            () => map?.getState().getMapData() ?? this.getDataManager(),
            ""
        );
    }

    /**
     * It returns the max value dimension.
     */
    public getUnitsDimension(): IMapTypeDimension<string> {
        return new MapTypeDimension<string>(
            "units",
            new StringTypeManager(),
            ""
        );
    }

    /**
     * It returns the units description value dimension.
     */
    public getUnitsDescDimension(): IMapTypeDimension<string> {
        return new MapTypeDimension<string>(
            "unitsDesc",
            new StringTypeManager(),
            ""
        );
    }

    /**
     * It returns the units state value dimension.
     */
    public getUnitsEnabledDimension(): IMapTypeDimension<boolean> {
        return new MapTypeDimension<boolean>(
            "unitsEnabled",
            new BooleanTypeManager(),
            false
        );
    }

    /**
     * It returns the max value dimension.
     */
    public getRoundDimension(): IMapTypeDimension<number> {
        return new MapTypeDimension<number>(
            "round",
            new IntegerTypeManager(),
            undefined
        );
    }
    
    /**
     * It returns the default geo data.
     */
    public getGeoData(): IGeoData[] {
        return [
            // TODO: provide default geo data
        ];
    }

    /**
     * It returns new marker for the given options.
     * 
     * @param latlng 
     * @param options
     */
    public getMarker(latlng: LatLngExpression, options?: IMarkerOptions): IMarker<IMarkerIcon<IMarkerIconOptions>> {
        return new Marker<IMarkerIcon<IMarkerIconOptions>>(latlng, options);
    }

    /**
     * It returns new icon for the given options.
     * 
     * @param options 
     */
    public getMarkerIcon(options: IMarkerIconOptions): IMarkerIcon<IMarkerIconOptions> {
        return new MarkerIcon(options);
    }
}
export default MarkerLayerToolDefaults;