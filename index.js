import nlp from "compromise";
// import initialize from "./initialize.js";
import sequencer from "./workers/sequencer.js";

const playerpiano = {
  api: (View) => {
    View.prototype.sequence = function (instructions, callingDataPath = false) {
      console.log("this was passed along: " + callingDataPath);
      sequencer(this, instructions, callingDataPath);
    };
  },
};

export default playerpiano;
