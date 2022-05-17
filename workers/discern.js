import devLogger from "../lib/dev-logger.js";
import nlp from "compromise";
import classificationNameNormalize from "../data-interface/classifications-key.js";
import classifyByPatternTests from "../data-interface/classifier-patterns.js";
import tagExceptions from "../data-interface/remove-old-tag-exceptions-list.js";

export default function discern(doc, term, match) {
  function compromiseTagFormat(tag) {
    return "#" + tag.charAt(0).toUpperCase() + tag.slice(1);
  }

  function clearOldTags(docWord) {
    const oldTags = Object.values(docWord.out("tags")[0])[0];

    const filteredTags = oldTags.filter((tag) => {
      if (!tagExceptions.includes(tag)) {
        return tag;
      }
    });

    devLogger("details", "Removing Old Tags", "header");
    devLogger("details", filteredTags, "label", "Untagging");

    docWord.unTag(filteredTags);
  }

  function isClassification(word, classification, match) {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@ " + typeof word);
    function testing(tests, match) {
      function findChunk(scope) {
        if (scope === "phrase") {
          return doc;
        } else if (scope === "sentence") {
          if (doc.all() === doc) {
            return doc;
          } else {
            return doc.all();
          }
        }
      }

      function score(type) {
        switch (type) {
          case "negative":
            return -2;
          case "improbable":
            return -1;
          case "probable":
            return 1;
          case "positive":
            return 2;
          default:
            return 0;
        }
      }

      function wordsInPattern(pattern) {
        let count = 0;

        count -= pattern.split(/\(.+&&.+\)/).length - 1;
        count -= pattern.split(/\|/).length - 1;
        count += pattern.split(/[\w|-|_|#|\?|\+]+/).length - 1;
        count += pattern.split(/\s\d+\s/).length - 1;

        if (count < 0) {
          count = 0;
        }

        // console.log("total count of words = " + count);
        return count;
      }

      // isClassification main
      devLogger(
        "workers",
        classification,
        "header",
        "Testing for Classification"
      );

      tests.forEach((test) => {
        //devLogger("details", "\n" + test.pattern, "label", "  ");

        let chunk = findChunk(test.scope);
        let patternWord = "%word%";

        const regex = /\(\s?%word%\s?&&\s?\/?\^?\!?#?(?:\w|-|_)+\$?\/?\s?\)|\(\s?\/?\^?\!?#?(?:\w|-|_)+\$?\/?\s?&&\s?%word%\s?\)/;
        if (test.pattern.match(regex)) {
          patternWord = test.pattern.match(regex);
        }

        const splitPatterns = test.pattern.split(patternWord);
        const frontPattern = splitPatterns[0].trim();
        const backPattern = splitPatterns[1].trim();

        let patternType = 0;

        if (frontPattern) {
          patternType += 1;
        }
        if (backPattern) {
          patternType += 2;
        }

        let length = 0;
        let selection = "";
        let wholePattern = "";

        switch (patternType) {
          case 1:
            length = wordsInPattern(frontPattern) + 1;
            wholePattern = [frontPattern, patternWord].join(" ");
            // selection = chunk.match(chunk.match(match).previous(length));
            // selection = selection.union(match).settle();
            selection = chunk.match(match).previous(length).union(match);

            break;
          case 2:
            length = wordsInPattern(backPattern) + 1;
            wholePattern = [patternWord, backPattern].join(" ");
            // selection = chunk.match(chunk.match(match).next(length));
            // selection = match.union(selection).settle();
            selection = chunk.match(match).union(match.next(length));
            break;
          case 3:
            length = wordsInPattern(frontPattern) + 1;
            selection = chunk.match(match).previous(length).union(match);
            selection = selection.union(match);
            length = wordsInPattern(backPattern) + 1;
            selection = selection.union(chunk.match(match).next(length));

            wholePattern = [frontPattern, patternWord, backPattern].join(" ");

            break;
          default:
            break;
        }
        if (typeof word === "object") {
          word = word.text();
        }
        const selectionClone = nlp(selection.text());
        wholePattern = wholePattern.replace("%word%", word).trim();
        // console.log("\nWhole Pattern: " + wholePattern);
        //console.log("Selection: " + selection.text());
        // selectionClone.debug();
        const selectionMatch = selectionClone.match(wholePattern);
        //console.log("Selection matches: " + selectionMatch.text());
        // selectionMatch.debug();
        if (selectionMatch.found) {
          result += score(test.type);
          console.log(result);
        }

        //devLogger("details", result, "label", "score");
      });
    }

    let result = 0;
    const testTypes = ["negative", "improbable", "probable", "positive"];
    const testSet = classifyByPatternTests.filter(
      (test) => test.classification === classification
    );

    testTypes.forEach((type) => {
      const tests = testSet.filter((test) => test.type === type);
      testing(tests, match);
    });

    return result;
  }

  function discernResults(results) {
    const ties = [];
    const winner = Object.keys(results).reduce((previous, current) => {
      const diff = results[current] - results[previous];

      switch (Math.sign(diff)) {
        case -1:
          return previous;
        case 0:
          ties.push(previous);

          return current;
        case 1:
          ties.length = 0;
          return current;
        default:
          break;
      }
    });

    if (ties.length > 0) {
      ties.push(winner);
      return ties;
    } else {
      return [winner];
    }
  }

  ///////
  // Main

  const word = term.word;
  devLogger("workers", word, "subtitle", "term");

  if (!match.has("#Resolved")) {
    const classifications = term.classifications.map((classification) =>
      classificationNameNormalize(classification)
    );

    const results = {};
    Object.values(classifications).forEach((classification) => {
      results[classification] = 0;
    });

    Object.values(classifications).forEach((classification) => {
      results[classification] = isClassification(word, classification, match);
    });

    const winner = discernResults(results);

    if (winner.length > 1) {
      return;
    } else {
      const discernedClassification = compromiseTagFormat(winner[0]);
      devLogger("changes", match, "header", discernedClassification);

      if (match.has(discernedClassification)) {
        match.tag("Resolved");

        return;
      } else {
        clearOldTags(match);
        match.tag(discernedClassification);
        match.tag("Resolved");

        return;
      }
    }
  }
}
