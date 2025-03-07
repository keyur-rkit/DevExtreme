$(document).ready(() => {
  $("#PopupBtn").dxButton({
    text: "Popup",
    onClick: () => {
      popupInst.show();
    },
  });
  $("#PopoverBtn").dxButton({
    text: "Popover",
    onClick: () => {
      popoverInst.show();
    },
  });
  $("#ToastBtn").dxButton({
    text: "Toast",
    onClick: () => {
      toastInst.show();
    },
  });

  var popupInst = $("#popup")
    .dxPopup({
      width: 350,
      height: 300,
      // fullScreen: true, // cover fullscreen

      resizeEnabled: true, // cannot go over shading
      maxHeight: 400,
      minHeight: 100,
      maxWidth: 400,
      minWidth: 100,
      onResize: (e) => {
        console.log("resizing..");
      },
      // onResizeEnd
      // onResizeStart

      visible: true,
      closeOnOutsideClick: true,
      showCloseButton: false, // close btn in top-right
      // dragEnabled: true, // default true for desktop

      container: "#popupContainer", // which to render popup.
      position: "center", // default { my: 'center', at: 'center', of: window }

      // custom toolbarItems
      toolbarItems: [
        {
          text: "🏴‍☠️",
          location: "after",
        },
        {
          widget: "dxButton",
          location: "after",
          toolbar: "bottom",
          options: {
            // text: "Close",
            icon: "close",
            onClick: (e) => {
              // console.log(e);
              popupInst.hide();
            },
          },
        },
        {
          widget: "dxButton",
          location: "before",
          toolbar: "bottom",
          options: {
            // text: "👍",
            icon: "like",
            onClick: (e) => {
              DevExpress.ui.notify("Liked One piece", "success", 3000);
            },
          },
        },
      ],

      contentTemplate: () => {
        const $scrollView = $("<div/>");
        $scrollView.append(
          $(
            "<p><strong>One Piece</strong> is a Japanese manga series written and illustrated by Eiichiro Oda.</p>"
          ),
          $("<p><strong>Author</strong>: Eiichiro Oda</p>"),
          $(
            "<p><strong>Genres</strong>: Shonen manga, Action manga, Fantasy, Comedy</p>"
          ),
          $("<div>").dxTextBox({
            placeholder: "Fav character..",
          })
        );

        $scrollView.dxScrollView({
          width: "100%",
          height: "100%",
        });

        return $scrollView;
      },

      title: "One Piece(Popup)",
      // showTitle: false, // default true
      // contentTemplate

      // applies first specified in sequence: container => position.of => window
      // if true, Popup is displayed in modal mode
      shading: true,
      shadingColor: "rgba(44,44,44,0.9)",
    })
    .dxPopup("instance");

  var popoverInst = $("#popover")
    .dxPopover({
      width: 350,
      height: 300,
      // fullScreen: true, // cover fullscreen

      resizeEnabled: true, // cannot go over shading
      maxHeight: 400,
      minHeight: 100,
      maxWidth: 400,
      minWidth: 100,
      onResize: (e) => {
        console.log("resizing..");
      },
      // onResizeEnd
      // onResizeStart

      visible: false,
      closeOnOutsideClick: true,
      showCloseButton: false, // close btn in top-right
      // dragEnabled: true, // default true for desktop

      container: "#popupContainer", // which to render popup.
      position: "right", // default { my: 'center', at: 'center', of: window }

      // custom toolbarItems
      toolbarItems: [
        {
          text: "⚡",
          location: "after",
        },
        {
          widget: "dxButton",
          location: "after",
          toolbar: "bottom",
          options: {
            // text: "Close",
            icon: "close",
            onClick: (e) => {
              // console.log(e);
              popoverInst.hide();
            },
          },
        },
        {
          widget: "dxButton",
          location: "before",
          toolbar: "bottom",
          options: {
            // text: "👍",
            icon: "like",
            onClick: (e) => {
              DevExpress.ui.notify("Liked Demon Slayer", "success", 3000);
            },
          },
        },
      ],

      contentTemplate: () => {
        const $scrollView = $("<div/>");
        $scrollView.append(
          $(
            "<p><strong>Demon Slayer: Kimetsu no Yaiba</strong>  is a Japanese manga series written and illustrated by Koyoharu Gotouge.</p>"
          ),
          $("<p><strong>Author</strong>: Koyoharu Gotouge</p>"),
          $(
            "<p><strong>Genres</strong>: Shonen manga, Dark fantasy, Action manga, Fantasy</p>"
          ),
          $("<div>").dxTextBox({
            placeholder: "Fav character..",
          })
        );

        $scrollView.dxScrollView({
          width: "100%",
          height: "100%",
        });

        return $scrollView;
      },

      title: "Demon slayer (Popover)",
      showTitle: true, // default false
      // contentTemplate

      // applies first specified in sequence: container => position.of => window
      // if true, Popup is displayed in modal mode
      // shading: true,
      // shadingColor: "rgba(44,44,44,0.9)",

      /// different then popup
      target: "#hoverLink", // target element ? can we give multiple
      showEvent: {
        name: "mouseenter",
        delay: 0,
      }, // event to show popover
      hideEvent: {
        name: "dxdblclick dxclick",
        delay: 200,
      }, // event to hide popover
    })
    .dxPopover("instance");

  const types = ["error", "info", "success", "warning"];

  var toastInst = $("#toast")
    .dxToast({
      message: "hello.....",
      type: types[Math.floor(Math.random() * 4)], // 'error' | 'info' | 'success' | 'warning'
      width: 300,
      height: 100,

      displayTime: 5000,

      // closeOnClick: true, // default false
      closeOnOutsideClick: true, // default true for android
      // closeOnSwipe: true, // default true // for phone

      position: "bottom left",

      contentTemplate: () => {
        return $("<div/>").append(
          $("<div>").dxTextBox({
            placeholder: "Fav character..",
          })
        );
      },
    })
    .dxToast("instance");
});
