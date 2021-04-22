const $ = mdui.$;
export default () => {
  $.fn.extend({
    sortElements: function (comparator, getSortable) {
      getSortable =
        getSortable ||
        function () {
          return this;
        };
      var placements = this.map(function () {
        var sortElement = getSortable.call(this),
          parentNode = sortElement.parentNode,
          nextSibling = parentNode.insertBefore(
            document.createTextNode(""),
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
    },
  });
  $(() => {
    $(".icon-sort").on("click", function () {
      let sort_type = $(this).attr("data-sort"),
        sort_order = $(this).attr("data-order");
      let sort_order_to = sort_order === "less" ? "more" : "less";
      $("li[data-sort]").sortElements(function (a, b) {
        let data_a = $(a).attr("data-sort-" + sort_type),
          data_b = $(b).attr("data-sort-" + sort_type);
        if (sort_type === "size") {
          let data_a_t = data_a.slice(-2);
          let data_a_n = data_a.slice(0, -2);
          let data_b_t = data_b.slice(-2);
          let data_b_n = data_b.slice(0, -2);
          switch (data_a_t) {
            case "TB":
              data_a = data_a_n * 1024 * 1024 * 1024 * 1024;
              break;
            case "GB":
              data_a = data_a_n * 1024 * 1024 * 1024;
              break;
            case "MB":
              data_a = data_a_n * 1024 * 1024;
              break;
            case "KB":
              data_a = data_a_n * 1024;
              break;
            default:
              data_a = data_a_n;
              break;
          }
          switch (data_b_t) {
            case "TB":
              data_b = data_b_n * 1024 * 1024 * 1024 * 1024;
              break;
            case "GB":
              data_b = data_b_n * 1024 * 1024 * 1024;
              break;
            case "MB":
              data_b = data_b_n * 1024 * 1024;
              break;
            case "KB":
              data_b = data_b_n * 1024;
              break;
            default:
              data_b = data_b_n;
              break;
          }
          data_a = data_a + "";
          data_b = data_b + "";
        }
        let rt = data_a.localeCompare(data_b, undefined, {
          numeric: true,
        });
        return sort_order === "more" ? rt : 0 - rt;
      });
      $(this)
        .attr("data-order", sort_order_to)
        .text("expand_" + sort_order_to);
    });
  });
};