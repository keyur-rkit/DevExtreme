$(document).ready(() => {
  var dummyImgUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRk9YCFdwTn7Fc0x-ug4IQUGb9Q5EDQC-bPhQ&s";

  // popup to show from to get anime data
  var popupInst = $("#addChildPopup")
    .dxPopup({
      titleTemplate: (e) => {
        // console.log(e);
        return $(`<a href="https://www.google.com" target="_blank">`).html(
          `<img src=${dummyImgUrl} height="50" width="50" />`
        );
      },
      title: "New Anime Data", // not work with titleTemplate

      fullScreen: true,
      visible: false,
      contentTemplate: (contentElement) => {
        contentElement.append(
          // form to get anime data in popup
          $('<div id="childForm">').dxForm({
            formData: {},
            items: [
              {
                dataField: "name",
                label: { text: "Name" },
                isRequired: true,
              },
              {
                dataField: "desc",
                label: { text: "Description" },
                isRequired: true,
              },
              {
                dataField: "img",
                label: { text: "Image Url" },
                isRequired: true,
              },
              {
                dataField: "parentId",
                label: { text: "Anime Data Type" },
                editorType: "dxSelectBox",
                editorOptions: {
                  items: parentItems,
                  displayExpr: "name",
                  valueExpr: "id",
                },
                isRequired: true,
              },
            ],
          })
        );
      },
      // custom save and close buttons
      toolbarItems: [
        {
          widget: "dxButton",
          location: "after",
          toolbar: "bottom",
          options: {
            text: "Save",
            onClick: () => {
              var formInst = $("#childForm").dxForm("instance");
              var formData = formInst.option("formData");
              // validate form fields
              if (formInst.validate().isValid) {
                // if all field presents then add data
                animeData.insert(formData).then(() => {
                  // loadPanel for 1.5s
                  panelInst.option("visible", true);
                  setTimeout(() => {
                    panelInst.option("visible", false);
                    toastInst.show();
                    $("#addChildPopup").dxPopup("hide");
                  }, 1500);
                });
              }
            },
          },
        },
        {
          widget: "dxButton",
          location: "after",
          toolbar: "bottom",
          options: {
            icon: "close",
            onClick: () => {
              popupInst.hide();
            },
          },
        },
      ],
    })
    .dxPopup("instance");

  // toast configuration
  var toastInst = $("#toast")
    .dxToast({
      message: "Anime Data Added",
      type: "success",
      width: 200,
      height: 50,

      displayTime: 2000,

      position: "bottom center",
    })
    .dxToast("instance");

  // loadPanel configuration
  var panelInst = $("#loadPanel")
    .dxLoadPanel({
      visible: false,
      closeOnOutsideClick: true,
      container: "#addChildPopup", // container to show popup
      showPane: true, // box behind indicator or message
    })
    .dxLoadPanel("instance");

  // menu to add anime data by type
  $("#addAnimeMenu").dxMenu({
    dataSource: parentItems,
    displayExpr: "name",

    // handle click of menu items
    onItemClick: (e) => {
      popupInst.show();
      // change title of popup as menu clicked
      popupInst.option("title", e.itemData.name);

      var formInst = $("#childForm").dxForm("instance");
      var parentIdEditor = formInst.getEditor("parentId");

      // setting AnimeDataType as item clicked and
      // make it readOnly for disable editing
      parentIdEditor.option("value", e.itemData.id);
      parentIdEditor.option("readOnly", true);
    },
  });

  // treeView to show anime Data
  var treeViewInst = $("#animeTreeView")
    .dxTreeView({
      dataSource: animeData,
      dataStructure: "plain",

      itemsExpr: "objects",
      displayExpr: "name",
      disabledExpr: "locked",
      parentIdExpr: "parentId", // Specifies which data field contains the parent ID
      rootValue: null, // Root value of parentId

      expandEvent: "click",

      searchEditorOptions: {
        stylingMode: "underlined",
      },
      searchEnabled: true,
      searchExpr: "name",

      // show img and desc as treeview item clicked
      onItemClick: (e) => {
        var desc = e.itemData.desc;
        var img = e.itemData.img;
        if (desc) {
          $("#desc").text(desc);
          $("#animeImg").attr("src", img);
        }
      },
    })
    .dxTreeView("instance");
});

// dummy img url to test by adding new item
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS1jN43VAAtUclbqteK1VkpnoP_5GGSfNy1Q&s
