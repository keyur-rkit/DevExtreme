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
      showBorders: true,
      columnAutoWidth: true,
      columns: [
        "id",
        "name",
        {
          dataField: "prepTimeMinutes",
          caption: "Prep Time (out of 60 mins)",
        },
        {
          dataField: "cookTimeMinutes",
          caption: "Cook Time (out of 60 mins)",
        },
        "servings",
        "difficulty",
        {
          dataField: "cuisine",
          allowFiltering: true,
        },
        "caloriesPerServing",
      ],
      paging: {
        pageSize: 7,
      },
      selection: {
        mode: "multiple", // single | multiple | none (default)
        allowSelectAll: true, // can/can't select all
        selectAllMode: "page", // page | allPages (default)
        showCheckBoxesMode: "always", // always | none | onClick (default) | onLongTap (long mouse click)
      },
      onSelectionChanged: (e) => {
        var totalCal = 0;
        //   console.log(e);
        e.selectedRowsData.forEach((element) => {
          totalCal += element.caloriesPerServing;
        });
        $("#totalCal").dxTextBox({
          value: `Total Calories : ${totalCal}`,
        });
      },
      filterPanel: {
        visible: true,
      },
      showColumnLines: false,

      // custom toolBar
      onToolbarPreparing: (e) => {
        //   console.log(e);
        var toolbarItems = e.toolbarOptions.items;

        // predefined buttons :
        // 'addRowButton' | 'applyFilterButton' | 'columnChooserButton' | 'exportButton'
        // 'revertButton' | 'saveButton' | 'searchPanel' | 'groupPanel'
        toolbarItems.push(
          {
            widget: "dxTextBox",
            options: {
              readOnly: true,
              elementAttr: {
                id: "totalCal",
              },
              value: "Total Calories : 0",
            },
            location: "before", // 'after' | 'before' | 'center'
          },
          {
            widget: "dxSelectBox",
            options: {
              items: [
                "Italian",
                "Asian",
                "American",
                "Mexican",
                "Mediterranean",
                "Pakistani",
                "Japanese",
                "Moroccan",
                "Korean",
                "Greek",
                "Thai",
                "Turkish",
                "Smoothie",
                "Indian",
                "Lebanese",
                "Brazilian",
              ],
              onValueChanged: (e) => {
                //   console.log(e);
                var filter = ["cuisine", "contains", e.value];
                gridInstance.option("filterValue", filter);
              },
            },
            location: "before", // 'after' | 'before' | 'center'
          },
          {
            widget: "dxCheckBox",
            options: {
              text: "RowLines",
              onValueChanged: (e) => {
                // console.log(e);
                gridInstance.option("showRowLines", e.value);
              },
            },
            location: "after", // 'after' | 'before' | 'center'
          },
          {
            widget: "dxCheckBox",
            options: {
              text: "ColumnLines",
              onValueChanged: (e) => {
                // console.log(e);
                gridInstance.option("showColumnLines", e.value);
              },
            },
            location: "after", // 'after' | 'before' | 'center'
          }
        );
      },
    })
    .dxDataGrid("instance");
});
