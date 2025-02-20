$(document).ready(() => {
  var dummyUrl = "https://67adeabb9e85da2f020bb443.mockapi.io/anime";

  var customStore = new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    load: () => {
      return $.ajax({
        url: dummyUrl,
        method: "GET",
      });
    },

    insert: (values) => {
      return $.ajax({
        url: dummyUrl,
        method: "POST",
        data: values,
      });
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

  $("#gridContainer").dxDataGrid({
    dataSource: customStore,
    columns: [
      {
        dataField: "id",
        dataType: "number",
        width: 50,
      },
      {
        dataField: "name",
        dataType: "string",
      },
      {
        dataField: "anime",
        dataType: "string",
      },
      {
        dataField: "genre",
        dataType: "string",
      },
    ],
    showBorders: true,
    paging: {
      pageSize: 6,
    },
    filterRow: {
      visible: true, // default false
      // showOperationChooser: false, // default true
    },
    filterPanel: {
      // displays the applied filter expression
      visible: true, // default false]
    },
    filterValue: ["id", "between", [5, 10]], // default filter
  });
});
