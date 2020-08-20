// Copyright (C) 2007-2019, GoodData(R) Corporation. All rights reserved.

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { TitledBarChart } from "./TitledBarChart";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

it("renders the chart bar with default props", () => {
  const div = document.createElement("div");
  ReactDOM.render(<TitledBarChart />, div);
});
