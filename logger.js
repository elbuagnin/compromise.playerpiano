import { pianoOptions } from "./config.js";

export default function logger(output, format = false, label = false) {
  const { verbose } = pianoOptions;
  let banner = "";

  if (verbose === true) {
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

    if (format === false) {
      format = "formatless";
    }

    let layout = label ? "label" : "nolabel";
    layout += "#" + format + "#" + outputType;

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
        console.log("label label object");
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
}
