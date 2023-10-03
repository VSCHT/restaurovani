import React from "react";
import { BucketAggregation } from "react-searchkit";
import { i18next } from "@translations/oarepo_ui/i18next";
import { withState } from "react-searchkit";


export const MyFacets = withState(({ aggs, appName }) => {
  return (
    <div >
      <div >
        {aggs.map((agg) => (
          <BucketAggregation key={agg.aggName} title={agg.title} agg={agg} />
        ))}
      </div>
    </div>
  );
})