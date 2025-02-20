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

  var gridInstance = $("#gridContainer")
    .dxDataGrid({
      dataSource: customStore,
      columns: [
        {
          dataField: "id",
          dataType: "number",
          width: 50,
          allowSorting: false, // can't sort this column
        },
        {
          dataField: "name",
          dataType: "string",
          sortOrder: "asc", // default sort
          sortIndex: 2, // default sort index
        },
        {
          dataField: "anime",
          dataType: "string",
          sortOrder: "asc", // default sort
          sortIndex: 1, // default sort index
        },
        {
          dataField: "genre",
          dataType: "string",
        },
      ],
      showBorders: true,
      paging: {
        pageSize: 10,
      },
      sorting: {
        // use "shift" to sort
        // use "ctrl" to remove sort

        mode: "multiple", //  "single" (default) | "multiple" | "none"

        ascendingText: "Sort Asc",
        descendingText: "Sort Desc",
        clearText: "Clear Sort",

        showSortIndexes: true, // sorting order number , only for 'multiple'
      },
      // custom button to remove all sort
      onToolbarPreparing: (e) => {
        var toolbarItems = e.toolbarOptions.items;
        toolbarItems.push({
          widget: "dxButton",
          options: {
            text: "Clear All Sortings",
            onClick: function () {
              // clear all sort
              gridInstance.clearSorting();
            },
          },
          location: "after",
        });
      },
    })
    .dxDataGrid("instance");
});
