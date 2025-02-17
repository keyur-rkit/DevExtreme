$(document).ready(function () {
  var dummyUrl = "https://67adeabb9e85da2f020bb443.mockapi.io/anime";

  var animeDataCustomStore = new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw", // Loads the raw data
    // cacheRawData: true, // Caches the raw data
    //// useDefaultSearch: true, // Enables the default search
    load: ({ skip = 5 }) => {
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

  // works with loadMode = "raw" only
  var loadOption = {
    // group: ["genre"], // Group by genre
    // groupSummary: [
    //   {
    //     selector: "id",
    //     summaryType: "count",
    //     displayFormat: "Total: {0}",
    //   },
    // ], // Summary of the group
    // skip: 1,
    // take: 5,
    // sort: [{ selector: "name", desc: false }],
    // filter: ["genre", "=", "Action"],
    // totalSummary: [
    //   {
    //     selector: "id",
    //     summaryType: "count",
    //     displayFormat: "Total Count: {0}",
    //   },
    // ],
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
      // filterRow: { visible: true },
    })
    .dxDataGrid("instance");
});
