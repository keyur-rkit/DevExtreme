$(document).ready(function () {
  var dummyUrl = "https://67adeabb9e85da2f020bb443.mockapi.io/anime";

  var animeDataCustomStore = new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    cacheRawData: true, // Caches the raw data
    //// useDefaultSearch: true, // Enables the default search
    load: () => {
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

    totalCount: () => {
      return $.getJSON(dummyUrl).then((data) => {
        return data.length;
      });
    },

    errorHandler: (error) => {
      console.log(error);
    },
  });

  // animeDataCustomStore.clearRawDataCache(); // Clears the raw data cache

  $("#totalCount").dxButton({
    text: "GetTotalCount",
    onClick: () => {
      animeDataCustomStore.totalCount().done((data) => {
        console.log(data);
      });
    },
  });

  $("#getByKey").dxButton({
    text: "GetByKey",
    onClick: () => {
      var key = prompt("Enter the ID:");
      if (key) {
        animeDataCustomStore.byKey(key).done((data) => {
          console.log(data);
        });
      }
    },
  });

  $("#gridContainer").dxDataGrid({
    dataSource: animeDataCustomStore,
    columns: [
      { dataField: "id", caption: "ID", width: 50 },
      { dataField: "name", caption: "Name" },
      { dataField: "anime", caption: "Anime" },
      { dataField: "genre", caption: "Genre" },
    ],
    editing: {
      mode: "row",
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: true,
    },
    // filterRow: { visible: true },
  });
});
