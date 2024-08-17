// Generate html files in site folder
import * as marked from "marked";
import matter from "gray-matter";
import { promises as fs } from "fs";
import * as path from "path";
import { render } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";
import { ArticlePage, LandingPage } from "./components.mjs";
import { config } from "dotenv";

config();
const contentSrc = process.env["CONTENT_SRC"];
const mdSrcDir = `md`;
const siteDir = "site";
const blogHTMLDir = `blog`;

function slugify(str) {
  return str
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading and trailing whitespace
    .replace(/[\s\W-]+/g, "-") // Replace spaces and non-word characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens
}

async function genArticle(fileName) {
  console.log(fileName);
  const str = await fs.readFile(
    `${contentSrc}/${mdSrcDir}/${fileName}`,
    "utf-8"
  );
  const { data, content } = matter(str);
  const html = await marked.parse(content);
  const baseName = path.basename(fileName, path.extname(fileName));
  const baseNameSlug = slugify(baseName);
  await fs.writeFile(
    `${siteDir}/${blogHTMLDir}/${baseNameSlug}.html`,
    await collectResult(render(ArticlePage(baseName, html)))
  );
  console.log("wrote html file");
  return {
    txt: baseName,
    href: `${blogHTMLDir}/${baseNameSlug}.html`,
    date: data.date,
  };
}

async function genHTML() {
  const files = await fs.readdir(`${contentSrc}/${mdSrcDir}`);
  // if blog directory doesn't exist create it
  const dir = `${siteDir}/${blogHTMLDir}`;
  try {
    await fs.stat(dir);
  } catch (e) {
    await fs.mkdir(dir);
  }
  // generate posts html asynchronously (for better perf) and get the posts dated to render them sorted on the landing page
  const promises = files.map(genArticle);
  let posts = await Promise.all(promises);
  // sort by date
  posts = posts
    .map((p) => ({ ...p, date: new Date(p.date) }))
    .sort((a, b) => b.date - a.date);
  // generate landing page html
  await fs.writeFile(
    `${siteDir}/index.html`,
    await collectResult(render(LandingPage(posts)))
  );
}
async function copyAssets() {}
(async function gen() {
  await Promise.all([genHTML(), copyAssets()]);
})();
