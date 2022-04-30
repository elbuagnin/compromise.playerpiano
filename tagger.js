export default function tagger(doc, payload) {
  const { pattern, term, tag, untag, compare } = payload;

  if (doc.has(pattern)) {
    const matchedTerm = doc.match(pattern).match(term);

    if (
      (compare === true && !matchedTerm.has("#Resolved")) ||
      compare !== true
    ) {
      if (compare === true) {
        const oldTags = Object.values(matchedTerm.out("tags")[0])[0];
        matchedTerm.unTag(oldTags);
        matchedTerm.tag("Resolved");
      }
      if (untag) {
        matchedTerm.unTag(untag);
      }
      if (tag) {
        matchedTerm.tag(tag);
      }
      // console\.log.*

    } else {
      // console\.log.*
    }
  }
}
