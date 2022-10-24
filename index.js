import nlp from "compromise";
import { setOptions } from "./config.js";
// import initialize from "./initialize.js";
import sequencer from "./workers/sequencer.js";

function setPlayerPianoOptions(options = false) {
  if (options) {
    setOptions(options);
  }
}

const playerpiano = {
  api: (View) => {
    View.prototype.sequence = function (instructions) {
      sequencer(this, instructions);
    };
  },
};

export { playerpiano, setPlayerPianoOptions };
