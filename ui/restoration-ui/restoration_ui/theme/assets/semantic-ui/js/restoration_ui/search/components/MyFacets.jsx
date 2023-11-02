import React from "react";
import { BucketAggregation } from "react-searchkit";
import { withState } from "react-searchkit";


export const MyFacets = withState(({ aggs}) => {
  return (
      <div>
        {aggs.map((agg) => (
          <BucketAggregation key={agg.aggName} title={agg.title} agg={agg} />
        ))}
      </div>
  );
})