import { setOptions } from "./config.js";
import { setDataPath } from "./data-interface/data-path.js";
import deasync from "deasync";

function setPlayerPianoOptions(path, options = false) {
  setDataPath(path);

  if (options) {
    setOptions(options);
  }
}

const playerpiano = {
  api: (View) => {
    View.prototype.sequence = function () {
      function runAsyncStart(doc) {
        import("./start.js")
          .then((start) => {
            start.default(doc);
            done = true;
          })
          .catch((err) => console.error(err));
      }

      const runSyncStart = deasync(runAsyncStart(this));
      let done = false;
      deasync.loopWhile(function () {
        return !done;
      });
    };
  },
};

export { setPlayerPianoOptions, playerpiano };
