import path from "path";
import * as dirs from "./data-file-structure.js";
import * as helpers from "./lib/word-helpers.js";

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
          Object.keys(docATags).forEach(docATag => {
            tagCount++;

            Object.keys(docBTags).forEach(docBTag => {
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

  async function runProcess(process, doc) {
    const processPath = path.join(dirs.parentBase, dirs.processors, process + ".js");
    console.log('pp: ' + processPath);

    const processor = await import(processPath);
    processor.default(doc);
    console.log(JSON.stringify(processor));
  }

  const { process } = parsingData;

  const before = doc.clone();
  runProcess(process, doc);
  const after = doc.clone();

  if (equivalentDocs(before, after) === false) {
    console.log('Processed:');
    doc.debug();
  }
}
