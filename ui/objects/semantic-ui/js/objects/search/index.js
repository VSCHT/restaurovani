import { SearchAppSearchbarContainer } from "@js/oarepo_ui/search";
import { createSearchAppsInit, parseSearchAppConfigs } from "@js/oarepo_ui";
import {
  EmptyResultsElement,
  ResultsListItemWithState,
  SearchAppLayout,
  CustomSearchBar,
  MyBucketAggregationValues,
  MyFacets,
  MyBucketAggregation,
} from "./components";
import { parametrize } from "react-overridable";

const [searchAppConfig, ...otherSearchAppConfigs] = parseSearchAppConfigs();
const { overridableIdPrefix } = searchAppConfig;

const SearchAppSearchbarContainerWithConfig = parametrize(
  SearchAppSearchbarContainer,
  { overridableIdPrefix: overridableIdPrefix }
);
const ResultsListItemWithConfig = parametrize(ResultsListItemWithState, {
  overridableIdPrefix: overridableIdPrefix,
});

export const componentOverrides = {
  [`${overridableIdPrefix}.BucketAggregation.element`]: MyBucketAggregation,
  [`${overridableIdPrefix}.BucketAggregationValues.element`]:
    MyBucketAggregationValues,
  [`${overridableIdPrefix}.EmptyResults.element`]: EmptyResultsElement,
  [`${overridableIdPrefix}.ResultsList.item`]: ResultsListItemWithConfig,
  [`${overridableIdPrefix}.SearchApp.facets`]: MyFacets,
  [`${overridableIdPrefix}.SearchApp.layout`]: SearchAppLayout,
  [`${overridableIdPrefix}.SearchApp.searchbarContainer`]:
    SearchAppSearchbarContainerWithConfig,
  [`${overridableIdPrefix}.SearchBar.element`]: CustomSearchBar,
};

createSearchAppsInit({ componentOverrides });
