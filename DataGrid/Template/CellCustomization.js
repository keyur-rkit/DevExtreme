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
    showBorders: true,
    columnAutoWidth: true,
    columns: [
      "id",
      "name",
      {
        dataField: "prepTimeMinutes",
        caption: "Prep Time (out of 60 mins)",
      },
      {
        dataField: "cookTimeMinutes",
        caption: "Cook Time (out of 60 mins)",
      },
      "servings",
      "difficulty",
      "cuisine",
      "caloriesPerServing",
    ],
    paging: {
      pageSize: 7,
    },
    onCellPrepared: (e) => {
      console.log(e);
      if (e.rowType === "data" && e.column.dataField === "prepTimeMinutes") {
        var cellHtml = `<progress value=${e.data.prepTimeMinutes} max="60"></progress>`;
        e.cellElement.html(cellHtml);
      }
      if (e.rowType === "data" && e.column.dataField === "cookTimeMinutes") {
        var cellHtml = `<progress value=${e.data.cookTimeMinutes} max="60"></progress>`;
        e.cellElement.html(cellHtml);
      }
      if (e.rowType === "data" && e.column.dataField === "name") {
        var color = "";
        if (e.data.difficulty === "Easy") {
          color = "lime";
        } else if (e.data.difficulty === "Medium") {
          color = "orange";
        } else {
          color = "red";
        }
        e.cellElement.css("color", color);
      }
    },
  });
});
