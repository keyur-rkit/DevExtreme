/**
 * Displays a toast notification.
 *
 * @param {string} message - The message to display in the toast.
 * @param {string} type - The type of nofity 
 */
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

/**
 * Redirects the browser to the specified path after a delay.
 *
 * @param {string} path - The URL path to redirect to.
 */
function Redirect(path) {
  setTimeout(() => {
    window.location.href = path;
  }, 500);
}

export { Toast, Redirect };
