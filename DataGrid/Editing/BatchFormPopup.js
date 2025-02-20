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
      editing: {
        mode: "batch",
        allowUpdating: true,
        allowDeleting: true,
        allowAdding: true,
        useIcons: true,
        selectTextOnEditStart: true,

        // only for form and popup modes
        form: {
          // removed id in editing
          items: [
            {
              itemType: "group",
              caption: "Anime Info",
              // items: ["name", "anime", "genre"]  // for simple
              // for specifying editorType
              items: [
                { dataField: "name" },
                { dataField: "anime" },
                {
                  dataField: "genre",
                  editorType: "dxSelectBox",
                  editorOptions: {
                    items: [
                      "Action",
                      "Adventure",
                      "Magical Girl",
                      "Thriller",
                      "Comedy",
                    ],
                  },
                },
              ],
            },
          ],
        },

        // only for Popup
        popup: {
          showTitle: true,
          title: "Anime Info",
          width: 500,
          height: 300,
        },
      },

      onToolbarPreparing: (e) => {
        var toolbarItems = e.toolbarOptions.items;
        //  toolbarItems.forEach(function (item) {
        //    if (item.name === "saveButton") {
        //      item.options = {
        //        icon: "copy",
        //        onClick: function (e) {
        //          // Implement custom save logic here
        //        },
        //      };
        //    }
        //  });
        toolbarItems.push({
          widget: "dxButton",
          options: {
            text: "Batch",
            onClick: function () {
              gridInstance.option("editing.mode", "batch");
              DevExpress.ui.notify("Changed to Batc mode", "success", 500);
            },
          },
          location: "after",
        });
        toolbarItems.push({
          widget: "dxButton",
          options: {
            text: "Form",
            onClick: function () {
              gridInstance.option("editing.mode", "form");
              DevExpress.ui.notify("Changed to Form mode", "success", 500);
            },
          },
          location: "after",
        });
        toolbarItems.push({
          widget: "dxButton",
          options: {
            text: "Popup",
            onClick: function () {
              gridInstance.option("editing.mode", "popup");
              DevExpress.ui.notify("Changed to Popup mode", "success", 500);
            },
          },
          location: "after",
        });

        // console.log(e);
      },
    })
    .dxDataGrid("instance");
});
