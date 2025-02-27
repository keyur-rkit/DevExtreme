$(document).ready(() => {
  $("#gridContainer").dxDataGrid({
    dataSource: new DevExpress.data.CustomStore({
      key: "id",
      loadMode: "raw",
      load: () => {
        return $.ajax({
          url: "https://dummyjson.com/users",
          method: "GET",
        }).then((res) => {
          return res.users;
        });
      },
    }),
    showRowLines: true,
    rowAlternationEnabled: true,
    showBorders: true,
    columnAutoWidth: true,
    columns: [
      "id",
      "firstName",
      "lastName",
      "age",
      "gender",
      "birthDate",
      "bloodGroup",
    ],
    paging: {
      pageSize: 10,
    },

    headerFilter: {
      visible: true,
      allowSearch: true,
      searchTimeout: 100, //  when the search is executed.

      height: 300, // 325, 315 (Material)
    },
  });
});
