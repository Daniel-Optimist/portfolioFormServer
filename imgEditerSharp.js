//  youtube : https://www.youtube.com/watch?v=107-BSLMwnw
// blog : https://shillehtek.com/blogs/news/pixel-editing-in-node-js-with-sharp-step-by-step?utm_source=youtube&utm_medium=product_shelf

// watermarking poster image: https://www.youtube.com/watch?v=u9zFztg7MXc

// node.js image optimization with sharp 5 min: https://www.youtube.com/watch?v=2uqdstsb8WI
const sharp = require("sharp");
const imagePath = "JSON.webp";
const width = 256;
const height = 256;

sharp(imagePath)
  .resize(width, height, {
    fit: "contain",
    // background: { r: 255, g: 255, b: 0 }  // Uncomment if you want a yellow background
  })
  .toFormat("png")  // Change the output format to PNG
  .toFile("JSON.png", (err) => {
    if (err) {
      console.error("Error resizing image:", err);
    } else {
      console.log("Image resized and saved as JSON.png successfully");
    }
  });

// instead of toFile , we can use only toBuffer()

// // // we want buffer for pixel manipulation ; pixel has three values : RGB and a fourth alpha value that respresent transparency. all of these (rgb, a) r has values ranging 0-25. 
// // const { isBuffer } = require("node:util");
// const sharp = require("sharp");
// imagePath = "amazon.jpg";
// maskImage = "mask_file.png"
// const width = 650;
// const height = 350;

// async function editPixels (imagePath) {
// try{
//      const {data, info} = await sharp(imagePath)
//      .ensureAlpha() // Ensure image has an alpha channel (to ensure it has an alpha channel otherwise we can't edit the fourth channel(alpha channel); If not, it adds one.
//      .raw() // // Access raw pixel data without any image processing (e.g., no color correction, no compression).(to get down to pixel level)
//      .toBuffer({ resolveWithObject: true }) // returns a promise that resolves to both the pixel data (data) and image metadata (info), like width, height, and number of channels (RGBA); gives us both the pixel (channels) and dimensional data (width and height)
    
//        const { width, height, channels } = info;
//        // loop with increment by channels
//        for (let i = 0; i < data.length; i += channels) {
//          // f the pixel is white (255, 255, 255), set it to transparent black (0,0,0, a=0)
//         //  if (data[i] === 255 && data[i + 1] === 255 && data[i + 2] === 255)   // if completely white 
//          if (data[i] >= 240 && data[i + 1] >= 240 && data[i + 2] >= 240) {
//            // add tolerance for detecting off-white pixels by considering values that are close to 255 (e.g., values greater than 240).

//            data[i] = 0;
//            data[i + 1] = 0;
//            data[i + 2] = 0;
//            data[i + 3] = 0;
//            //    data[i] = 100;
//            //    data[i + 1] = 300;
//            //    data[i + 2] = 30;
//            //    data[i + 3] = 125;
//          }
//        }
//         // Save the modified image as a PNG - same directory with file name new.png
//        await sharp(data, { raw: { width, height, channels } })
//          .toFormat("png")
//          .toFile("new.png");
//      } catch(error) {
//         console.error("Error while editing image pixels:", error)
        
//      }

// }
  


// editPixels(maskImage);
