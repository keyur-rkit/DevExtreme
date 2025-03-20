$(document).ready(() => {
  var treeViewInst = $("#animeTreeView")
    .dxTreeView({
      dataSource: animeData,
      dataStructure: "tree", //  'plain' | 'tree' (default)

      itemsExpr: "objects", // Specifies which data field contains nested items in data
      displayExpr: "name", // default "text"

      // disabled items that have "locked" true in data
      // default "disabled"
      disabledExpr: "locked",

      expandedExpr: "opened", // default "expanded"

      selectedExpr: "chosen", // default "selected"

      keyExpr: "id", // default "id"

      //   parentIdExpr: , // for plain mode
      // rootValue:, root value of parentId

      height: 400, // to enable scrolling
      width: 300,

      expandAllEnabled: true, // default false, "*" to expandAll
      expandEvent: "click", // default "dblClick"
      // if sub node expanded than its parent is also expended in defualt
      // we can change that behaviour using this option
      expandNodesRecursive: false,

      // can use dxTextBox options
      searchEditorOptions: {
        stylingMode: "underlined",
      },
      searchEnabled: true,
      searchExpr: "name",
      searchMode: "startswith", // 'contains' (default) | 'startswith' | 'equals'
      searchTimeout: 500,
      searchValue: "", // default searchValue

      selectionMode: "multiple", // 'multiple' (default) | 'single'
      showCheckBoxesMode: "selectAll", // 'none' (default) | 'normal' | 'selectAll'(require multiple)
      // selectNodesRecursive: false, // (require mutliple) default true
      // selectByClick: true, // default false
      selectAllText: "All", // default 'Select All'

      itemHoldTimeout: 1000, // default 750

      noDataText: "hehe! No data here", // custom text

      onItemHold: (e) => {
        alert(`${e.itemData.name} held for 1 sec`);
      },

      // defaults false , nodes are loaded on demand , only for "plain"
      // virtualModeEnabled: true,

      onItemClick: (e) => {
        var desc = e.itemData.desc;
        var img = e.itemData.img;
        if (desc) {
          $("#dataContainer").attr("class", "container");
          $("#desc").text(desc);
          $("#animeImg").attr("src", img);
        }
      },

      onSelectionChanged: (e) => {
        var selectedItems = e.component.getSelectedNodeKeys();
        $("#selected").text(`Selected Items: ${selectedItems}`);
      },
    })
    .dxTreeView("instance");

  // method to logs particular events
  // onItemCollapsed;
  // onItemContextMenu;
  // onItemExpanded;
  // onItemRendered;
  // onItemSelectionChanged;
  // onSelectAllValueChanged;
});

/*
// animationEnable
// dataSource
// dataStructure
// disabledExpr
// displayExpr
// expandAllEnabled
// expandedExpr
// expandEvent
// expandNodesRecursive
// itemHoldTimeout
// items
// itemsExpr
// keyExpr
// noDataText
// onItemClick
// onItemCollapsed
// onItemContextMenu
// onItemExpanded
// onItemRendered
// onItemSelectionChanged
// onSelectAllValueChanged
// onItemHold
// parentIdExpr
// rootValue
// searchEditorOptions
// searchEnabled
// searchExpr
// searchMode
// searchTimeout
// searchValue
// selectAllText
// selectByClick
// selectedExpr
// selectionMode 
// selectNodesRecursive
// showCheckBoxesMode
// height   
// virtualModeEnabled
*/
