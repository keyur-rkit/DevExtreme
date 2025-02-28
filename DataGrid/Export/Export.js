$(document).ready(() => {
  // This code is used for backwards compatibility with the older jsPDF variable name
  // Read more: https://github.com/MrRio/jsPDF/releases/tag/v2.0.0
  window.jsPDF = window.jspdf.jsPDF;

  var pdfExport = (e) => {
    const doc = new jsPDF();

    DevExpress.pdfExporter
      .exportDataGrid({
        jsPDFDocument: doc,
        component: e.component,
        indent: 5,
      })
      .then(() => {
        doc.save("Recipes.pdf");
      });
  };
  var excelExport = (e) => {
    // console.log(e);
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet("Recipes");

    // column width customization
    worksheet.columns = [
      { width: 10 }, // for extra skiping col
      { width: 5 },
      { width: 30 },
      { width: 20 },
      { width: 20 },
      { width: 10 },
      { width: 20 },
      { width: 10 },
      { width: 20 },
      { width: 20 },
    ];
    DevExpress.excelExporter
      .exportDataGrid({
        worksheet: worksheet,
        component: e.component,
        keepColumnWidths: false, // to enable custom widths

        topLeftCell: { row: 2, column: 2 }, // starting row and col

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
  };

  var gridInstance = $("#gridContainer")
    .dxDataGrid({
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
      onExporting: excelExport,

      onToolbarPreparing: (e) => {
        //   console.log(e);
        var toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
          widget: "dxSelectBox",
          options: {
            value: "excel",
            items: ["pdf", "excel"],
            onValueChanged: (e) => {
              if (e.value === "pdf") {
                gridInstance.option("onExporting", pdfExport);
              } else {
                gridInstance.option("onExporting", excelExport);
              }
            },
          },
          location: "before",
        });
      },
    })
    .dxDataGrid("instance");
});
