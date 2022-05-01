import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-file-structure.js";

const file = path.join(dirs.baseData, "sequence.json");
const sequence = mfs.loadJSONFile(file, "array");

export default sequence;
