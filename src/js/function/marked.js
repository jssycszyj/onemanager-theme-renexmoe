import marked from "../lib/marked.js";
//import $ from 'mdui.jq';
const $ = mdui.$;
export default async () => {
  if (document.getElementById("head")) {
    marked.setOptions({
      renderer: new marked.Renderer(),
      mangle: false,
      highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ?
          language :
          "plaintext";
        return hljs.highlight(validLanguage, code).value;
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    $("#head").html(marked(document.querySelector("#head-md").innerText));
  }
  if (document.getElementById("readme")) {
    marked.setOptions({
      renderer: new marked.Renderer(),
      mangle: false,
      highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ?
          language :
          "plaintext";
        return hljs.highlight(validLanguage, code).value;
      },
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false,
    });
    $("#readme").html(marked(document.querySelector("#readme-md").innerText));
  }
};