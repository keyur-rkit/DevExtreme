$(document).ready(() => {
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
        {
          dataField: "name",
          hidingPriority: 7, // order in which columns are hidden
        },
        {
          dataField: "servings",
          hidingPriority: 6, // order in which columns are hidden
        },
        {
          dataField: "difficulty",
          hidingPriority: 5, // order in which columns are hidden
        },
        {
          dataField: "cookTimeMinutes",
          hidingPriority: 0, // order in which columns are hidden
        },
        {
          dataField: "prepTimeMinutes",
          hidingPriority: 1, // order in which columns are hidden
        },
        {
          dataField: "rating",
          hidingPriority: 2, // order in which columns are hidden
        },
        {
          dataField: "cuisine",
          hidingPriority: 4, // order in which columns are hidden
        },
        {
          dataField: "caloriesPerServing",
          hidingPriority: 3, // order in which columns are hidden
        },
      ],
      paging: {
        pageSize: 10,
      },
      editing: {
        allowAdding: true,
        allowUpdating: true,
        mode: "batch",
      },
      groupPanel: {
        emptyPanelText: "Use the context menu of header columns to group data",
        visible: true,
      },
      pager: {
        allowedPageSizes: [5, 8, 15, 30],
        showInfo: true,
        showNavigationButtons: true,
        showPageSizeSelector: true,
        visible: true,
        displayMode: "adaptive", // auto hides info and buttons accroding to width
      },
      columnChooser: {
        enabled: true,
        mode: "select",
      },

      // UI component should hide columns to adapt to the screen or container size
      columnHidingEnabled: true,
    })
    .dxDataGrid("instance");

  $("#selectBox").dxSelectBox({
    items: ["phone", "tablet", "laptop"],
    width: 200,
    showClearButton: true,
    onValueChanged: (e) => {
      let width;
      switch (e.value) {
        case "phone":
          width = 200;
          break;
        case "tablet":
          width = 400;
          break;
        case "laptop":
          width = 600;
          break;
        default:
          width = null; // default width
      }
      gridInstance.option("width", width);
      gridInstance.repaint();
    },
  });
});
