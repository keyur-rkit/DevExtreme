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

  $("#gridContainer").dxDataGrid({
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
    paging: {
      pageSize: 6,
    },
    filterRow: {
      visible: true, // default false
      betweenEndText: "Ends", // text to show for "End" in between
      betweenStartText: "Starts", // text to show for "Start" in between
      resetOperationText: "Clear", // text to show for "reset" in filters
      applyFilter: "onClick", // onClick | auto
      applyFilterText: "Hint for Apply filter",

      // custom text for filters
      operationDescriptions: {
        between: "વચ્ચે",
        contains: "સમાવે છે",
        endsWith: "સાથે સમાપ્ત થાય છે",
        equal: "સરખું",
        greaterThan: "કરતાં મોટું",
        greaterThanOrEqual: "કરતાં મોટું અથવા સરખું",
        lessThan: "કરતાં ઓછું",
        lessThanOrEqual: "કરતાં ઓછું અથવા સરખું",
        notContains: "સમાવતું નથી",
        notEqual: "સરખું નથી",
        startsWith: "સાથે શરૂ થાય છે",
      },

      // showOperationChooser: false, // default true
      // showAllText: "All", // Used only when a cell of the filter row contains a select box.
    },
    filterPanel: {
      // displays the applied filter expression
      visible: true, // default false
      customizeText: (e) => {
        // console.log(e);
        return `Filter : ${e.text}`;
      },
      filterEnabled: false, // by default filter appiled or not

      // custom texts
      texts: {
        clearFilter: "Clear Filter",
        createFilter: "Create",
        filterEnabledHint: "Enable Filter",
      },
    },
    filterValue: ["id", "between", [5, 10]], // default filter
  });
});
