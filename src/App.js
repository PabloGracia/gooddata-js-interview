// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from "react";
import "@gooddata/react-components/styles/css/main.css";

import { TitledBarChart } from "./TitledBarChart";

const grossProfitMeasure = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877";
const dateAttributeInMonths =
  "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142";
const dateAttribute = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180";

class App extends Component {
  getMeasures() {
    return [
      {
        localIdentifier: "m1",
        uri: grossProfitMeasure,
        alias: "$ Gross Profit",
      },
    ];
  }

  getViewBy() {
    return {
      uri: dateAttributeInMonths,
      localIdentifier: "a1",
    };
  }

  getMonthFilter() {
    return {
      absoluteDateFilter: {
        dataSet: {
          uri: dateAttribute,
        },
      },
      yearsRange: [2015, 2016, 2017],
    };
  }

  render() {
    const projectId = "xms7ga4tf3g3nzucd8380o2bev8oeknp";
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();
    const filters = this.getMonthFilter();

    return (
      <div className="App">
        <TitledBarChart
          measures={measures}
          projectId={projectId}
          filter={filters}
        />
        <TitledBarChart
          measures={measures}
          viewBy={viewBy}
          projectId={projectId}
        />
      </div>
    );
  }
}

export default App;
