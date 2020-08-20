import React from "react";
import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart } from "@gooddata/react-components";

const grossProfitMeasure = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/6877";
const dateAttributeInMonths =
  "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2142";
const dateAttribute = "/gdc/md/xms7ga4tf3g3nzucd8380o2bev8oeknp/obj/2180";

const months = {
  January: "01",
  February: "02",
  March: "03",
  April: "04",
  May: "05",
  June: "06",
  July: "07",
  August: "08",
  September: "09",
  October: "10",
  November: "11",
  December: "12",
};

export class ProfitBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "2016-01-01",
      to: "2016-01-31",
      selectedMonth: "January",
    };
  }
  getMonthFilter() {
    return {
      absoluteDateFilter: {
        dataSet: {
          uri: dateAttribute,
        },
        from: this.state.from,
        to: this.state.to,
      },
    };
  }

  getMeasures() {
    return this.props.measures.map((data) => ({
      measure: {
        localIdentifier: data.localIdentifier,
        definition: {
          measureDefinition: {
            item: {
              uri: data.uri,
            },
          },
        },
        alias: data.alias,
      },
    }));
  }

  getViewBy = () => {
    if (this.props.viewBy) {
      return {
        visualizationAttribute: {
          displayForm: {
            uri: this.props.viewBy.uri,
          },
          localIdentifier: this.props.viewBy.localIdentifier,
        },
      };
    } else {
      return {};
    }
  };

  renderDropdown = () => {
    return (
      <select value={this.state.selectedMonth} onChange={this.onDropDownChange}>
        {Object.keys(months).map((month) => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>
    );
  };

  onDropDownChange = (event) => {
    const targetMonth = event.target.value;
    const from = `2016-${months[targetMonth]}-01`;
    const to = `2016-${months[targetMonth]}-31`;
    this.setState({ selectedMonth: targetMonth, to: to, from: from }, () =>
      console.log(this.state)
    );
  };

  render() {
    const filters = [this.getMonthFilter()];
    const measures = this.getMeasures();
    console.log("measures: ", measures);
    return (
      <div className="ProfitBarChart">
        <h1>
          {this.props.title ? this.props.title : measures[0].measure.alias} in{" "}
          {this.props.isMonthlyFiltered
            ? this.renderDropdown()
            : " - All months"}
        </h1>
        <div style={{ height: "350px" }}>
          <ColumnChart
            measures={measures}
            filters={this.props.isMonthlyFiltered ? filters : []}
            projectId={this.props.projectId}
            viewBy={this.props.viewBy}
          />
        </div>
      </div>
    );
  }
}

ProfitBarChart.defaultProps = {
  chartTitle: "",
  measures: [],
  projectId: "",
  viewBy: {},
  isMonthlyFiltered: false,
};
