import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

const disambiguateTerms = mfs.loadJSONDir(dirs.classifierByTerms, true);

export default function filterTerms(list) {
  const filteredTerms = disambiguateTerms.filter(term => term.list === list);
  return filteredTerms;
}
