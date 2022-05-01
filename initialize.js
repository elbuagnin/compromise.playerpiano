import * as extend from "./lib/compromise-extensions.js";
import * as mfs from "./lib/filesystem.js";
import "./data-file-structure.js";

export default function initialize() {
  const tags = mfs.loadJSONDir(tagsPath, "tags");
  const words = mfs.loadJSONDir(wordsPath, "words");

  extend.addCustomTags(tags);
  extend.addCustomWords(words);
}
