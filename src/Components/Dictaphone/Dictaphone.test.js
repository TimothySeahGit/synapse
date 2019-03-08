import "react-testing-library/cleanup-after-each";
import "jest-dom/extend-expect";
import React from "react";
import { render, fireEvent } from "react-testing-library";
import Dictaphone from "./Dictaphone";

describe("Dictaphone", () => {
  const props = {
    transcript:
      "Singapore is a hot place full of Donald Trump and Mormon and cats and dogs. The protagonist Raskolnikov commits a terrible crime and descends into spiritual turmoil.",
    //resetTranscript: false,
    browserSupportsSpeechRecognition: true
  };

  xtest("renders a transcript that is fed to it", () => {
    const { getByText, getByTestId, debug } = render(<Dictaphone {...props} />);
    debug();
    expect(getByText(props.transcript)).toBeInTheDocument();
    expect(
      getByText(
        /raskolnikov commits a terrible crime and descends into spiritual turmoil/i
      )
    ).toBeInTheDocument();
  });

  xtest("keeps the last 10 words from transcript in the local state", () => {
    const { getByText, queryByText, debug, getByTestId } = render(
      <Dictaphone {...props} />
    );
    const filterBtnAll = getByTestId("transcripty");

    expect(getByText(props.transcript)).toBeInTheDocument();
    fireEvent.click(filterBtnAll);
    debug();
    //expect(queryByText(/the protagonist/i)).not.toBeInTheDocument();
  });

  xtest("post-NLP state is a subset of transcript in the local state", () => {});
});
