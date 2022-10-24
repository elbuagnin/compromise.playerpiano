import path from "path";
import url from "url";
import fs from "fs";
import * as dp from "./data-path.js";

export default function dataPaths(arg, providedPath = false) {
  let baseDataPath = false;
  let classifiersPath = false;
  let initializationPath = false;

  if (dp.storedDataPath !== false) {
    baseDataPath = dp.storedDataPath;
  }

  if (baseDataPath !== false) {
    classifiersPath = path.join(baseDataPath, "classifiers");
    initializationPath = path.join(baseDataPath, "initialization");
  }

  switch (arg) {
    case "set":
      if (providedPath !== false) {
        dp.setDataPath(providedPath);
      } else {
        throw new Error("No data path provided by caller.");
      }
      break;

    case "classifiersPath":
      if (classifiersPath !== false) {
        return classifiersPath;
      } else {
        throw new Error("Path classifiersPath is not set.");
      }
      break;

    case "classifierKeysPath":
      if (classifiersPath !== false) {
        return path.join(classifiersPath, "classification-keys");
      } else {
        throw new Error("Path classifiersPath is not set.");
      }
      break;

    case "classifierByTermsPath":
      if (classifiersPath !== false) {
        return path.join(classifiersPath, "classifications-by-terms");
      } else {
        throw new Error("Path classifierByTermsPath is not set.");
      }
      break;

    case "classifierByClassificationsPath":
      if (classifiersPath !== false) {
        return path.join(classifiersPath, "terms-by-classifications");
      } else {
        throw new Error("Path classifierByClassificationsPath is not set.");
      }
      break;

    case "classifierPatternsPath":
      if (classifiersPath !== false) {
        return path.join(classifiersPath, "classifier-patterns");
      } else {
        throw new Error("Path classifierPatternsPath is not set.");
      }
      break;

    case "processorsPath":
      if (baseDataPath !== false) {
        return path.join(baseDataPath, "doc-processors");
      } else {
        throw new Error("Path processorsPath is not set.");
      }
      break;

    case "subSequencesPath":
      if (baseDataPath !== false) {
        return path.join(baseDataPath, "sub-sequences");
      } else {
        throw new Error("Path subSequencesPath is not set.");
      }
      break;

    case "tagPatternsPath":
      if (baseDataPath !== false) {
        return path.join(baseDataPath, "tag-by-patterns");
      } else {
        throw new Error("Path tagPatternsPath is not set.");
      }
      break;

    case "initializationPath":
      if (baseDataPath !== false) {
        return path.join(baseDataPath, "initialization");
      } else {
        throw new Error("Path initializationPath is not set.");
      }
      break;

    case "tagsPath":
      if (initializationPath !== false) {
        return path.join(initializationPath, "tags");
      } else {
        throw new Error("Path tagsPath is not set.");
      }
      break;

    case "wordsPath":
      if (initializationPath !== false) {
        return path.join(initializationPath, "words");
      } else {
        throw new Error("Path wordsPath is not set.");
      }
      break;

    default:
      throw new Error("Expecting new datapath or datapath request.");
  }
}
