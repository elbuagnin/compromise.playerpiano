import * as mfs from "./lib/filesystem.js";
import "./data-file-structure";

const posTests = mfs.loadJSONDir(classifierPatternsPath, true);

export default posTests;
