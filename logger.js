import { pianoOptions } from "./config.js";

export default function logger(output, format = false, label = false) {
  const { verbose } = pianoOptions;
  let banner = "";
  if (verbose === true) {
    // Format the label &|| output.
    if (format && label) {
      switch (format) {
        case "label":
          label = label[0].toUpperCase() + label.substring(1);
          break;
        case "header":
          label = label.toUpperCase();
          break;
        case "title":
          label = label.toUpperCase();
          banner = Object.keys(label).forEach((letter) => {
            banner += "*";
          });
          break;
        default:
          break;
      }
    } else {
      switch (format && typeof output === "string") {
        case "header":
          label = output.toUpperCase();
          output = "";
          break;
        case "title":
          label = output.toUpperCase();
          banner = Object.keys(label).forEach((letter) => {
            banner += "*";
          });
          output = "";
          break;
        default:
          break;
      }
    }

    // Send output.
    if (typeof output === "object") {
      if (format === "header" || format === "title") {
        console.log("\n");
      }

      if (
        output.constructor.name === "View" ||
        output.constructor.name === "Sentences"
      ) {
        // doc Object
        if (label && format === "header") {
          console.log(label);
        }

        output.debug();
      } else {
        // other Object
        if (label && format === "label") {
          console.log(label + ":\n" + output);
        } else {
          console.log(output);
        }
      }
    } else {
      // Straight text
      switch (format) {
        case "header":
          if (label) {
            console.log(label + ": " + output);
          }
          break;
        case "title":
          console.log(banner);
          console.log(label);
          break;
        default:
          break;
      }
    }
  }
}
