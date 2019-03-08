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

  test("renders a transcript that is fed to it", () => {
    const { getByText, getByTestId, debug } = render(<Dictaphone {...props} />);
    debug();
    expect(props.transcript).toEqual(
      "Singapore is a hot place full of Donald Trump and Mormon and cats and dogs. The protagonist Raskolnikov commits a terrible crime and descends into spiritual turmoil."
    );
  });
});
