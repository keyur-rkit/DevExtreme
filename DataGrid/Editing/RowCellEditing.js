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
      console.log(key);
      console.log(values);

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

  var deleteAllBtnInstance = $("#deleteAll")
    .dxButton({
      text: "Delete Selected",
      icon: "trash",
      disabled: true,
      onClick: () => {
        // delete all selected
        gridInstance.getSelectedRowKeys().forEach((key) => {
          customStore.remove(key);
        });
        // gridInstance.refresh().done(() => {
        //   console.log("refresh done");
        // });
        location.reload(); // refresh is not working
      },
    })
    .dxButton("instance");

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
      // editing: {
      //   mode: "row", // "row"
      //   allowUpdating: true,
      //   allowDeleting: true,
      //   allowAdding: true,
      //   useIcons: true,
      //   selectTextOnEditStart: true,
      // },
      editing: {
        mode: "cell", // "cell"
        allowUpdating: true,
        allowDeleting: true,
        allowAdding: true,
        useIcons: true, // to use icons insted of text
        selectTextOnEditStart: true, // to select all text in cell when start editing
      },
      selection: {
        mode: "multiple",
        showCheckBoxesMode: "always",
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

      // for deleteAll button
      onSelectionChanged: (data) => {
        // console.log(data);

        deleteAllBtnInstance.option("disabled", !data.selectedRowsData.length);
      },
    })
    .dxDataGrid("instance");
});
