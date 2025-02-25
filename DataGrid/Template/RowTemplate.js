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
    columns: ["id", "name", "cuisine", "caloriesPerServing"],
    paging: {
      pageSize: 7,
    },

    // custom row template
    rowTemplate: function (container, item) {
      //   console.log(container);
      //   console.log(item);

      var markup =
        `<tbody class='dx-row'>` +
        `<tr style="background: linear-gradient(to right, #000000, #434343, #000000);">` +
        `<td >${item.values[0]}</td>` +
        `<td >${item.values[1]}</td>` +
        `<td >${item.values[2]}</td>` +
        `<td >${item.values[3]}</td>` +
        `</tr>` +
        `<tr>` +
        `<td colspan='3' style="white-space: normal; color:#999">Ingredients: [ ${item.data.ingredients} ]</td>` +
        `</tr>` +
        `</tbody>`;

      container.append(markup);
    },
  });
});
