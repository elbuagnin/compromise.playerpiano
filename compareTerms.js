import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

const compareTerms = mfs.loadJSONDir(classifierByTerms, true);

export default function filterTerms(list) {
  const filteredTerms = compareTerms.filter(term => term.list === list);
  return filteredTerms;
}
