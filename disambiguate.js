import logger from "./logger.js";
import classifications from "./classifications-key.js";
import classifyByPatternTests from "./classifier-patterns.js";

export default function disambiguate(doc, term, match) {
  function compromiseTagged(tag) {
    return "#" + tag.charAt(0).toUpperCase() + tag.slice(1);
  }

  function clearOldTags(docWord) {
    const tagExceptions = [
      "Period",
      "Comma",
      "ListItem",
      "QuestionMark",
      "ExclamationPoint",
      "Semicolon",
      "OpenParentheses",
      "CloseParentheses",
      "OpenQuote",
      "CloseQuote",
    ];

    const oldTags = Object.values(docWord.out("tags")[0])[0];

    const filteredTags = oldTags.filter((tag) => {
      if (!tagExceptions.includes(tag)) {
        return tag;
      }
    });

    docWord.unTag(filteredTags);
  }

  function isClassification(word, classification, match) {
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
        count += pattern.split(/[\w|-|_]+/).length - 1;
        count += pattern.split(/\s\d+\s/).length - 1;
        if (count < 0) {
          count = 0;
        }

        return count;
      }

      tests.forEach((test) => {
        let chunk = findChunk(test.scope);

        let frontPattern = test.pattern.substring(
          0,
          test.pattern.indexOf("%word%")
        );

        let backPattern = test.pattern.substring(
          test.pattern.indexOf("%word%") + 6
        );

        let patternType = 0;

        if (frontPattern) {
          patternType += 1;
        }
        if (backPattern) {
          patternType += 2;
        }

        let length = 0;
        let selection = "";

        switch (patternType) {
          case 1:
            length = wordsInPattern(frontPattern);
            selection = chunk.match(chunk.match(match).previous(length));

            if (selection.match(frontPattern).found) {
              result += score(test.type);
              // console\.log.*
              // console\.log.*
              // console\.log.*
              // console\.log.*
            }
            break;
          case 2:
            length = wordsInPattern(backPattern);
            selection = chunk.match(chunk.match(match).next(length));

            if (selection.match(backPattern).found) {
              result += score(test.type);
              // console\.log.*
              // console\.log.*
              // console\.log.*
              // console\.log.*
            }
            break;
          case 3:
            length = wordsInPattern(frontPattern);
            selection = chunk.match(chunk.match(match).previous(length));
            // // console\.log.*
            selection = selection.union(match);
            // // console\.log.*
            length = wordsInPattern(backPattern);
            selection = selection.union(
              chunk.match(chunk.match(match).next(length))
            );
            // // console\.log.*

            break;
          default:
            break;
        }
      });
    }

    let result = 0;
    const testTypes = ["negative", "improbable", "probable", "positive"];
    const testSet = classifyByPatternTests.filter(
      (test) => test.pos === classification
    );

    testTypes.forEach((type) => {
      const tests = testSet.filter((test) => test.type === type);
      testing(tests, match);
    });

    return result;
  }

  function disambiguateResults(results) {
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
  // console\.log.*
  if (!match.has("#Resolved")) {
    const POSes = term.POSes.map((pos) => classifications(pos));

    const results = {};
    Object.values(POSes).forEach((pos) => {
      results[pos] = 0;
    });

    Object.values(POSes).forEach((pos) => {
      results[pos] = isClassification(word, pos, match);
    });
    // console\.log.*
    const winner = disambiguateResults(results);

    if (winner.length > 1) {
      return;
    } else {
      const disambiguatedPOS = compromiseTagged(winner[0]);

      if (match.has(disambiguatedPOS)) {
        match.tag("Resolved");

        return;
      } else {
        clearOldTags(match);
        match.tag(disambiguatedPOS);
        match.tag("Resolved");
        logger(match, "label", "Disambiguated");

        return;
      }
    }
  }
}
