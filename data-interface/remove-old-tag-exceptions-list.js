import path from "path";
import * as mfs from "../lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

export default function tagExceptions() {
  const file = path.join(dirs.classifiers, "remove-old-tag-exceptions.list");
  return mfs.loadTextFile(file);
}
