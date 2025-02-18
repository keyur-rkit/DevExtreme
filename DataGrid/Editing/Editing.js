$(document).ready(() => {
  var dummyUrl = "https://67adeabb9e85da2f020bb443.mockapi.io/anime";

  $("#gridContainer").dxDataGrid({
    dataSource: new DevExpress.data.CustomStore({
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
    }),
    showBorders: true,
    editing: {
      mode: "row",
      allowUpdating: true,
      allowDeleting: true,
      allowAdding: true,
    },

    onEditingStart() {
      console.log("EditingStart");
    },
    onInitNewRow() {
      console.log("InitNewRow");
    },
    onRowInserting() {
      console.log("RowInserting");
    },
    onRowInserted() {
      console.log("RowInserted");
    },
    onRowUpdating() {
      console.log("RowUpdating");
    },
    onRowUpdated() {
      console.log("RowUpdated");
    },
    onRowRemoving() {
      console.log("RowRemoving");
    },
    onRowRemoved() {
      console.log("RowRemoved");
    },
    onSaving() {
      console.log("Saving");
    },
    onSaved() {
      console.log("Saved");
    },
    onEditCanceling() {
      console.log("EditCanceling");
    },
    onEditCanceled() {
      console.log("EditCanceled");
    },
  });
});
