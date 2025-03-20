$(document).ready(() => {
  $("#animeMenu").dxMenu({
    // items or dataSource

    // items: [
    //   {
    //     items: animeData, // Specifies nested menu items.
    //     icon: "save", // icon for menu button

    //     // closeMenuOnClick: false, // default true ???
    //     // disabled: true,
    //     // visible: false,

    //     // menu button custom template
    //     // override icon
    //     // template: "<div>Anime Verse</div>",
    //   },
    // ],
    dataSource: animeData,

    itemsExpr: "objects", // Specifies which data field contains nested items in data
    displayExpr: "name", // default "text"

    // disabled items that have "locked" true in data
    // default "disabled"
    disabledExpr: "locked",

    // default "selected"
    selectedExpr: "chosen",

    orientation: "vertical", // 'horizontal'(default) | 'vertical'

    animation: {
      show: { type: "fadeIn", from: 0, to: 1, duration: 100 },
      hide: { type: "fadeOut", from: 1, to: 0, duration: 100 },
    }, // animation configuration
    cssClass: "colorClass",

    hideSubmenuOnMouseLeave: true, // default false

    selectByClick: true,
    selectionMode: "single", //  'none' (default) | 'single'
    // executed when a collection item is clicked
    onSelectionChanged: (e) => {
      console.log(e);
      var desc = e.addedItems[0].desc;
      var img = e.addedItems[0].img;
      if (desc) {
        $("#dataContainer").attr("class", "container");
        $("#desc").text(desc);
        $("#animeImg").attr("src", img);
      }
    },

    // if selection is "none" we can use onItemClick
    // onItemClick

    onItemContextMenu: (e) => {
      console.log(`${e.itemData.name} get rightClicked`);
    },
    onItemRendered: (e) => {
      console.log(`${e.itemData.name} rendered`);
    },
    onSubmenuHidden: (e) => {
      e.rootItem.css("color", "white");
    },
    onSubmenuHiding: () => {
      console.log("submenu hiding");
    },
    onSubmenuShowing: () => {
      console.log("submenu showing");
    },
    onSubmenuShown: (e) => {
      e.rootItem.css("color", "red");
    },

    submenuDirection: "auto", // "auto" (default) | "leftOrTop" | "rightOrBottom"

    // default "onClick" // for direct items
    showFirstSubmenuMode: { name: "onHover", delay: { show: 50, hide: 50 } },
    // default "onHover" // for submenu items
    showSubmenuMode: { name: "onHover", delay: { show: 50, hide: 50 } },
  });
});

/*
// animation
// dataSource
// items
// itemExpr
// itemTemplate , custom menu template
// cssClass
// disabledExpr
// displayExpr
// hideSubmenuOnMouseLeave
// itemExpr
// onItemClick
// onItemContextMenu
// onItemRendered
// onSubmenuHidden
// onSubmenuHiding
// onSubmenuShowing
// onSubmenuShown
// orientation
// selectByClick
// selectedExpr
// selectedItem
// selectionMode
// showFirstSubmenuMode
// showSubmenuMode
// submenuDirection
*/
