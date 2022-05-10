import path from "path";
import * as mfs from "../lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

const file = path.join(dirs.classifiers, "remove-old-tag-exceptions.list");
const tagExceptions = mfs.loadTextFile(file);

export default tagExceptions;
