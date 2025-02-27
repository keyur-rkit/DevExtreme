$(document).ready(() => {
  $("#gridContainer").dxDataGrid({
    dataSource: new DevExpress.data.CustomStore({
      key: "id",
      loadMode: "raw",
      load: () => {
        return $.ajax({
          url: "https://dummyjson.com/recipes",
          method: "GET",
        }).then((res) => {
          return res.recipes;
        });
      },
    }),
    showColumnLines: false,
    showRowLines: true,
    rowAlternationEnabled: true,
    showBorders: true,
    columnAutoWidth: true,
    columns: [
      "id",
      "name",
      "prepTimeMinutes",
      "cookTimeMinutes",
      "servings",
      "difficulty",
      "rating",
      "cuisine",
      "caloriesPerServing",
    ],
    paging: {
      pageSize: 10,
    },
    selection: {
      mode: "multiple",
      showCheckBoxesMode: "always",
      selectAllMode: "page",
    },
    // for enabling exporting
    export: {
      enabled: true,
      allowExportSelectedData: true,
    },
    onExporting: (e) => {
      // console.log(e);
      var workbook = new ExcelJS.Workbook();
      var worksheet = workbook.addWorksheet("Main sheet");
      DevExpress.excelExporter
        .exportDataGrid({
          worksheet: worksheet,
          component: e.component,
          customizeCell: function (options) {
            var excelCell = options;
            // console.log(options);

            excelCell.font = { name: "Arial", size: 12 };
            excelCell.alignment = { horizontal: "left" };
          },
        })
        .then(function () {
          workbook.xlsx.writeBuffer().then(function (buffer) {
            saveAs(
              new Blob([buffer], { type: "application/octet-stream" }),
              "Recipes.xlsx"
            );
          });
        });
      e.cancel = true;
    },
  });
});
