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
      {
        dataField: "birthDate",
        dataType: "date",
        // custom headerFilter for birthDate column
        headerFilter: {
          dataSource: [
            {
              text: "BirthDate < 1/1/1990",
              value: ["birthDate", "<", new Date(1990, 0, 1)],
            },
            {
              text: "BirthDate: 1/1/1990 - 1/1/2000",
              value: [
                ["birthDate", ">=", new Date(1990, 0, 1)],
                "and",
                ["birthDate", "<=", new Date(2000, 0, 1)],
              ],
            },
            {
              text: "BirthDate > 1/1/2000",
              value: ["birthDate", ">", new Date(2000, 0, 1)],
            },
          ],
        },
      },
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
