import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

const Link = (txt, href) => html`<a href=${href}> ${txt} </a>`;

const landingPageItems = {
  Writing: [],
  Projects: [
    Link(
      "Arabic tacotron TTS: end-to-end Arabic TTS system. Tech: python, numpy, scipy",
      "https://github.com/yoosif0/arabic-tacotron-tts"
    ),
    Link("Bikes Rental webapp", "https://github.com/yoosif0/bikes-rental"),
    Link(
      "Ask.fm-automater: browser automator that asks ask.fm users questions bypassing recaptcha. Tech: Puppeteer, MongoDB",
      "https://github.com/yoosif0/ask.fm-automater"
    ),
    Link(
      "SAS Users: scrape and analyze users on ask.fm",
      "https://github.com/yoosif0/scrape-analyse-and-save-users"
    ),
    Link(
      "My React Course on Youtube",
      "https://www.youtube.com/watch?v=J2egT8q_2gQ&list=PLTuAh4siz6wkU9LSTxD24Vsgy6wJCGtF0"
    ),
  ],
  "External Articles": [
    Link(
      "Is it time to use Node 8",
      "https://www.toptal.com/nodejs/is-it-time-to-use-node-8"
    ),
  ],
  Me: [
    'Email: the letter "m" then the letter "e" at this domain',
    Link("Github", "https://github.com/yoosif0"),
    Link("Linkedin", "https://www.linkedin.com/in/yoosif"),
    Link("Stackoverflow", "https://stackoverflow.com/users/8065736"),
  ],
};

const Layout = (body) => html`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      <div class="text-container">${body}</div>
    </body>
  </html>
`;
const ArticlePageBody = (title, content) => html`
    <h2>${title}</h2>
      ${unsafeHTML(content)}
    </div>
    `;

const ListItem = (item) => html`<li>${item}</li>`;

const LandingPageBody = (postsDated) => {
  landingPageItems["Writing"] = postsDated.map((p) => Link(p.txt, p.href));
  return html`
    <link rel="stylesheet" href="main.css" />
    ${Object.keys(landingPageItems).map(
      (sectionName) => html`
        <h3>${sectionName}</h3>
        <ul>
          ${landingPageItems[sectionName].map(ListItem)}
        </ul>
      `
    )}
  `;
};

export const ArticlePage = (title, content) =>
  html`
    <link rel="stylesheet" href="../main.css" />
    ${Layout(ArticlePageBody(title, content))};
  `;

export const LandingPage = (data) => Layout(LandingPageBody(data));
