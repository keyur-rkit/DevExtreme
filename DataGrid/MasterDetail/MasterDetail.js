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
    columns: ["id", "name", "cuisine", "caloriesPerServing"],
    paging: {
      pageSize: 10,
    },
    masterDetail: {
      enabled: true,
      //   autoExpandAll: true, // expanded or collapsed

      // template for masteDetail
      template: (container, info) => {
        console.log(container);
        console.log(info);
        // simple div for ingredients
        container.append(
          `<div>Ingredients</div><div>${info.data.ingredients}</div>`
        );

        // img and instruction with table

        var instructions = info.data.instructions;
        var instructionsLines = instructions.length;
        var imgUrl = info.data.image;

        container.append(`<br/><div>Instructions:</div>`);

        var markup =
          `<tr>` +
          `<td rowspan=${
            instructionsLines > 0 ? instructionsLines + 1 : 1
          } > <img src="${imgUrl}" alt="" width="200" height="200"> </td>` +
          `</tr>`;

        instructions.forEach((instruction) => {
          markup +=
            `<tr>` + `<td style="color:#999">${instruction}</td>` + `</tr>`;
        });

        container.append(markup);
      },
    },
  });
});
