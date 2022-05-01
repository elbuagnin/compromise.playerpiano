import * as mfs from "./filesystem.js";
import * as dirs from "../data-file-structure.js";
import path from "path";

function loadWordNet(pos) {
  const returnType = "array";
  let filepath = dirs.classifierByClassifications;

  switch (pos) {
    case "jj":
      path.join(filepath, "adj.terms");
      break;
    case "rb":
      path.join(filepath, "adv.terms");
      break;
    case "nn":
      path.join(filepath, "noun.terms");
      break;
    case "vv":
      path.join(filepath, "verb.terms");
      break;
    default:
      break;
  }

  return mfs.loadTextFile(filepath, returnType);
}

export function hasPOS(word, pos) {
  word = word.toLowerCase();
  let termEntry = "";
  termEntry = loadWordNet(pos).find(entry => entry === word);
  if (termEntry !== "" && termEntry !== undefined) {
    return true;
  } else {
    return false;
  }
}

export function isVowel(character) {
  const vowels = "aeiou";
  if (vowels.includes(character)) {
    return true;
  } else {
    return false;
  }
}

export function vowelPattern(string) {
  let pattern = "";
  Object.values(string).forEach(character => {
    if (isVowel(character) === true) {
      pattern += "v";
    } else {
      pattern += "c";
    }
  });
  return pattern;
}
