import path from "path";
import { fileURLToPath } from "url";
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
      .then((processModule) => {
        processModule.processor(doc);
        finished = true;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  const { process } = parsingData;
  const processPath = path.join(dirs.processors, process + ".js");
  const relativeProcessPath = path.relative(
    fileURLToPath(import.meta.url),
    processPath
  );
  console.log(import.meta.url);
  console.log(processPath);
  console.log(relativeProcessPath);

  let before = docHelpers.surfaceCopy(doc); // for debugging output

  const runProcess = deasync(runAsyncProcess(relativeProcessPath, doc));
  let finished = false;
  deasync.loopWhile(function () {
    console.log(finished);
    return !finished;
  });

  const after = docHelpers.surfaceCopy(doc); // for debugging output

  // Send debugging output if there is a change in the doc.
  if (docHelpers.equivalentDocs(before, after) === false) {
    devLogger("changes", doc, "header", "Processed: " + process);
  }
}
