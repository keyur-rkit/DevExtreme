$(document).ready(() => {

  var dummyUrl = "https://67adeabb9e85da2f020bb443.mockapi.io/anime";

  $("#gridContainer").dxDataGrid({
    dataSource: onePieceData,
    keyExpr: "id",
    columns: [
      {
        dataField: "id",
        width: 50,
      },
      "name",
      "power",
      "firstAppearance",
      "bounty",
    ],
    showBorders: true,
    paging: {
      pageSize: 5,
    },
  });

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
        url: `${dummyUrl}/${key}`,
        method: "PUT",
        data: values,
      });
    },
  });

  var grid2Instance = $("#gridContainer2")
    .dxDataGrid({
      dataSource: customStore,
      showBorders: true,
      columns: [
        {
          dataField: "id",
          dataType: "number",
          width: 50,
          caption: "ID",
        },
        {
          dataField: "name",
          dataType: "string",
          caption: "Name",
        },
        {
          dataField: "anime",
          dataType: "string",
          caption: "Anime",
        },
        {
          dataField: "genre",
          dataType: "string",
          caption: "Genre",
        },
      ],
      paging: {
        pageSize: 5,
      },
      editing: {
        allowAdding: true,
        allowUpdating: true,
      },
    })
    .dxDataGrid("instance");
});
