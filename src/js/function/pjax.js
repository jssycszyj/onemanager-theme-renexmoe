import "../../css/nprogress.css";
import Pjax from "../lib/pjax_lib.js";
import nprogress from "nprogress/nprogress.js";

function officeinit() {
  if (document.getElementById("office-a")) {
    var ifm = document.getElementById("office-a");
    var containerHeight = document.documentElement.clientHeight - 150;
    ifm.height = containerHeight;
  }
}

function pdfinit() {
  if (document.getElementById("pdf-d")) {
    loadpdf();
  }
}

function videoint() {
  if (document.getElementById("video-c")) {
    loadvideo();
  }
}

const whenpjax = () => {
  nprogress.inc();
};
const whensuccess = () => {
  officeinit();
  pdfinit();
  videoint();
  nprogress.done();
};
export default () => {
  let pjax = new Pjax({
    elements: "a:not([target=_blank])",
    selectors: [
      ".main-drawer",
      ".mdui-container",
      "title",
      ".pjax",
      ".mdui-toolbar",
    ],
    cacheBust: false,
  });
  pjax._handleResponse = pjax.handleResponse;
  pjax.handleResponse = function (responseText, request, href, options) {
    if (request.status !== 200) {
      location.href = href;
    } else {
      pjax._handleResponse(responseText, request, href, options);
    }
  };
  document.addEventListener("pjax:send", whenpjax);
  document.addEventListener("pjax:success", whensuccess);
  return pjax;
};