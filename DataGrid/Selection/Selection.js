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
    selection: {
      mode: "single", // single | multiple | none (default)
    },

    // if startEditAction is "click" then we can't select row in "single" mode
    editing: {
      mode: "cell",
      allowUpdating: true,
      startEditAction: "dblClick", // dblClick to use both editing and selection
    },

    onSelectionChanged: (e) => {
      //   console.log(e);
      var data = e.selectedRowsData[0];
      if (data) {
        $("#animeInfo").text(`${data.name} is from ${data.anime}`);
      }
    },
  });

  var grid2Instance = $("#gridContainer2")
    .dxDataGrid({
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
      selection: {
        mode: "multiple", // single | multiple | none (default)
        allowSelectAll: true, // can/can't select all
        selectAllMode: "page", // page | allPages (default)
        showCheckBoxesMode: "always", // always | none | onClick (default) | onLongTap (long mouse click)
      },

      onSelectionChanged: (e) => {
        console.log(e);
        var data = e.selectedRowsData;
        if (data) {
          $("#animeInfo2").html("");
          data.forEach((element) => {
            $("#animeInfo2").append(
              `<div>${element.name} is from ${element.anime}</div>`
            );
          });
        }
      },
      onToolbarPreparing: (e) => {
        var toolbarItems = e.toolbarOptions.items;

        toolbarItems.push({
          widget: "dxButton",
          options: {
            text: "Clear Selection",
            onClick: function () {
              grid2Instance.clearSelection();
            },
          },
          location: "after",
        });
      },
    })
    .dxDataGrid("instance");
});
