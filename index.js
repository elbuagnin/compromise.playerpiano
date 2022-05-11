import { setOptions, pianoOptions } from "./config.js";
import devLogger from "./lib/dev-logger.js";
import { surfaceCopy, equivalentDocs } from "./lib/doc-helpers.js";
import initialize from "./initialize.js";
import sequencer from "./workers/sequencer.js";

const pianoplayer = {
  api: (View) => {
    View.prototype.sequence = function () {
      function snapshot(doc, format = "formatless", message = "") {
        if (pianoOptions.verbose !== "none") {
          devLogger("changes", doc, format, message);
          return surfaceCopy(doc);
        } else {
          return false;
        }
      }

      if (arguments.length > 0) {
        setOptions(arguments);
      }

      initialize(this);
      const entryDoc = snapshot(this, "title", "Entry Document");
      sequencer(this);
      const exitDoc = snapshot(this, "title", "Exit Document");

      if (entryDoc !== false && exitDoc !== false) {
        if (!equivalentDocs(entryDoc, exitDoc)) {
          devLogger("changes", "There are changes to the Document.", "header");
        }
      }

      return this;
    };
  },
};

export default pianoplayer;
