import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-file-structure.js";
import path from "path";

const posNameTableFile = path.join(dirs.classifierKeys, "pos-name-table.json");
const posNameTable = mfs.loadJSONFile(posNameTableFile, "array");

export default function classificationNameNormalize(posNameFromData) {
  const dropCapitalPosNameFromData =
    posNameFromData[0].toLowerCase() + posNameFromData.slice(1);
  let normalizedName = false;

  Object.values(posNameTable).forEach(pos => {
    if (pos.abbreviation === dropCapitalPosNameFromData) {
      normalizedName = pos.fullname;
    } else if (pos.fullname === dropCapitalPosNameFromData) {
      normalizedName = pos.fullname;
    }
  });

  return normalizedName;
}
