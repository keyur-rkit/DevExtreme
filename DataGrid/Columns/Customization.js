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
    columnResizingMode: "widget", // 'nextColumn' (default) | 'widget'
    // columnWidth: 100, // width for all columns
    // columnMinWidth:100, // minWidth for all columns
    columns: [
      // buttons column
      {
        width: 200,
        caption: "Buttons",
        type: "buttons", // 'adaptive' | 'buttons' | 'detailExpand' | 'groupExpand' | 'selection' | 'drag'
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
        allowFixing: true, // Applies only if columnFixing.enabled is true
        allowGrouping: false, //  Applies only when grouping is enabled
        allowHeaderFiltering: false, // Applies only if headerFilter.visible is true
        allowHiding: false, // Applies only if columnChooser.enabled is true.
        allowReordering: false, // Applies only if allowColumnReordering is true.
        allowResizing: false, //  Applies only if allowColumnResizing is true.
        allowSearch: true, //  Applies only if searchPanel.visible is true.
        allowSorting: true, // Applies only if sorting.mode differs from "none".

        caption: "Identifier", // caption for the column.
        cssClass: "impCell", // to apply css class to column
        customizeText: (cellInfo) => {
          return "#" + cellInfo.value;
        }, // custom column text

        fixed: true,
        fixedPosition: "left", // left' | 'right'

        // falseText: "customFalse", //replaces all false items with a specified text
        // trueText: "customTrue",

        // groupIndex: 0,
        // sortIndex: 1, // sortOrder is required
        // sortOrder: "asc", //  undefined (default) | 'asc' | 'desc

        validationRules: [{ type: "required" }],
        visible: true,

        // encodeHtml,
        // editorOptions: {},
        // editCellTemplate,
        // allowExporting,
        // cellTemplate,
      },
      {
        dataField: "name",
        dataType: "string",
        alignment: "center",
        filterOperations: ["contains"], //  '=' | '<>' | '<' | '<=' | '>' | '>=' | 'contains' | 'endswith' | 'isblank' | 'isnotblank' | 'notcontains' | 'startswith' | 'between' | 'anyof' | 'noneof'
        filterValue: "man", // default filter value
        // filterValueS: [], // Specifies values selected in the column's header filter.
        minWidth: 100,

        showInColumnChooser: false, // columnChooser contain the column header or not

        // custom header template
        headerCellTemplate: (container) => {
          container.html("<div>Char Name</div>");
        },
      },
      {
        caption: "Anime Info",
        columns: [
          {
            dataField: "anime",
            dataType: "string",
            alignment: "center",
            selectedFilterOperation: "startswith", // default selected filter
            //  invoked after the user has edited a cell value, but before it will be saved
            setCellValue: (newData, value, currentRowData) => {
              newData.anime = value;
              newData.genre = null;
            },
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
        // custom formats
        format: {
          type: "Currency",
        },
      },
    ],
    sorting: {
      mode: "multiple",
    },
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

  $("#gridContainer2").dxDataGrid({
    dataSource: customStore,
    keyExpr: "id",
    showBorders: true,
    paging: {
      pageSize: 5,
    },
  });
});
