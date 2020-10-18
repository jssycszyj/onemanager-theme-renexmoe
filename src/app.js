var $ = mdui.$;

function loadjs(url, defer = false) {
    let i = document.createElement("script");
    i.src = url;
    i.defer = defer;
    $("head").append(i);
}

loadjs("https://cdn.jsdelivr.net/gh/186526/onemanager-theme-renexmoe@v1/dependence/cookie.min.js");
whenAvailable("docCookies", function () {
    if (!docCookies.getItem("darkmod")) {
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            docCookies.setItem("darkmod", true, 1200, "/");
            $("#app").addClass("mdui-theme-layout-dark");
        } else {
            docCookies.setItem("darkmod", false, 1200, "/");
            $("#app").removeClass("mdui-theme-layout-dark");
        }
    }
    $("#app").removeClass("mdui-theme-layout-auto");
    if (eval(docCookies.getItem("darkmod"))) {
        $("#app").addClass("mdui-theme-layout-dark");
    } else {
        $("#app").removeClass("mdui-theme-layout-dark");
    }
});

function whenAvailable(name, callback) {
    var interval = 100;
    window.setTimeout(function () {
        if (window[name]) {
            callback(window[name]);
        } else {
            window.setTimeout(arguments.callee, interval);
        }
    }, interval);
}

function changecolor() {
    whenAvailable("docCookies", function () {
        if (eval(docCookies.getItem("darkmod"))) {
            $("#app").removeClass("mdui-theme-layout-dark");
            docCookies.setItem("darkmod", false, 1200, "/");
        } else {
            $("#app").addClass("mdui-theme-layout-dark", "/");
            docCookies.setItem("darkmod", true, 1200, "/");
        }
    });
}

async function geturl(b) {
    try {
        new URL(b);
    } catch (error) {
        return;
    }
    if (new URL(b).host !== window.location.host) {
        return;
    }
    let host = window.location.protocol + "//" + window.location.host;
    if (new URL(b).search === "?preview") {
        return host + new URL(b).pathname + "?preview";
    }
    let a = await "/";
    for (let i of new URL(b).pathname.split("/").slice(1, -1)) {
        a = a + i + "/";
    }
    return host + a;
}

$.fn.extend({
    sortElements: function (comparator, getSortable) {
        getSortable = getSortable || function () {
            return this;
        };
        var placements = this.map(function () {
            var sortElement = getSortable.call(this),
                parentNode = sortElement.parentNode,
                nextSibling = parentNode.insertBefore(
                    document.createTextNode(''),
                    sortElement.nextSibling
                );
            return function () {
                parentNode.insertBefore(this, nextSibling);
                parentNode.removeChild(nextSibling);
            };
        });
        return [].sort.call(this, comparator).each(function (i) {
            placements[i].call(getSortable.call(this));
        });
    }
});

async function getpreload() {
    let includeKeywords = [];
    let a = await document.getElementsByTagName("a");
    for (let i in a) {
        includeKeywords.push(await geturl(a[i].href));
    }
    return $.unique(includeKeywords).filter(Boolean);
}

function loadcss(url) {
    let i = document.createElement("link");
    i.rel = "stylesheet";
    i.href = url;
    $("head").append(i);
}

async function prefetch(url) {
    const link = document.createElement(`link`);
    link.rel = `prefetch`;
    link.href = url;
    $("head").append(link);
}

{
    $("#app").addClass("mdui-theme-primary-" + primary_color + " mdui-theme-accent-" + accent_color);
    if (document.getElementById("head")) {
        loadjs("https://cdn.jsdelivr.net/npm/marked@1.2.0/marked.min.js");
        loadcss("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
        whenAvailable("marked", function () {
            $('#head').html(marked($('#head-md').html()));
        });
    }
    if (document.getElementById("readme")) {
        loadjs("https://cdn.jsdelivr.net/npm/marked@1.2.0/marked.min.js");
        loadcss("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");
        whenAvailable("marked", function () {
            $('#readme').html(marked($('#readme-md').html()));
        });
    }
}

{
    $(function () {
        $('.icon-sort').on('click', function () {
            let sort_type = $(this).attr("data-sort"),
                sort_order = $(this).attr("data-order");
            let sort_order_to = (sort_order === "less") ? "more" : "less";
            $('li[data-sort]').sortElements(function (a, b) {
                let data_a = $(a).attr("data-sort-" + sort_type),
                    data_b = $(b).attr("data-sort-" + sort_type);
                let rt = data_a.localeCompare(data_b, undefined, {
                    numeric: true
                });
                return (sort_order === "more") ? 0 - rt : rt;
            });
            $(this).attr("data-order", sort_order_to).text("expand_" + sort_order_to);
        });
    });
}

{
    window.onload = function () {
        (async function () {
            let a = await getpreload();
            for (let i in a) {
                prefetch(a[i]);
            }
        })();
    };
}
