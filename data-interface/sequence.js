import * as mfs from "../lib/filesystem.js";
import * as dirs from "./data-file-structure.js";
import path from "path";

export default function sequence() {
  const file = path.join(dirs.baseData, "sequence.json");
  return mfs.loadJSONFile(file, "array");
}
