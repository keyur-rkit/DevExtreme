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
      showBorders: true,
      selection: {
        mode: "single",
      },
      filterRow: {
        visible: true,
      },
      groupPanel: {
        visible: true,
      },
      pager: {
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 20],
      },
      stateStoring: {
        type: "sessionStorage", //  'custom' | 'localStorage' (default)| 'sessionStorage'
        enabled: true,
        storageKey: "gridStorageKey",
      },
      onToolbarPreparing: (e) => {
        var toolbarItems = e.toolbarOptions.items;

        toolbarItems.push({
          widget: "dxButton",
          options: {
            text: "Save State",
            onClick: () => {
              var state = gridInstance.state(); // gets
              console.log(state);
              gridInstance.state(state);
              DevExpress.ui.notify("State Saved", "success", 500);
            },
          },
          location: "after",
        });
        toolbarItems.push({
          widget: "dxButton",
          options: {
            text: "Load State",
            onClick: () => {
              var state = JSON.parse(sessionStorage.getItem("gridStorageKey"));
              gridInstance.state(state);
              DevExpress.ui.notify("State Loaded", "success", 500);
            },
          },
          location: "after",
        });
        toolbarItems.push({
          widget: "dxButton",
          options: {
            text: "Reset State",
            onClick: () => {
              gridInstance.state(null);
              DevExpress.ui.notify("State Reseted", "success", 500);
            },
          },
          location: "after",
        });

        // console.log(e);
      },
    })
    .dxDataGrid("instance");
});
