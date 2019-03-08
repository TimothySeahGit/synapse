import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("displays a greeting on start", () => {});

  test("displays an image when the url is updated in state", () => {});
});
