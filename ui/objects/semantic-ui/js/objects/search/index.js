import { createSearchAppInit } from '@js/invenio_search_ui'
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

const appName = 'objects'

const SearchAppSearchbarContainerWithConfig = parametrize(SearchAppSearchbarContainer, { appName: appName })
const ResultsListItemWithConfig = parametrize(ResultsListItemWithState, { appName: appName })
const ResultsGridItemWithConfig = parametrize(ResultsGridItemWithState, { appName: appName })

export const defaultComponents = {
  [`${appName}.ActiveFilters.element`]: ActiveFiltersElement,
  [`${appName}.BucketAggregation.element`]: MyBucketAggregation,
  [`${appName}.BucketAggregationValues.element`]: MyBucketAggregationValues,
  // [`${appName}.BucketAggregation.element`]: BucketAggregationElement,
  // [`${appName}.BucketAggregationValues.element`]: BucketAggregationValuesElement,
  [`${appName}.Count.element`]: CountElement,
  [`${appName}.EmptyResults.element`]: EmptyResultsElement,
  [`${appName}.Error.element`]: ErrorElement,
  [`${appName}.ResultsGrid.item`]: ResultsGridItemWithConfig,
  [`${appName}.ResultsList.item`]: ResultsListItemWithConfig,
  // [`${appName}.SearchApp.facets`]: MyFacets,
  [`${appName}.SearchApp.facets`]: SearchAppFacets,
  [`${appName}.SearchApp.layout`]: SearchAppLayout,
  [`${appName}.SearchApp.searchbarContainer`]: SearchAppSearchbarContainerWithConfig,
  [`${appName}.SearchApp.sort`]: SearchAppSort,
  [`${appName}.SearchApp.resultOptions`]: SearchAppResultOptions,
  [`${appName}.SearchFilters.Toggle.element`]: SearchFiltersToggleElement,
  [`${appName}.SearchBar.element`]: CustomSearchBar,
  
}

const overriddenComponents = overrideStore.getAll()

createSearchAppInit(
  { ...defaultComponents, ...overriddenComponents },
  true,
  'invenio-search-config',
  true,
)
