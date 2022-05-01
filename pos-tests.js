import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

const posTests = mfs.loadJSONDir(classifierPatterns, true);

export default posTests;
