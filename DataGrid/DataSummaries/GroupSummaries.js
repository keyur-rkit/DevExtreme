$(document).ready(() => {
  $("#gridContainer").dxDataGrid({
    dataSource: onePieceData,
    paging: {
      pageSize: 10,
    },
    showBorders: true,
    columnAutoWidth: true,
    columns: [
      "id",
      "name",
      "power",
      {
        dataField: "powerType",
        groupIndex: 0,
      },
      "firstAppearance",
      "bounty",
      "age",
    ],
    // group summary
    summary: {
      groupItems: [
        {
          column: "bounty",
          summaryType: "max", // 'avg' | 'count' | 'custom' | 'max' | 'min' | 'sum'
          showInGroupFooter: true, // displayed in the group footer
          //   alignByColumn: true, // align them by the corresponding columns within the group row
          valueFormat: "currency",
        },
        {
          column: "age",
          summaryType: "min",
          showInGroupFooter: true,
          // showInColumn: "bounty" , // summary goes to this column

          // {0} - formatted summary value.
          // {1} - the parent column's caption. Available if the showInColumn property is specified.
          displayFormat: "Min : {0} years",

          // alignByColumn: true,
        },
        {
          name: "countSummary",
          column: "id",
          summaryType: "count",
        },
      ],
    },
    // for sorting group by summary
    sortByGroupSummaryInfo: [
      {
        groupColumn: "powerType", // column that must be used in grouping
        sortOrder: "asc", //  undefined | 'asc' | 'desc'
        summaryItem: "countSummary", //  whose values must be used to sort groups. , name from summary
      },
    ],
  });
});
