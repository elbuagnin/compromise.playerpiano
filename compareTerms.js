import * as mfs from "./lib/filesystem.js";

const compareFilePath = "/data/compare/";
const compareTerms = mfs.loadJSONDir(compareFilePath, true);

export default function filterTerms(list) {
  const filteredTerms = compareTerms.filter(term => term.list === list);
  return filteredTerms;
}
