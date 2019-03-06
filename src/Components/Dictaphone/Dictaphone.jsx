import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

class Dictaphone extends Component {
  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = this.props;

    var nlp = require("compromise");
    var doc = nlp(
      "Singapore is a hot place full of Donald Trump and Mormon and cats and dogs. The protagonist Raskolnikov commits a terrible crime and descends into spiritual turmoil."
    )
      .people()
      .data();
    //var arr = doc.out();
    //console.log(doc);

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    const splitTranscript = transcript.split(" ").slice(0, 10);
    //console.log(splitTranscript);

    return (
      <div>
        <button onClick={resetTranscript}>Reset</button>

        <span data-testid="transcripty">{transcript}</span>
      </div>
    );
  }
}

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);
