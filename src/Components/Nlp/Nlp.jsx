import React from "react";

function Nlp(props) {
  const nlp = require("compromise");
  const { stateTranscript } = props;
  const nlpTranscript = nlp(stateTranscript);
  const people = nlpTranscript
    .people()
    .random(1)
    .out();
  const places = nlpTranscript
    .places()
    .random(1)
    .out();
  const organizations = nlpTranscript
    .organizations()
    .random(1)
    .out();
  const nouns = nlpTranscript
    .nouns()
    .random(1)
    .out();
  this.props.sendNlpText = { people, places, organizations, nouns };
  return <div />;
}

export default Nlp;
