import path from "path";
import * as dirs from "./data-file-structure.js";
import * as helpers from "./lib/word-helpers.js";
import deasync from "deasync";

export default function process(doc, parsingData) {
  function equivalentDocs(docA, docB) {
    let termListLength = 0;
    if (docA.termList().length === docB.termList().length) {
      termListLength = docA.termList().length;

      let m = 0;

      for (let i = 0; i < termListLength; i++) {
        let n = 0;
        let tagCount = 0;
        const docATags = docA.termList()[i].tags;
        const docBTags = docB.termList()[i].tags;

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

  function runAsyncProcess(processPath, doc) {
    import(processPath)
      .then((proc) => {
        proc.default(doc);
        done = true;
      })
      .catch((err) => console.error(err));
  }

  const { process } = parsingData;
  console.log(process);
  const processPath = path.join(
    dirs.parentBase,
    dirs.processors,
    process + ".js"
  );
  console.log("pp: " + processPath);

  const before = doc.clone();
  let done = false;
  const runProcess = deasync(runAsyncProcess(processPath, doc));
  deasync.loopWhile(function () {
    return !done;
  });

  console.log("Just past the process call.");
  const after = doc.clone();

  console.log("Before:");
  before.debug();
  console.log("After:");
  after.debug();

  if (equivalentDocs(before, after) === false) {
    console.log("Processed:");
    doc.debug();
  }
}
