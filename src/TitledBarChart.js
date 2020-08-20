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

export class TitledBarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedMonth: this.props.defaultDate.month,
      selectedYear: this.props.defaultDate.year,
    };
  }

  getMonthFilter = () => {
    // Compute 'from' and 'to' assuming all months end in 31(?)
    const from = `${this.state.selectedYear}-${
      months[this.state.selectedMonth]
    }-01`;
    const to = `${this.state.selectedYear}-${
      months[this.state.selectedMonth]
    }-31`;
    // Return the appropriate filter
    if (this.props.filter) {
      if (this.props.filter["absoluteDateFilter"]) {
        return [
          {
            absoluteDateFilter: {
              ...this.props.filter["absoluteDateFilter"],
              from,
              to,
            },
          },
        ];
      } else if (this.props.filter["relativeDateFilter"]) {
        return [
          {
            relativeDateFilter: {
              ...this.props.filter["relativeDateFilter"],
              from,
              to,
            },
          },
        ];
      } else {
        throw new Error("Not valid argument for absolute/relative Date Filter");
      }
    } else {
      // Empty array in case no filter should be applied
      return [];
    }
  };

  getMeasures = () => {
    // In case more than one measure is provided, map through it
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
  };

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
        {this.props.filter.yearsRange.map((year) => (
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

  onDropDownMonthChange = (event) => {
    this.setState({ selectedMonth: event.target.value });
  };

  onDropDownYearChange = (event) => {
    this.setState({ selectedYear: event.target.value });
  };

  render() {
    const filters = this.getMonthFilter();
    const measures = this.getMeasures();
    const viewBy = this.getViewBy();
    return (
      <div
        className="TitledBarChart"
        style={{
          display: "grid",
          gridTemplateRows: "15% auto",
        }}
      >
        <h1 style={{ gridRowStart: 1, gridRowEnd: 2 }}>
          {this.props.title
            ? this.props.title
            : measures.length
            ? measures[0].measure.alias
            : ""}{" "}
          in{" "}
          {this.props.filter ? (
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
            filters={filters}
            projectId={this.props.projectId}
            viewBy={viewBy}
          />
        </div>
      </div>
    );
  }
}

TitledBarChart.defaultProps = {
  chartTitle: "",
  measures: [],
  projectId: "",
  viewBy: undefined,
  filter: undefined,
  defaultDate: {
    month: "January",
    year: "2016",
  },
};
