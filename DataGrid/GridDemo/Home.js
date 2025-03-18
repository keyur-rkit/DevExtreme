import { DecryptData } from "./Helpers/Encryption.js";
import { GetReq } from "./Helpers/ApiServices.js";
import { Redirect } from "./Helpers/Utils.js";
import { gridTypes } from "./Helpers/DataGrids.js";

$(document).ready(async () => {
  // Check if a token exists in sessionStorage
  var encryptedToken = sessionStorage.getItem("userToken");
  if (encryptedToken) {
    // Decrypt the token
    var userToken = DecryptData(encryptedToken);
  }

  // Fetch user data using the decrypted token
  if (userToken != null) {
    var headers = {
      Authorization: `Bearer ${userToken}`, // Pass token via Authorization header
    };
    await GetReq("https://dummyjson.com/auth/me", {}, headers)
      .then((res) => {
        window.user = res; // Store user data in the global window object
      })
      .fail(() => {
        Redirect("./Login.html"); // Redirect to login page if request fails
      });
  } else {
    Redirect("./Login.html"); // Redirect to login page if no token is found
  }

  // Initialize the drop-down box with grid types
  $("#dropDown").dxDropDownBox({
    dataSource: gridTypes,
    displayExpr: "name",
    valueExpr: "id",
    value: 1,
    contentTemplate: (e) => {
      const $list = $("<div>").dxList({
        dataSource: e.component.option("dataSource"),
        displayExpr: "name",
        selectionMode: "single",
        onSelectionChanged: (selectionEvent) => {
          var selectedValue = selectionEvent.addedItems[0];
          InitGrid(selectedValue.config); // Initialize the grid with the selected configuration
          e.component.option("value", selectedValue.id);
          e.component.close();
        },
      });
      return $list;
    },
  });

  // Display the username in a read-only text box
  $("#txtUsername").dxTextBox({
    value: window.user.username,
    width: 100,
    readOnly: true,
    hint: "username",
  });

  // Display the user role in a read-only text box
  $("#txtRole").dxTextBox({
    value: window.user.role,
    width: 100,
    readOnly: true,
    hint: "role",
  });

  $("#btnLogout").dxButton({
    text: "Logout",
    type: "danger",
    onClick: () => {
      sessionStorage.removeItem("userToken"); // Remove the token from sessionStorage
      Redirect("./Login.html"); // Redirect to login page
    },
  });

  // Initialize the data grid with the default configuration
  // of profile data grid
  $("#dataGrid").dxDataGrid(gridTypes[0].config());

  /**
   * Initialize the data grid with the selected configuration.
   *
   * @param {Function} type - The grid configuration function.
   */
  function InitGrid(type) {
    $("#dataGrid").dxDataGrid("dispose"); // Dispose of the current grid
    $("#dataGrid").dxDataGrid(type()); // Initialize the new grid
  }
});
