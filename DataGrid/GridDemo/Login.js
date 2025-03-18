import { EncryptData } from "./Helpers/Encryption.js";
import { PostReq } from "./Helpers/ApiServices.js";
import { Toast, Redirect } from "./Helpers/Utils.js";

$(document).ready(() => {
  $("#txtUsername")
    .dxTextBox({})
    .dxValidator({
      validationRules: [
        {
          type: "required",
          message: "Username is required",
        },
      ],
    });

  $("#txtPassword")
    .dxTextBox({
      // mode: "password",
    })
    .dxValidator({
      validationRules: [
        {
          type: "required",
          message: "Password is required",
        },
      ],
    });

  $("#btnLogin").dxButton({
    text: "Login",
    type: "success",
    useSubmitBehavior: true,
  });

  $("#form").on("submit", (e) => {
    e.preventDefault();

    var usernameInput = $("#txtUsername").dxTextBox("instance").option("value");
    var passwordInput = $("#txtPassword").dxTextBox("instance").option("value");

    var url = "https://dummyjson.com/auth/login";
    var data = JSON.stringify({
      username: usernameInput,
      password: passwordInput,
    });

    PostReq(url, data).then((res) => {
      // encrypting token before storing
      var encrypted = EncryptData(res.accessToken);
      sessionStorage.setItem("userToken", encrypted);

      Toast("Login successful", "success");

      Redirect("./Home.html");
    });
  });
});
