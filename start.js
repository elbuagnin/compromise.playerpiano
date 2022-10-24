import { pianoOptions } from "./config.js";
import devLogger from "./lib/dev-logger.js";
import { surfaceCopy, equivalentDocs } from "./lib/doc-helpers.js";
import initialize from "./initialize.js";
import sequencer from "./workers/sequencer.js";

export default function startPiano(doc) {
  function snapshot(doc, format = "formatless", message = "") {
    if (pianoOptions.verbose !== "none") {
      devLogger("results", doc, format, message);
      return surfaceCopy(doc);
    } else {
      return false;
    }
  }

  initialize(doc);
  const entryDoc = snapshot(doc, "title", "Entry Document");
  sequencer(doc);
  const exitDoc = snapshot(doc, "title", "Exit Document");

  if (entryDoc !== false && exitDoc !== false) {
    if (!equivalentDocs(entryDoc, exitDoc)) {
      devLogger("results", "There are changes to the Document.", "header");
    }
  }
}
