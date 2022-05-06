import nlp from "compromise";
import * as extend from "./lib/compromise-extensions.js";
import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

export default function initialize() {
  const tags = mfs.loadJSONDir(dirs.tags, "tags");
  const words = mfs.loadJSONDir(dirs.words, "words");

  extend.addCustomTags(tags);
  extend.addCustomWords(words);
  nlp.plugin(extend.addDocMethods);
}
