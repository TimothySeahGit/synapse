import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import React from "react";
import { render, fireEvent, wait } from "react-testing-library";
import { searchPhotos } from "./services/unsplash";
import ReactDOM from "react-dom";
import App from "./App";

jest.mock("./services/unsplash.js", () => {
  const sampleResult = {
    urls: {
      regular:
        "https://cdn.omlet.co.uk/images/originals/unsteady-hamsters-could-be-ill.jpg"
    }
  };
  return {
    searchPhotos: jest.fn(searchTerm =>
      Promise.resolve({ results: sampleResult })
    )
  };
});

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("displays a greeting on start", () => {
    const { getByText } = render(<App />);
    expect(getByText(/speak/i)).toBeInTheDocument();
  });

  test("fetches the regular-sized url from unsplash", async () => {
    const { getByText } = render(<App />);
    await wait(() => {
      expect(searchPhotos).toHaveBeenCalledWith("");
      expect(getByText(searchPhotos)).toBeInTheDocument(
        "https://cdn.omlet.co.uk/images/originals/unsteady-hamsters-could-be-ill.jpg"
      );
    });
  });
});
