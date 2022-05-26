import path from "path";
import url from "url";
import fs from "fs";
import { dataPath } from "./data-path.js";

const parentHome = dataPath;
const here = import.meta.url;
const baseData = path.join(parentHome, "/sequencing-data/");
const classifiers = path.join(baseData, "classifiers");

export function classifierKeys() {
  return path.join(classifiers, "classification-keys");
}
export function classifierByTerms() {
  return path.join(classifiers, "classifications-by-terms");
}
export function classifierByClassifications() {
  return path.join(classifiers, "terms-by-classifications");
}
export function classifierPatterns() {
  return path.join(classifiers, "classifier-patterns");
}
export function processors() {
  return path.join(baseData, "doc-processors");
}
export function subSequences() {
  return path.join(baseData, "sub-sequences");
}
export function tagPatterns() {
  return path.join(baseData, "tag-by-patterns");
}
export function initialization() {
  return path.join(baseData, "world-initialization");
}
export function tagsPath() {
  return path.join(initialization, "tags");
}
export function wordsPath() {
  return path.join(initialization, "words");
}
