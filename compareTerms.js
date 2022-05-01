import * as mfs from "./lib/filesystem.js";
import "./data-file-structure";

const compareTerms = mfs.loadJSONDir(classifierByTermsPath, true);

export default function filterTerms(list) {
  const filteredTerms = compareTerms.filter(term => term.list === list);
  return filteredTerms;
}
