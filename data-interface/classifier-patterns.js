import * as mfs from "../lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

export default function classificationTests() {
  return mfs.loadJSONDir(dirs.classifierPatterns, true);
}
