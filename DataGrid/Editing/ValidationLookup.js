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

  var gridInstance = $("#gridContainer").dxDataGrid({
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
        // data validation
        validationRules: [
          { type: "required" },
          {
            type: "stringLength",
            min: 2,
            message: "Name at least have 2 letters",
          },
        ],
      },
      {
        dataField: "genre",
        dataType: "string",

        // Cascading Lookups
        // to set anime "null" when genre is selected
        setCellValue: (rowData, value) => {
          rowData.genre = value;
          rowData.anime = null;
        },
        // adds dropDown in UI
        lookup: {
          dataSource: genre,
        },

        // data validation
        validationRules: [{ type: "required" }],
      },
      {
        dataField: "anime",
        dataType: "string",

        // Cascading Lookups
        // to filter anime according genre selected
        lookup: {
          dataSource: (options) => {
            // console.log(options);
            return {
              store: anime,
              filter: options.data ? ["genre", "=", options.data.genre] : null,
            };
          },
          displayExpr: "anime",
          valueExpr: "anime",
        },

        // data validation
        validationRules: [{ type: "required" }],
      },
    ],
    // disabled anime field until genre selected when adding row
    onEditorPreparing(e) {
      if (e.parentType === "dataRow" && e.dataField === "anime") {
        e.editorOptions.disabled = e.row.data.genre === undefined;
      }
    },

    showBorders: true,
    editing: {
      mode: "row",
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: true,
      useIcons: true,
      selectTextOnEditStart: true,
    },
  });
});
