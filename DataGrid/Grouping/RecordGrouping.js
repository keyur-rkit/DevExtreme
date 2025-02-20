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
        allowGrouping: false, // to diable grouping by particular column
      },
      {
        dataField: "name",
        dataType: "string",
        allowGrouping: false,
      },
      {
        dataField: "anime",
        dataType: "string",
      },
      {
        dataField: "genre",
        dataType: "string",
        groupIndex: 0, // to set default group
      },
    ],
    showBorders: true,
    paging: {
      pageSize: 10,
    },
    grouping: {
      allowCollapsing: true, // can collaps a group if true
      autoExpandAll: false, // all collaped in default if false
      expandMode: "rowClick", //  'buttonClick' | 'rowClick'
      contextMenuEnabled: true, // group/ungroup with rightClick on column
      texts: {
        groupByThisColumn: "Group",
        groupContinuesMessage: "Continues",
        groupContinuedMessage: "Continued",
        // ungroup,
        // ungroupAll,
      },
    },
    groupPanel: {
      visible: true, // to enable group panel
      allowColumnDragging: true, // enable/disable dragging
      emptyPanelText: "Drag column here",
    },
  });
});
