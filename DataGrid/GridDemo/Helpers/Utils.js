function Toast(message, type) {
  DevExpress.ui.notify(
    {
      message: message,
      position: "top center",
      width: 200,
    },
    type,
    2000
  );
}

function Redirect(path) {
  setTimeout(() => {
    window.location.href = path;
  }, 500);
}

export { Toast, Redirect };
