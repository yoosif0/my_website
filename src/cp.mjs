// Copy assets to site folder
import { exec } from "child_process";
import { config } from "dotenv";
config();

const contentSrc = process.env["CONTENT_SRC"];
const folders = ["images", "gifs"];
const commands = folders.map((x) => `cp -r "${contentSrc}/${x}" "./site"`);

commands.forEach((c) => {
  exec(c, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
  });
});
