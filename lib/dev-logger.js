import { pianoOptions } from "../config.js";

export default function devLogger(
  verbosity,
  output,
  format = "formatless",
  label = ""
) {
  function logOutput(output, format, label) {
    let banner = "";
    let outputType = typeof output;

    if (outputType === "object") {
      if (
        output.constructor.name === "View" ||
        output.constructor.name === "Sentences"
      ) {
        outputType = "doc";
      }
    }

    if (outputType === "number") {
      outputType = "string";
    }

    let layout = label !== "" ? "label" : "nolabel";
    layout += "#" + format + "#" + outputType;

    console.log(layout);

    switch (layout) {
      case "label#header#string":
        label = label.toUpperCase();
        console.log("\n" + label + ": " + output);
        break;
      case "label#label#string":
        label = label[0].toUpperCase() + label.substring(1);
        console.log(label + ": " + output);
        break;
      case "nolabel#title#string":
        banner = banner.padStart(output.length, "*");
        output = output.toUpperCase();
        console.log("\n" + banner);
        console.log(output);
        break;
      case "nolabel#subtitle#string":
        banner = banner.padStart(output.length, "-");
        output = output.toUpperCase();
        console.log("\n" + banner);
        console.log(output);
        break;
      case "nolabel#header#string":
        output = output.toUpperCase();
        console.log("\n" + output);
        break;
      case "nolabel#formatless#string":
        console.log(output);
        break;
      case "label#title#object":
        banner = banner.padStart(label.length, "*");
        label = label.toUpperCase();
        console.log("\n" + banner);
        console.log(label);
        console.log(output);
        break;
      case "label#subtitle#object":
        banner = banner.padStart(label.length, "-");
        label = label.toUpperCase();
        console.log("\n" + banner);
        console.log(label);
        console.log(output);
        break;
      case "label#header#object":
        label = label.toUpperCase();
        console.log("\n" + label);
        console.log(output);
        break;
      case "label#label#object":
        label = label[0].toUpperCase() + label.substring(1);
        console.log(label + output);
        break;
      case "nolabel#formatless#object":
        console.log(output);
        break;
      case "label#title#doc":
        banner = banner.padStart(label.length, "*");
        label = label.toUpperCase();
        console.log("\n" + banner);
        console.log(label);
        output.debug();
        break;
      case "label#subtitle#doc":
        banner = banner.padStart(label.length, "-");
        label = label.toUpperCase();
        console.log("\n" + banner);
        console.log(label);
        output.debug();
        break;
      case "label#header#doc":
        label = label.toUpperCase();
        console.log("\n" + label);
        output.debug();
        break;
      case "label#label#doc":
        label = label[0].toUpperCase() + label.substring(1);
        console.log("\n" + label);
        output.debug();
        break;
      case "nolabel#formatless#doc":
        output.debug();
        break;
      default:
        break;
    }
  }

  // Main
  const { verbose } = pianoOptions;
  let showIt = false;
  let level = 0;

  if (verbose !== "none" && verbose !== false && verbose !== undefined) {
    switch (verbosity) {
      case "results":
        level = 1;
        break;
      case "instructions":
        level = 2;
        break;
      case "changes":
        level = 3;
        break;
      case "workers":
        level = 4;
        break;
      case "details":
        level = 5;
        break;
      default:
        level = 0;
        break;
    }

    switch (verbose) {
      case "details":
        if (level <= 5) {
          showIt = true;
        }
        break;
      case "workers":
        if (level <= 4) {
          showIt = true;
        }
        break;
      case "changes":
        if (level <= 3) {
          showIt = true;
        }
        break;
      case "instructions":
        if (level <= 2) {
          showIt = true;
        }
        break;
      case "results":
        if (level <= 1) {
          showIt = true;
        }
        break;
      default:
        break;
    }

    if (showIt === true) {
      logOutput(output, format, label);
    }
  }
}
