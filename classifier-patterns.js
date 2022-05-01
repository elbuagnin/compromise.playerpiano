import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-file-structure.js";
import path from "path";

const posTestsPath = path.join(dirs.classifierPatterns, "pos-tests");
const posTests = mfs.loadJSONDir(posTestsPath, true);

export default posTests;
