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
    allowColumnReordering: true,
    allowColumnResizing: true,
    columns: [
      {
        dataField: "id",
        dataType: "number",
        width: 50,
        alignment: "center", // undefined (default) | center | left | right
        allowEditing: false, // By default, inherits the value of the "editing"
        allowFiltering: false,
        allowFixing: false, // Applies only if columnFixing.enabled is true
        allowGrouping: false, //  Applies only when grouping is enabled
        allowHeaderFiltering: false, // Applies only if headerFilter.visible is true
        allowHiding: false, // Applies only if columnChooser.enabled is true.
        allowReordering: false, // Applies only if allowColumnReordering is true.

        // groupIndex: 0,
        // allowExporting,
      },
      {
        dataField: "name",
        dataType: "string",
        alignment: "center",
      },
      {
        dataField: "anime",
        dataType: "string",
        alignment: "center",
      },
      {
        dataField: "genre",
        dataType: "string",
        alignment: "center",
      },
    ],
    columnFixing: {
      enabled: true,
    },
    grouping: {
      contextMenuEnabled: true,
    },
    headerFilter: {
      visible: true,
    },
    columnChooser: {
      enabled: true,
    },
    showBorders: true,
    paging: {
      pageSize: 6,
    },
  });
});
