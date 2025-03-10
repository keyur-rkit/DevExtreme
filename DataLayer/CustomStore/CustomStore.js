$(document).ready(function () {
  var dummyUrl = "https://67adeabb9e85da2f020bb443.mockapi.io/anime";

  var animeDataCustomStore = new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw", // Loads the raw data
    load: () => {
      return $.get(dummyUrl);
    },

    byKey: (key) => {
      return $.get(dummyUrl + "/" + encodeURIComponent(key));
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
      return $.get(dummyUrl).then((data) => {
        return data.length;
      });
    },

    errorHandler: (error) => {
      console.log(error);
    },

    cacheRawData: true, // Caches the raw data, only for "raw" mode
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

  // works with loadMode = "raw" only
  var loadOption = {
    // skip: 1,
    // take: 5,
    // sort: [{ selector: "name", desc: false }],
    // filter: ["anime", "=", "One Piece"],
    // requiredGroupCount: true,
    // totalSummary: [
    //   {
    //     selector: "id",
    //     summaryType: "count",
    //   },
    // ],
    // group: ["genre"], // Group by genre
    // groupSummary: [
    //   {
    //     selector: "id",
    //     summaryType: "count",
    //   },
    // ], // Summary of the group
  };

  $("#applyLoadOption").dxButton({
    text: "Apply Load Option",
    onClick: () => {
      animeDataCustomStore.load(loadOption).done((data) => {
        console.log(data);
        gridInstance.option("dataSource", data);
      });
    },
  });

  var gridInstance = $("#gridContainer")
    .dxDataGrid({
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
    })
    .dxDataGrid("instance");
});
