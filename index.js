import initialize from "./initialize.js";
import sequencer from "./sequencer.js";

export const pianoplayerPlugin = {
  api: View => {
    View.prototype.sequence = function() {
      initialize(this);
      sequencer(this);
      return this;
    };
  }
};
