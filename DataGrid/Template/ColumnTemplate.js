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
    showRowLines: true,
    columnAutoWidth: true,
    columns: [
      "id",
      "name",
      "cuisine",
      "caloriesPerServing",
      {
        dataField: "ingredients",
        width: 200,
        // custom Column Template to show mutliple ingredients with dxList
        cellTemplate: (container, options) => {
          //   console.log(container);
          //   console.log(options);
          //   options.value.forEach((element) => {
          //     container.append(`<div>${element}</div>`);
          //   });
          $("<div>")
            .dxList({
              items: options.value,
              height: 100,
            })
            .appendTo(container);
        },
      },
      {
        dataField: "image",
        caption: "Image",
          alignment: "center",
        // custom Column template to show Img 
        cellTemplate: (container, options) => {
          //   console.log(container);
          //   console.log(options);
          container.append(
            `<img src="${options.value}" alt="${options.data.name}" style="width: 100px; height: 100px;">`
          );
        },
      },
    ],
    paging: {
      pageSize: 7,
    },
  });
});
