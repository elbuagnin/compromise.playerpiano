import nlp from "compromise";
import * as extend from "./lib/compromise-extensions.js";
import * as mfs from "./lib/filesystem.js";
import dataPaths from "./data-interface/data-file-structure.js";

export default function initialize() {
  const tags = mfs.loadJSONDir(dataPaths.tagsPath, "tags");
  const words = mfs.loadJSONDir(dataPaths.wordsPath, "words");

  extend.addCustomTags(tags);
  extend.addCustomWords(words);
  nlp.plugin(extend.addDocMethods);
}
