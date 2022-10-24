import path from "path";
import * as mfs from "../lib/filesystem.js";
import dataPaths from "./data-file-structure.js";

export default function tagExceptions() {
  const file = path.join(
    dataPaths("classifiersPath"),
    "remove-old-tag-exceptions.list"
  );
  return mfs.loadTextFile(file);
}
