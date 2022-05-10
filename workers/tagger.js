import devLogger from "../lib/dev-logger.js";

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
        devLogger("workers", "Removing previous tags", "header");
        matchedTerm.unTag(oldTags);
        matchedTerm.tag("Resolved");
      }
      if (untag) {
        devLogger("workers", "Un-Tagging", "header");
        devLogger("workers", untag, "label", "untagged");
        matchedTerm.unTag(untag);
        devLogger("workers", matchedTerm, "label", "matched term[s]");
      }
      if (tag) {
        devLogger("workers", "Tagging", "header");
        devLogger("workers", tag, "label", "tag");
        matchedTerm.tag(tag);
        devLogger("workers", matchedTerm, "label", "matched term[s]");
      }
    }
  }
}
