import * as mfs from "./lib/filesystem.js";
import "./data-file-structure.js";

const file = baseDataPath.join("sequence.json");
const sequence = mfs.loadJSONFile(file, "array");

export default sequence;
