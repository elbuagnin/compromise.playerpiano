import * as mfs from "../lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

export default function filterTerms(list) {
  const classificationTerms = mfs.loadJSONDir(dirs.classifierByTerms, true);
  const filteredTerms = classificationTerms.filter(
    (term) => term.list === list
  );
  return filteredTerms;
}
