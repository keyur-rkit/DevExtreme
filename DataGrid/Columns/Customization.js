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
      // buttons column
      {
        width: 200,
        caption: "Buttons",
        type: "buttons",
        // Applies only if the column's type is "buttons".
        buttons: [
          {
            name: "edit",
            icon: "edit",
            visible: true,
            hint: "edit",
            onClick: (e) => {
              e.component.editRow(e.row.rowIndex);
              DevExpress.ui.notify("Editing started", "success", 500);
              // console.log(e);
            },
          },
          // custom button using template
          {
            template: function () {
              var link = $("<a>").text("Cust").attr("href", "#");
              link.on("click", function () {
                DevExpress.ui.notify("Cust Clicked", "success", 500);
              });
              return link;
            },
          },
        ], // built-in buttons: 'cancel' | 'delete' | 'edit' | 'save' | 'undelete'
      },
      {
        dataField: "id", // binds column to dataSource
        dataType: "number", //  'string' | 'number' | 'date' | 'boolean' | 'object' | 'datetime'
        width: 100,
        alignment: "center", // undefined (default) | center | left | right
        allowEditing: true, // By default, inherits the value of the "editing"
        allowFiltering: false,
        allowFixing: false, // Applies only if columnFixing.enabled is true
        allowGrouping: false, //  Applies only when grouping is enabled
        allowHeaderFiltering: false, // Applies only if headerFilter.visible is true
        allowHiding: false, // Applies only if columnChooser.enabled is true.
        allowReordering: false, // Applies only if allowColumnReordering is true.
        allowResizing: false, //  Applies only if allowColumnResizing is true.
        allowSearch: true, //  Applies only if searchPanel.visible is true.
        allowSorting: false, // Applies only if sorting.mode differs from "none".

        caption: "Identifier", // caption for the column.
        cssClass: "impCell", // to apply css class to column
        customizeText: (cellInfo) => {
          return "#" + cellInfo.value;
        }, // custom column text

        // encodeHtml,
        // editorOptions: {},
        // editCellTemplate,
        // groupIndex: 0,
        // allowExporting,
        // cellTemplate,
      },
      {
        dataField: "name",
        dataType: "string",
        alignment: "center",
        filterOperations: ["contains"], //  '=' | '<>' | '<' | '<=' | '>' | '>=' | 'contains' | 'endswith' | 'isblank' | 'isnotblank' | 'notcontains' | 'startswith' | 'between' | 'anyof' | 'noneof'
      },
      {
        caption: "Anime Info",
        columns: [
          {
            dataField: "anime",
            dataType: "string",
            alignment: "center",
          },
          {
            dataField: "genre",
            dataType: "string",
            alignment: "center",
            sortOrder: "asc",
            // custom sort fuction
            calculateSortValue: (rowData) => {
              return rowData.genre + rowData.anime;
            },
          },
        ],
      },
      {
        caption: "Extra Id",
        calculateCellValue: (rowData) => {
          return 1000 + parseInt(rowData.id);
        },
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
    searchPanel: {
      visible: true,
    },
    editing: {
      allowUpdating: true,
      mode: "row",
    },
    filterRow: {
      visible: true,
    },
    showBorders: true,
    paging: {
      pageSize: 6,
    },
  });
});
