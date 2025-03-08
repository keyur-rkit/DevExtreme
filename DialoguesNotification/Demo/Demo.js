$(document).ready(() => {
  var popupInst = $("#addChildPopup")
    .dxPopup({
      title: "New Anime Data",
      fullScreen: true,
      visible: false,
      contentTemplate: (contentElement) => {
        contentElement.append(
          $('<div id="childForm">').dxForm({
            formData: {},
            items: [
              { dataField: "id", label: { text: "ID" }, isRequired: true },
              {
                dataField: "name",
                label: { text: "Name" },
                isRequired: true,
              },
              { dataField: "desc", label: { text: "Description" } },
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
              // console.log(formInst.validate().isValid);
              if (formInst.validate().isValid) {
                console.log(formData);
                animeData.insert(formData).then(() => {
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
            onClick: (e) => {
              popupInst.hide();
            },
          },
        },
      ],
    })
    .dxPopup("instance");

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

  var panelInst = $("#loadPanel")
    .dxLoadPanel({
      visible: false,
      closeOnOutsideClick: true,
      container: "#addChildPopup",
      showPane: true, // box behind indicator or message
    })
    .dxLoadPanel("instance");

  $("#addAnimeMenu").dxMenu({
    dataSource: parentItems,
    displayExpr: "name",
    onItemClick: (e) => {
      console.log(e);
      setTimeout(() => {
        // Delay ensures the content is fully rendered before accessing it
        var formInst = $("#childForm").dxForm("instance");
        console.log(formInst); // Now it should return a valid instance

        popupInst.show();
      }, 100); // A short delay ensures content rendering
    },
  });
  var treeViewInst = $("#animeTreeView")
    .dxTreeView({
      dataSource: animeData,
      dataStructure: "plain", // 'plain' | 'tree' (default)

      itemsExpr: "objects", // Specifies which data field contains nested items in data
      displayExpr: "name", // default "text"
      // disabled items that have "locked" true in data
      // default "disabled"
      disabledExpr: "locked",
      keyExpr: "id", // default "id"
      parentIdExpr: "parentId", // Specifies which data field contains the parent ID
      rootValue: null, // Root value of parentId

      expandEvent: "click", // default "dblClick"

      // can use dxTextBox
      searchEditorOptions: {
        stylingMode: "underlined",
      },
      searchEnabled: true,
      searchExpr: "name",
    })
    .dxTreeView("instance");
});
