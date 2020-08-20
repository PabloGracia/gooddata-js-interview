// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React, { Component } from "react";
import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart } from "@gooddata/react-components";

import { ProfitBarChart } from "./GenericBarChart";

const grossProfitMeasure = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877";
const dateAttributeInMonths =
  "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142";
const dateAttribute = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "2016-01-01",
      to: "2016-01-31",
      selectedMonth: "January",
    };
  }

  getMeasures() {
    return [
      {
        localIdentifier: "m1",
        uri: grossProfitMeasure,
        alias: "$ Gross Profit",
      },
      {
        localIdentifier: "m2",
        uri: grossProfitMeasure,
        alias: "$ Gross Loss",
      },
      /* {
        measure: {
          localIdentifier: "m1",
          definition: {
            measureDefinition: {
              item: {
                uri: grossProfitMeasure,
              },
            },
          },
          alias: "$ Gross Profit",
        },
      }, */
    ];
  }

  getViewBy() {
    return {
      uri: dateAttribute,
      localIdentifier: "a1",
    }; /* 
    return {
      visualizationAttribute: {
        displayForm: {
          uri: dateAttributeInMonths,
        },
        localIdentifier: "a1",
      },
    }; */
  }

  render() {
    const projectId = "xms7ga4tf3g3nzucd8380o2bev8oeknp";
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();

    return (
      <div className="App">
        <ProfitBarChart
          measures={measures}
          projectId={projectId}
          isMonthlyFiltered
        />
        <ProfitBarChart
          measures={measures}
          viewBy={viewBy}
          projectId={projectId}
        />
        {/* <h1>$ Gross Profit in month {this.renderDropdown()} 2016</h1>
        <div>
          <ColumnChart
            measures={measures}
            filters={filters}
            projectId={projectId}
          />
        </div>
        <h1>$ Gross Profit - All months</h1>
        <div>
          <ColumnChart
            measures={measures}
            viewBy={viewBy}
            projectId={projectId}
          />
        </div> */}
      </div>
    );
  }
}

export default App;
