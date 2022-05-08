import { setOptions } from "./config.js";
import initialize from "./initialize.js";
import sequencer from "./sequencer.js";

const pianoplayer = {
  api: (View) => {
    View.prototype.sequence = function () {
      if (arguments.length > 0) {
        setOptions(arguments);
      }

      initialize(this);
      sequencer(this);
      return this;
    };
  },
};

export default pianoplayer;
