import * as mfs from "../lib/filesystem.js";
import dataPaths from "./data-file-structure.js";

export default function classifyByPatternTests() {
  return mfs.loadJSONDir(dataPaths("classifierPatternsPath"), true);
}
