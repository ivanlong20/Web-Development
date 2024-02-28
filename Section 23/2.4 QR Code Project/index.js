/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import { createWriteStream, writeFile } from "node:fs";

inquirer
  .prompt([{ name: "shit", message: "Please type the URL" }])
  .then((url) => {
    qr.image(url.shit, { type: "png" }).pipe(createWriteStream("qr-code.png"));
    writeFile("./URL.txt", url.shit, "utf8", (err) => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("shit");
    } else {
      // Something else went wrong
      console.log("shitty");
    }
  });
