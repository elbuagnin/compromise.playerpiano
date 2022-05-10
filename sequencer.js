import path from "path";
import logger from "./lib/logger.js";
import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-interface/data-file-structure.js";
import sequence from "./data-interface/sequence.js";
import parse from "./parser.js";

export default function sequencer(document) {
  // console\.log.*

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
              if (
                phraseBreak.ifNo("(#ListItem|#CoordinatingAdjectives)").found // Todo Is this still necessary?
              ) {
                chunks = chunks.splitAfter(phraseBreak);
              }
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
    const filepath = path.join(dirs.subSequences, file + ".json");

    const returnType = "array";
    const subSequence = mfs.loadJSONFile(filepath, returnType);
    subSequence.sort((a, b) => a.order - b.order);
    subSequence.forEach((subInstruction) => {
      logger(subInstruction, "subtitle", "sub-sequence instruction");
      execute(subInstruction);
    });
  }

  // sequencer main

  const sentences = document.sentences();
  sequence.sort((a, b) => a.order - b.order);

  sequence.forEach((instruction, key) => {
    logger(instruction, "title", "instruction");
    if (instruction.action === "sub-sequence") {
      subSequencer(instruction.payload.file);
    } else {
      execute(instruction);
    }
  });
  // console\.log.*
}
