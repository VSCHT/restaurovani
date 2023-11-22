import { connect } from "react-redux";
import { CustomSB } from "./SearchbarComponent";
export { EmptyResultsElement } from "./EmptyResultsElement";
export { MultipleSearchBarElement } from "./MultipleSearchBarElement";
export { ResultsGridItem, ResultsGridItemWithState } from "./ResultsGridItem";
export { ResultsListItem, ResultsListItemWithState } from "./ResultsListItem";
export { SearchAppLayout } from "./SearchAppLayout";
export { SearchBarCustom } from "./SearchBarElement";

export { MyBucketAggregationValues, MyBucketAggregation } from "./BucketAggr";
export { MyFacets } from "./MyFacets";

export const resetQuery = () => {
  return (dispatch,  config) => {
    dispatch({
      type: "RESET_QUERY",
      payload: {
        queryString: "",
        page: 1,
        filters: [],
        ...config.initialQueryState,
      },
    });
    var href = new URL(window.location.href);
    href.searchParams.set("q", "");
    window.location.href = href.toString();
  };
};

const mapDispatchToProps = (dispatch) => ({
  resetQuery: (onBtnSearchClick) => {
    dispatch(resetQuery(onBtnSearchClick));
  },
});

export const CustomSearchBar = connect(
  (state) => ({
    state: state,
  }),
  mapDispatchToProps
)(CustomSB);
