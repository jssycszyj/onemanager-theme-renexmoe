const fs = require("fs");
const pkg = require("./package.json");
const assets = require("./build/asset-manifest.json");
let index = fs.readFileSync("./src/html/index.html", {
  encoding: "utf8"
});
index = index.replace(
  '<meta name="theme-color" content="#fff" />',
  '<meta name="theme-color" content="#fff" />' + "\n" + `<link rel="stylesheet" href="${pkg.homepage}/css/app.css">`
);
index = index.replace(
  '<script src="/renexmoe_assets/js/extra.js"></script>',
  `<script src="${pkg.homepage}/js/extra.js"></script>`
);
index = index.replace(
  '<script type="module" src="/renexmoe_assets/js/app.js"></script>',
  ((assets) => {
    let a = "";
    for (let b in assets) {
      if (b.split(".")[b.split(".").length - 1] === "js") {
        a += `<script src="${pkg.homepage + assets[b]}"></script>` + "\n";
      }
    }
    return a;
  })(assets)
);
fs.writeFileSync("./build/renexmoe-mod.html", index, {
  encoding: "utf8"
});