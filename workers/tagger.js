import logger from "../lib/logger.js";

export default function tagger(doc, payload) {
  const { pattern, term, tag, untag, discern } = payload;

  if (doc.has(pattern)) {
    const matchedTerm = doc.match(pattern).match(term);

    if (
      (discern === true && !matchedTerm.has("#Resolved")) ||
      discern !== true
    ) {
      if (discern === true) {
        const oldTags = Object.values(matchedTerm.out("tags")[0])[0];
        logger("workers", "Removing previous tags", "header");
        matchedTerm.unTag(oldTags);
        matchedTerm.tag("Resolved");
      }
      if (untag) {
        logger("workers", "Un-Tagging", "header");
        logger("workers", untag, "label", "untagged");
        matchedTerm.unTag(untag);
        logger("workers", matchedTerm, "label", "matched term[s]");
      }
      if (tag) {
        logger("workers", "Tagging", "header");
        logger("workers", tag, "label", "tag");
        matchedTerm.tag(tag);
        logger("workers", matchedTerm, "label", "matched term[s]");
      }
    }
  }
}
