# compromise.playerpiano

## Discontinued & Archived. It was a fun project but is no longer applicable.

A sequencer to automate parsing text using the NLP module, [Compromise](https://github.com/spencermountain/compromise)

The Player Pianos of old would mechanically pull through a perforated sheet
to operate a piano and play a song. Compromise.playerpiano does the same. But
instead it runs through a sequence of user-provided commands to 'play' through the
natural language processor, Compromise, to manipulate sentences to find patterns
and perform tagging. The end result is like some gigantic function, created by
the user to manipulate and transform tagging on documents.

## Use Cases

- Run additional post-processing on Compromise
- Explore and tag parts of speech in more detail
- Tag terms for specialized fields (science, business,etc)
- Analyze writings
- prepare input for computer games
- and so forth ...

## Set Up

#### Install into your Node.js module

```
npm install spencermountain/compromise
npm install elbuagnin/compromise.playerpiano
```

#### Create a directory structure for the sequences (see [Wiki](https://github.com/elbuagnin/compromise.playerpiano/wiki)).

```
[+] sequencing-data
 --- [+] classifiers
 --- [+] doc-processors
 --- [+] sub-sequences
```

##### etc.

#### Create the instruction sequences (see [Wiki](https://github.com/elbuagnin/compromise.playerpiano/wiki)).

##### Example

```
"Initial Document Pattern Tagging": {
    "order": "2",
    "action": "tag",
    "parseBy": "pattern",
    "scope": "document",
    "source": "directory",
    "payload": { "directory": "pre-processing" }
  },

  "Compound Terms": {
    "order": "3",
    "action": "tag",
    "parseBy": "pattern",
    "scope": "document",
    "source": "directory",
    "payload": { "directory": "compound-terms" }
  },
```

##### etc.

#### Call it from your code

##### Example

```
import http from "http";
import { readFile } from "fs";
import nlp from "compromise";
import playerpiano from 'compromise.playerpiano';

function test() {
  readFile("./sample.txt", "utf8", (err, data) => {
    if (err) {
      throw new Error(err);
    }

    nlp.plugin(pianoplayer);
    const doc = nlp(data);
    doc.sequence();

    doc.debug();
  });
}

function requestListener(req, res) {
  res.writeHead(200);
  test();
  res.end("Player Piano Test::");
}

const server = http.createServer(requestListener);
server.listen(8080);

```

## Documentation

[compromise.playerpiano documentation](https://github.com/elbuagnin/compromise.playerpiano/wiki)
