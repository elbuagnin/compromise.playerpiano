import path from "path";
import * as mfs from "../lib/filesystem.js";
import * as dirs from "../data-interface/data-file-structure.js";
import { dataPath, setDataPath } from "../data-interface/data-path.js";
import devLogger from "../lib/dev-logger.js";
import parse from "./parser.js";

export default function sequencer(
  document,
  instructions,
  callingDataPath = false
) {
  if (callingDataPath !== false) {
    setDataPath(callingDataPath);
  }

  console.log("dataPath = " + dataPath);
  function execute(instruction) {
    const { scope } = instruction;

    if (scope === "document") {
      parse(document, instruction);
    } else {
      sentences.forEach((sentence) => {
        if (scope === "sentence") {
          parse(sentence, instruction);
        } else {
          // Scope = 'phrase' assumed
          let chunks = sentence;
          if (sentence.has("#PhraseBreak")) {
            const phraseBreaks = sentence.match("#PhraseBreak");
            phraseBreaks.forEach((phraseBreak) => {
              chunks = chunks.splitAfter(phraseBreak);
            });
          }

          chunks.forEach((chunk) => {
            parse(chunk, instruction);
          });
        }
      });
    }
  }

  function subSequencer(file) {
    const filepath = path.join(dataPath + "/sub-sequences/", file + ".json");

    const returnType = "array";
    const subSequence = mfs.loadJSONFile(filepath, returnType);
    subSequence.sort((a, b) => a.order - b.order);
    subSequence.forEach((subInstruction) => {
      devLogger(
        "instructions",
        subInstruction,
        "subtitle",
        "sub-sequence instruction"
      );
      execute(subInstruction);
    });
  }

  // sequencer main

  const sentences = document.sentences();
  instructions.sort((a, b) => a.order - b.order);

  instructions.forEach((instruction, key) => {
    devLogger("instructions", instruction, "title", "instruction");

    if (instruction.action === "sub-sequence") {
      subSequencer(instruction.payload.file);
    } else {
      execute(instruction);
    }

    devLogger("changes", document, "label", "post-instruction");
  });
}
