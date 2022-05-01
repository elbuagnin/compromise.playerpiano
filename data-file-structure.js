const baseDataPath = "/sequencing-data/";
const classifiersPath = baseDataPath.join("classifiers");
const classifierKeysPath = classifiersPath.join("classification-keys");
const classifierByTermsPath = classifiersPath.join("classifications-by-terms");
const classifierByClassificationsPath = classifiersPath.join(
  "terms-by-classifications"
);
const classifierPatternsPath = classifiersPath.join("classifier-patterns");
const processorsPath = baseDataPath.join("doc-processors");
const subSequencesPath = baseDataPath.join("sub-sequences");
const tagPatternsPath = baseDataPath.join("tag-by-patterns");
const initializationPath = baseDataPath.join("world-initialization");
const tagsPath = initializationPath.join("tags");
const wordsPath = initializationPath.join("words");
