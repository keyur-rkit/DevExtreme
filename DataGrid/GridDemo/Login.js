import { EncryptData } from "./Helpers/Encryption.js";
import { PostReq } from "./Helpers/ApiServices.js";
import { Toast, Redirect } from "./Helpers/Utils.js";

$(document).ready(() => {
  // Initialize the username input box with validation
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

  // Initialize the password input box with validation
  $("#txtPassword")
    .dxTextBox({})
    .dxValidator({
      validationRules: [
        {
          type: "required",
          message: "Password is required",
        },
      ],
    });

  // Initialize the login button
  $("#btnLogin").dxButton({
    text: "Login",
    type: "success",
    useSubmitBehavior: true,
  });

  // Handle form submission
  $("#form").on("submit", (e) => {
    e.preventDefault();

    // Get the values from the username and password input fields
    var usernameInput = $("#txtUsername").dxTextBox("instance").option("value");
    var passwordInput = $("#txtPassword").dxTextBox("instance").option("value");

    // API endpoint for login
    var url = "https://dummyjson.com/auth/login";
    var data = JSON.stringify({
      username: usernameInput,
      password: passwordInput,
    });

    // Send login request
    PostReq(url, data).then((res) => {
      // Encrypt the token before storing it
      var encrypted = EncryptData(res.accessToken);
      sessionStorage.setItem("userToken", encrypted);

      // Show success message
      Toast("Login successful", "success");

      // Redirect to home page
      Redirect("./Home.html");
    });
  });
});
