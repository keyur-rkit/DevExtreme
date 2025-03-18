import { DecryptData } from "./Helpers/Encryption.js";
import { GetReq } from "./Helpers/ApiServices.js";
import { Redirect } from "./Helpers/Utils.js";
import { gridTypes } from "./Helpers/DataGrids.js";

$(document).ready(async () => {
  // checking token in sessionStorage
  var encryptedToken = sessionStorage.getItem("userToken");
  if (encryptedToken) {
    // decrypting token
    var userToken = DecryptData(encryptedToken);
  }

  // fetching user data using token
  if (userToken != null) {
    var headers = {
      Authorization: `Bearer ${userToken}`, // Pass token via Authorization header
    };
    await GetReq("https://dummyjson.com/auth/me", {}, headers)
      .then((res) => {
        sessionStorage.setItem("user", JSON.stringify(res));
        window.user = res;
      })
      .fail(() => {
        Redirect("./Login.html");
      });
  } else {
    Redirect("./Login.html");
  }

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
          InitGrid(selectedValue.config);
          e.component.option("value", selectedValue.id);
          e.component.close();
        },
      });
      return $list;
    },
  });

  $("#txtUsername").dxTextBox({
    value: window.user.username,
    width: 100,
    readOnly: true,
    hint: "username",
  });

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
      sessionStorage.removeItem("userToken");
      Redirect("./Login.html");
    },
  });

  // default grid configuration
  $("#dataGrid").dxDataGrid(gridTypes[0].config());

  function InitGrid(type) {
    $("#dataGrid").dxDataGrid("dispose");
    $("#dataGrid").dxDataGrid(type());
  }
});
