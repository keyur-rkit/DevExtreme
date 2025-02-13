$(document).ready(function () {
  var dummyUrl = "https://67adeabb9e85da2f020bb443.mockapi.io/anime";

  var animeDataCustomStore = new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    load: (loadOptions) => {
      return $.getJSON(dummyUrl);
    },

    byKey: (key) => {
      return $.getJSON(dummyUrl + "/" + encodeURIComponent(key));
    },

    insert: (values) => {
      return $.post(dummyUrl, values);
    },

    update: (key, values) => {
      return $.ajax({
        url: dummyUrl + "/" + encodeURIComponent(key),
        method: "PUT",
        data: values,
      });
    },

    remove: (key) => {
      return $.ajax({
        url: dummyUrl + "/" + encodeURIComponent(key),
        method: "DELETE",
      });
    },
  });

  $("#list").dxList({
    dataSource: animeDataCustomStore,
    displayExpr: "name",
    width: 200,
  });
});
