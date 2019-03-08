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
  state = {
    stateTranscript: "initialise",
    stateNlp: {}
  };
  timerId = 0;

  sliceTranscript = n => {
    const { transcript } = this.props;
    const newTranscript = transcript.split(" ");
    const len = newTranscript.length;

    const min = len - n < 0 ? 0 : len - n;
    const shortTranscript = newTranscript.slice(min, len).join(" ");
    return shortTranscript;
  };

  nlpTranscript = () => {
    const nlp = require("compromise");
    const { stateTranscript } = this.state;
    const nlpTranscript = nlp(stateTranscript);
    const nouns = nlpTranscript
      .nouns()
      .random(1)
      .out();
    const topics = nlpTranscript
      .topics()
      .random(1)
      .out();
    const update = { nouns, topics };
    this.props.sendSearchTerms(update);
    this.setState({ stateNlp: update });
  };

  componentDidMount() {
    this.timerId = setInterval(() => {
      const shortTranscript = this.sliceTranscript(10);
      this.setState({ stateTranscript: shortTranscript });
      const command = this.sliceTranscript(1);
      this.props.sendCommand(command);
    }, 1000);
    setInterval(() => {
      this.nlpTranscript();
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    const {
      transcript,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = this.props;

    const { stateTranscript, stateNlp } = this.state;

    if (!browserSupportsSpeechRecognition) {
      return null;
    }

    //console.log({ transcript });

    return (
      <div>
        {/* <button onClick={resetTranscript}>Reset</button>
        <button>ShortenState</button> */}

        {/* <div data-testid="transcripty">{stateTranscript}</div> */}
        {/* <div onClick={this.props.handleChange}>{stateNlp.nouns}</div> */}
      </div>
    );
  }
}

Dictaphone.propTypes = propTypes;

export default SpeechRecognition(Dictaphone);
