import path from ('path');

const baseDataPath = "./sequencing-data/";
const classifiersPath = path.join(baseDataPath, "classifiers");
const classifierKeysPath = path.join(classifiersPath, "classification-keys");
const classifierByTermsPath = path.join(classifiersPath, "classifications-by-terms");
const classifierByClassificationsPath = path.join(classifiersPath,
  "terms-by-classifications"
);
const classifierPatternsPath = path.join(classifiersPath, "classifier-patterns");
const processorsPath = path.join(baseDataPath, "doc-processors");
const subSequencesPath = path.join(baseDataPath, "sub-sequences");
const tagPatternsPath = path.join(baseDataPath, "tag-by-patterns");
const initializationPath = path.join(baseDataPath, "world-initialization");
const tagsPath = path.join(initializationPath, "tags");
const wordsPath = path.join(initializationPath, "words");
