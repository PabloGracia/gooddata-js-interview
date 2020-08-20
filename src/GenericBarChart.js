import React from "react";
import "@gooddata/react-components/styles/css/main.css";

import { ColumnChart } from "@gooddata/react-components";

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

const years = {
  "2015": 2015,
  "2016": 2016,
  "2017": 2017,
};

export class ProfitBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from: "2016-01-01",
      to: "2016-01-31",
      selectedMonth: "January",
      selectedYear: "2016",
    };
  }
  /*   getMonthFilter() {
    return {
      absoluteDateFilter: {
        dataSet: {
          uri: dateAttribute,
        },
        from: this.state.from,
        to: this.state.to,
      },
    };
  } */

  getMonthFilter = () => {
    if (this.props.filter) {
      if (this.props.filter["absoluteDateFilter"]) {
        return {
          absoluteDateFilter: {
            ...this.props.filter["absoluteDateFilter"],
            from: this.state.from,
            to: this.state.to,
          },
        };
      } else if (this.props.filter["relativeDateFilter"]) {
        return {
          relativeDateFilter: {
            ...this.props.filter["relativeDateFilter"],
            from: this.state.from,
            to: this.state.to,
          },
        };
      } else {
        throw new Error("Not valid argument for absolute/relative Date Filter");
      }
    } else {
      return {};
    }
  };

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

  renderYearDropdown = () => {
    return (
      <select
        value={this.state.selectedYear}
        onChange={this.onDropDownYearChange}
      >
        {Object.keys(years).map((year) => (
          <option value={year} key={year}>
            {year}
          </option>
        ))}
      </select>
    );
  };

  renderMonthDropdown = () => {
    return (
      <select
        value={this.state.selectedMonth}
        onChange={this.onDropDownMonthChange}
      >
        {Object.keys(months).map((month) => (
          <option value={month} key={month}>
            {month}
          </option>
        ))}
      </select>
    );
  };

  setStateRange = () => {
    this.setState(
      {
        from: `${this.state.selectedYear}-${
          months[this.state.selectedMonth]
        }-01`,
        to: `${this.state.selectedYear}-${months[this.state.selectedMonth]}-31`,
      },
      console.log("this.state: ", this.state)
    );
  };

  onDropDownMonthChange = (event) => {
    this.setState({ selectedMonth: event.target.value }, this.setStateRange);
  };

  onDropDownYearChange = (event) => {
    this.setState({ selectedYear: event.target.value }, this.setStateRange);
  };

  renderDropDowns = () => (
    <div>
      {this.renderMonthDropdown()}
      {this.renderYearDropdown()}
    </div>
  );

  render() {
    const filters = [this.getMonthFilter()];
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();
    console.log("filters: ", filters);
    return (
      <div
        className="ProfitBarChart"
        style={{
          display: "grid",
          gridTemplateRows: "65px auto",
        }}
      >
        <h1 style={{ gridRowStart: 1, gridRowEnd: 2 }}>
          {this.props.title ? this.props.title : measures[0].measure.alias} in{" "}
          {this.props.isMonthlyFiltered ? (
            <span>
              <span>{this.renderMonthDropdown()}</span>
              <span>{this.renderYearDropdown()}</span>
            </span>
          ) : (
            " - All months"
          )}
        </h1>
        <div style={{ gridRowStart: 2, gridRowEnd: 3 }}>
          <ColumnChart
            measures={measures}
            filters={this.props.isMonthlyFiltered ? filters : []}
            projectId={this.props.projectId}
            viewBy={viewBy}
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
  viewBy: undefined,
  isMonthlyFiltered: false,
};
