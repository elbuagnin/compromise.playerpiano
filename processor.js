import path from "path";
import deasync from "deasync";
import logger from "./logger.js";
import * as dirs from "./data-file-structure.js";
import * as helpers from "./lib/word-helpers.js";

// Run custom imported functions from calling module.
export default function process(doc, parsingData) {
  // Compare two doc objects to see if they are equivalent in words and tags.
  function equivalentDocs(docA, docB) {
    let termListLength = 0;
    if (docA.length === docB.length) {
      termListLength = docA.length;

      let m = 0;

      for (let i = 0; i < termListLength; i++) {
        let n = 0;
        let tagCount = 0;
        const docATags = docA[i].tags;
        const docBTags = docB[i].tags;

        if (Object.keys(docATags).length === Object.keys(docBTags).length) {
          Object.keys(docATags).forEach((docATag) => {
            tagCount++;

            Object.keys(docBTags).forEach((docBTag) => {
              if (docATag === docBTag) {
                n++;
              }
            });
          });

          if (n === tagCount) {
            m++;
          }
        } else {
          return false;
        }
      }

      if (m === termListLength) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  // Make a copy of doc of just what is needed for equivalentDocs().
  function surfaceCopy(doc) {
    const copy = doc.copy();
    const copycopy = copy.map((term) => {
      return { text: term.text, tags: term.tags };
    });
    return copycopy;
  }

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

  let before = surfaceCopy(doc); // for debugging output

  const runProcess = deasync(runAsyncProcess(processPath, doc));
  let done = false;
  deasync.loopWhile(function () {
    return !done;
  });

  const after = surfaceCopy(doc); // for debugging output

  // Send debugging output if there is a change in the doc.
  if (equivalentDocs(before, after) === false) {
    logger(doc, "header", "Processed: " + process);
  }
}
