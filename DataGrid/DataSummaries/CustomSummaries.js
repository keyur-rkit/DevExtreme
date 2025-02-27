$(document).ready(() => {
  $("#gridContainer").dxDataGrid({
    dataSource: onePieceData,
    keyExpr: "id",
    paging: {
      pageSize: 10,
    },
    showBorders: true,
    columnAutoWidth: true,
    selection: {
      mode: "multiple",
      showCheckBoxesMode: "always",
    },
    selectedRowKeys: [2, 4, 6],
    onSelectionChanged: (e) => {
      e.component.refresh();
    },
    columns: [
      "id",
      "name",
      "power",
      "powerType",
      "firstAppearance",
      {
        dataField: "bounty",
        format: "currency",
      },
      "age",
    ],
    // Custom summary
    summary: {
      totalItems: [
        {
          showInColumn: "bounty",
          summaryType: "custom", // 'avg' | 'count' | 'custom' | 'max' | 'min' | 'sum'
          name: "TotalBounty", // to use in calculateCustomSummary
          valueFormat: "currency",
          alignment: "left", //  'center' | 'left' | 'right'

          // {0} - formatted summary value.
          // {1} - the parent column's caption. Available if the showInColumn property is specified.
          displayFormat: "Total Bounty : {0}",
        },
      ],
      calculateCustomSummary: (options) => {
        // console.log(options.value);
        if (options.name === "TotalBounty") {
          // reseting value in start
          if (options.summaryProcess === "start") {
            options.totalValue = 0;
          }
          // calculating value
          if (options.summaryProcess === "calculate") {
            if (options.component.isRowSelected(options.value.id)) {
              options.totalValue += options.value.bounty;
            }
          }
        }
      },
    },
  });
});
