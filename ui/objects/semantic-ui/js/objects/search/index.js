import {
  ActiveFiltersElement,
  CountElement,
  ErrorElement,
  SearchAppResultOptions,
  SearchAppSearchbarContainer,
  SearchFiltersToggleElement,
  SearchAppSort,
  BucketAggregationElement,
  BucketAggregationValuesElement,
  SearchAppFacets
} from '@js/oarepo_ui/search'
import {createSearchAppsInit,parseSearchAppConfigs
} from "@js/oarepo_ui";
import {
  EmptyResultsElement,
  ResultsGridItemWithState,
  ResultsListItemWithState,
  SearchAppLayout,
  CustomSearchBar,
  MyBucketAggregationValues,
  MyFacets, MyBucketAggregation
} from './components'
import { parametrize, overrideStore } from 'react-overridable'


const [searchAppConfig, ...otherSearchAppConfigs] = parseSearchAppConfigs()
const { overridableIdPrefix } = searchAppConfig


const SearchAppSearchbarContainerWithConfig = parametrize(SearchAppSearchbarContainer, { overridableIdPrefix: overridableIdPrefix })
const ResultsListItemWithConfig = parametrize(ResultsListItemWithState, { overridableIdPrefix: overridableIdPrefix })
const ResultsGridItemWithConfig = parametrize(ResultsGridItemWithState, { overridableIdPrefix: overridableIdPrefix })

export const componentOverrides = {
  [`${overridableIdPrefix}.ActiveFilters.element`]: ActiveFiltersElement,
  [`${overridableIdPrefix}.BucketAggregation.element`]: MyBucketAggregation,
  [`${overridableIdPrefix}.BucketAggregationValues.element`]: MyBucketAggregationValues,
  [`${overridableIdPrefix}.Count.element`]: CountElement,
  [`${overridableIdPrefix}.EmptyResults.element`]: EmptyResultsElement,
  [`${overridableIdPrefix}.Error.element`]: ErrorElement,
  [`${overridableIdPrefix}.ResultsGrid.item`]: ResultsGridItemWithConfig,
  [`${overridableIdPrefix}.ResultsList.item`]: ResultsListItemWithConfig,
  [`${overridableIdPrefix}.SearchApp.facets`]: MyFacets,
  [`${overridableIdPrefix}.SearchApp.layout`]: SearchAppLayout,
  [`${overridableIdPrefix}.SearchApp.searchbarContainer`]: SearchAppSearchbarContainerWithConfig,
  [`${overridableIdPrefix}.SearchApp.sort`]: SearchAppSort,
  [`${overridableIdPrefix}.SearchApp.resultOptions`]: SearchAppResultOptions,
  [`${overridableIdPrefix}.SearchFilters.Toggle.element`]: SearchFiltersToggleElement,
  [`${overridableIdPrefix}.SearchBar.element`]: CustomSearchBar,
  
}



createSearchAppsInit({ componentOverrides });