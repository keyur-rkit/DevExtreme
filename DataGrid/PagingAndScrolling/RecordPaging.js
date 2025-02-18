$(document).ready(() => {
  $("#gridContainer").dxDataGrid({
    dataSource: new DevExpress.data.CustomStore({
      key: "id",
      loadMode: "raw",
      load: () => {
        return $.ajax({
          url: "https://67adeabb9e85da2f020bb443.mockapi.io/anime",
          method: "GET",
        });
      },
    }),
    showBorders: true,
    paging: {
      enabled: true, // default "true"
      pageIndex: 3, // default "0"
      pageSize: 5, // default 20
    },
    pager: {
      visible: true, // default "auto"
      showPageSizeSelector: true,
      allowedPageSizes: [5, 10, 15, "all"],
      displayMode: "full", // "full" | "compact" | "adaptive"
      showInfo: true,
      infoText: "Page {0} of {1}", // {0} - current page, {1} - total pages ,{2} - total records
      showNavigationButtons: true,
    },
    columns: [
      {
        dataField: "id",
        dataType: "number",
        width: 50,
      },
      {
        dataField: "name",
        dataType: "string",
      },
      {
        dataField: "anime",
        dataType: "string",
      },
      {
        dataField: "genre",
        dataType: "string",
      },
    ],
  });
});
