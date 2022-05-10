import * as mfs from "../lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

const classificationTerms = mfs.loadJSONDir(dirs.classifierByTerms, true);

export default function filterTerms(list) {
  const filteredTerms = classificationTerms.filter(
    (term) => term.list === list
  );
  return filteredTerms;
}
