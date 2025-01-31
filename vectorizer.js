// You can rename your file from vectorizer.js to vectorizer.mjs. By doing so, Node.js will recognize it as an ES Module and allow the use of import and export.{"type": "module"}
// Alternatively, you can keep your .js extension, but you need to indicate that you're using ES Modules by adding "type": "module" to your package.json.   dkg: I opted for this option.

// If you don't want to change to an ES Module, you can use require instead of import. Dkg: I opted for this option as I used require in sharp.js file 

// https://www.npmjs.com/package/@neplex/vectorizer

const {
  vectorize,
  ColorMode,
  Hierarchical,
  PathSimplifyMode,
} = require("@neplex/vectorizer");
const { readFile, writeFile } = require("fs").promises;

async function vectorizeImage() {
  try {
    // Log reading file message
    console.log("Reading from file: JSON.png");

    // Read the raster image (ensure the file exists and is correct format)
    const src = await readFile("JSON.png"); // raster.png

    // Vectorize the image and convert to SVG
    const svg = await vectorize(src, {
      colorMode: ColorMode.Color,
      colorPrecision: 6,
      filterSpeckle: 4,
      spliceThreshold: 45,
      cornerThreshold: 60,
      hierarchical: Hierarchical.Stacked,
      mode: PathSimplifyMode.Spline,
      layerDifference: 5,
      lengthThreshold: 5,
      maxIterations: 2,
      pathPrecision: 5,
    });

    // Log the SVG output to check its structure
    console.log("SVG output:", svg);

    // Write the SVG content to a file
    console.log("Saving SVG to file...");
    await writeFile("JSON.svg", svg); // Vector.svg
    console.log("SVG saved successfully!");
  } catch (error) {
    console.error("Error processing the image:", error);
  }
}

// Run the function
vectorizeImage();








// import {
//   vectorize,
//   ColorMode,
//   Hierarchical,
//   PathSimplifyMode,
// } from "@neplex/vectorizer";
// import { readFile, writeFile } from "node:fs/promises";




// const src = await readFile("./json.png");

// const svg = await vectorize(src, {
//   colorMode: ColorMode.Color,
//   colorPrecision: 6,
//   filterSpeckle: 4,
//   spliceThreshold: 45,
//   cornerThreshold: 60,
//   hierarchical: Hierarchical.Stacked,
//   mode: PathSimplifyMode.Spline,
//   layerDifference: 5,
//   lengthThreshold: 5,
//   maxIterations: 2,
//   pathPrecision: 5,
// });

// console.log(svg); // <svg>...</svg>
// await writeFile("./json.svg", svg);
