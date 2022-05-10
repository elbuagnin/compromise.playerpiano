import path from "path";
import deasync from "deasync";
import devLogger from "../lib/dev-logger.js";
import * as dirs from "../data-interface/data-file-structure.js";
import * as docHelpers from "../lib/doc-helpers.js";

// Run custom imported functions from calling module.
export default function process(doc, parsingData) {
  // Import dynamically calling module's custom functions
  // import() is asynchronous, so we will have to call it
  // in a fashion to wrap it synchronously.
  function runAsyncProcess(processPath, doc) {
    import(processPath)
      .then((proc) => {
        proc.default(doc);
        done = true;
      })
      .catch((err) => console.error(err));
  }

  const { process } = parsingData;
  const processPath = path.join(
    dirs.parentHome,
    dirs.processors,
    process + ".js"
  );

  let before = docHelpers.surfaceCopy(doc); // for debugging output

  const runProcess = deasync(runAsyncProcess(processPath, doc));
  let done = false;
  deasync.loopWhile(function () {
    return !done;
  });

  const after = docHelpers.surfaceCopy(doc); // for debugging output

  // Send debugging output if there is a change in the doc.
  if (docHelpers.equivalentDocs(before, after) === false) {
    devLogger("workers", doc, "header", "Processed: " + process);
  }
}
