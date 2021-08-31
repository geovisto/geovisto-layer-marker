// Geovisto core
import {
    IGeoData,
    ILayerToolDimensions,
    IMapAggregationFunction,
    IMapDataDomain,
    IMapDomainDimension
} from "geovisto";

/**
 * This type provides the specification of the marker layer tool dimensions model.
 * 
 * @author Jiri Hynek
 */
type IMarkerLayerToolDimensions = ILayerToolDimensions & {
    geoData: IMapDomainDimension<IGeoData>,
    geoId: IMapDomainDimension<IMapDataDomain>,
    value: IMapDomainDimension<IMapDataDomain>,
    aggregation: IMapDomainDimension<IMapAggregationFunction>,
    category: IMapDomainDimension<IMapDataDomain>
}
export default IMarkerLayerToolDimensions;