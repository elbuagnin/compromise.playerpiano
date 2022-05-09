import * as mfs from "./lib/filesystem.js";
import * as dirs from "./data-file-structure.js";
import path from "path";

const list = true;
const classificationNames = mfs.loadJSONDir(dirs.classifierKeys, list);

export default function classificationNameNormalize(
  classificationNameFromData
) {
  const dropCapitalClassificationNameFromData =
    classificationNameFromData[0].toLowerCase() +
    classificationNameFromData.slice(1);
  let normalizedName = false;

  Object.values(classificationNames).forEach((classification) => {
    if (classification.abbreviation === dropCapitalClassificationNameFromData) {
      normalizedName = classification.fullname;
    } else if (
      classification.fullname === dropCapitalClassificationNameFromData
    ) {
      normalizedName = classification.fullname;
    }
  });

  return normalizedName;
}
