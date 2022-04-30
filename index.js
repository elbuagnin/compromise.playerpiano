import initialize from "./initialize.js";
import sequencer from "./sequencer.js";

const pianoplayerPlugin = {
  api: View => {
    View.prototype.sequence = function() {
      initialize(this);
      sequencer(this);
      return this;
    };
  }
};

export default pianoplayerPlugin;
