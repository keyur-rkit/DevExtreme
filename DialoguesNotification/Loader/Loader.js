$(document).ready(() => {
  $("#showLoadButton").dxButton({
    text: "Show",
    onClick: () => {
      indicatorInst.option("visible", true);
      panelInst.show();
    },
  });
  $("#hideLoadButton").dxButton({
    text: "Hide",
    onClick: () => {
      indicatorInst.option("visible", false);
      panelInst.hide();
    },
  });
  var indicatorInst = $("#loadIndicator")
    .dxLoadIndicator({
      visible: false,
      indicatorSrc: "/DialoguesNotification/Loader/loader2.gif",
      height: "100%",
      width: "100%",
    })
    .dxLoadIndicator("instance");

  var customStore = new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    load: () => {
      return $.ajax({
        url: "https://67adeabb9e85da2f020bb443.mockapi.io/anime",
        method: "GET",
      }).then((data) => {
        return new Promise((resolve) => {
          setTimeout(() => resolve(data), 2000); // Delay 2 seconds
        });
      });
    },
    onLoading: () => {
      indicatorInst.option("visible", true);
    },
    onLoaded: () => {
      indicatorInst.option("visible", false);
    },
  });

  var grid2Instance = $("#gridContainer")
    .dxDataGrid({
      dataSource: customStore,
      showBorders: true,
    })
    .dxDataGrid("instance");

  var panelInst = $("#loadPanel")
    .dxLoadPanel({
      visible: true,
      closeOnOutsideClick: true,
      // container: "#container",
      // delay: 1000, // in milliseconds after which the load panel is displayed
      // maxHeight: 200,
      // maxWidth: 200,
      message: "hmm...", // not for  Material Design theme
      onHidden: (e) => {
        console.log("loadPanel Hidden");
      },
      onHiding: (e) => {
        console.log("loadPanel Hiding");
      },
      onShowing: () => {
        console.log("loadPanel Showing");
      },
      onShown: () => {
        console.log("loadPanel Shown");
      },
      position: { of: "#container" }, // position for loadPanel
      // shading: false,  // default true
      shadingColor: "rgba(48,44,44,1)",
      // showIndicator: false,
      showPane: false, // box behind indicator or message
      // width: 2000, // width for pane
    })
    .dxLoadPanel("instance");
});
