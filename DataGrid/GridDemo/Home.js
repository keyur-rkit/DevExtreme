$(document).ready(() => {
  // Check login state
  var userToken = sessionStorage.getItem("userToken");
  var user = null;

  // fetching user data
  if (userToken != null) {
    $.ajax({
      url: "https://dummyjson.com/auth/me",
      type: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`, // Pass JWT via Authorization header
      },
      success: (res) => {
        // console.log(res);
        user = res;
        console.log(user);

        initGrid(user);
      },
      error: (e) => {
        console.log(`Error : ${e.responseJSON.message}`);
        window.location.href = "./Login.html";
      },
    });
  } else {
    window.location.href = "./Login.html";
  }

  function initGrid(user) {
    $("#userContainer").dxDataGrid({
      dataSource: new DevExpress.data.ArrayStore({
        key: "id",
        data: [user],
      }),

      showRowLines: true,
      rowAlternationEnabled: true,
      showBorders: true,
      columnAutoWidth: true,
      columns: [
        "id",
        "firstName",
        "lastName",
        "age",
        "email",
        "phone",
        "username",
        "birthDate",
        "role",
      ],
    });
    $("#recipeContainer").dxDataGrid({
      dataSource: new DevExpress.data.CustomStore({
        key: "id",
        loadMode: "raw",
        load: () => {
          return $.ajax({
            url: "https://dummyjson.com/recipes?limit=50",
            method: "GET",
          }).then((res) => {
            return res.recipes;
          });
        },
      }),

      showRowLines: true,
      rowAlternationEnabled: true,
      showBorders: true,
      columnAutoWidth: true,
      columns: ["id", "name", "cuisine", "caloriesPerServing", "userId"],
      filterValue: ["userId", "=", user.id],
    });
    $("#postContainer").dxDataGrid({
      dataSource: new DevExpress.data.CustomStore({
        key: "id",
        loadMode: "raw",
        load: () => {
          return $.ajax({
            url: `https://dummyjson.com/posts/user/${user.id}`,
            method: "GET",
          }).then((res) => {
            return res.posts;
          });
        },
      }),

      showRowLines: true,
      rowAlternationEnabled: true,
      showBorders: true,
      columnAutoWidth: true,
      columns: [
        "id",
        "title",
        // "body",
        {
          dataField: "tags",
          caption: "Tags",
          cellTemplate: (container, options) => {
            container.text(options.value.join(", "));
          },
        },
        {
          dataField: "reactions",
          caption: "Reactions",
          cellTemplate: (container, options) => {
            container.text(
              `Likes: ${options.value.likes}, Dislikes: ${options.value.dislikes}`
            );
          },
        },
        "views",
        "userId",
      ],
    });
  }
});
