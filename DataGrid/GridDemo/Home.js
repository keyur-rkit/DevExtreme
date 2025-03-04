$(document).ready(() => {
  // Check login state
  var userToken = sessionStorage.getItem("userToken");

  var commonStlyingMode = "contained"; // 'text' | 'outlined' | 'contained'

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
        var user = res;
        console.log(user);

        initNavbar(user);

        initProfile(user); // default profile page
      },
      error: (e) => {
        console.log(`Error : ${e.responseJSON.message}`);
        window.location.href = "./Login.html";
      },
    });
  } else {
    window.location.href = "./Login.html";
  }

  function initNavbar(user) {
    $("#btnProfile").dxButton({
      text: "Profile",
      stylingMode: commonStlyingMode,
      type: "default",
      onClick: () => {
        initProfile(user);
      },
    });
    $("#btnPosts").dxButton({
      text: "Posts",
      stylingMode: commonStlyingMode,
      type: "default",
      onClick: () => {
        initPosts(user);
      },
    });

    // console.log(user);
    // only user can access users data
    if (user.role == "admin") {
      $("#btnUsers").dxButton({
        text: "Users",
        stylingMode: commonStlyingMode,
        type: "default",
        onClick: () => {
          initUsers(user);
        },
      });
    }

    // $("#profileImg").attr("src",user.image);

    $("#txtUsername").dxTextBox({
      value: user.username,
      width: 100,
      readOnly: true,
      hint: "username",
    });

    $("#txtRole").dxTextBox({
      value: user.role,
      width: 100,
      readOnly: true,
      hint: "role",
    });

    $("#btnLogout").dxButton({
      text: "Logout",
      type: "danger",
      onClick: () => {
        sessionStorage.removeItem("userToken");
        location.reload(); // to frefresh page
      },
    });
  }

  function initProfile(user) {
    $("#userContainer").dxDataGrid({
      dataSource: new DevExpress.data.CustomStore({
        key: "id",
        loadMode: "raw",
        load: () => {
          return $.ajax({
            url: `https://dummyjson.com/users?limit=208`,
            method: "GET",
          }).then((res) => {
            return res.users;
          });
        },

        update: (key, values) => {
          return $.ajax({
            url: `https://dummyjson.com/users/${key}`,
            method: "PUT",
            data: values,
          }).then((res) => {
            // console.log(res);
            DevExpress.ui.notify(
              {
                message: "User updated",
                position: "top center",
                width: 200,
              },
              "success",
              2000
            );
          });
        },
        insert: (values) => {
          return $.ajax({
            url: `https://dummyjson.com/users/add`,
            method: "POST",
            data: values,
          }).then((res) => {
            // console.log(res);
            DevExpress.ui.notify(
              {
                message: "User added",
                position: "top center",
                width: 200,
              },
              "success",
              2000
            );
          });
        },
        remove: (key) => {
          return $.ajax({
            url: `https://dummyjson.com/users/${key}`,
            method: "DELETE",
          }).then((res) => {
            // console.log(res);
            DevExpress.ui.notify(
              {
                message: "User Deleted",
                position: "top center",
                width: 200,
              },
              "success",
              2000
            );
          });
        },
      }),
      columns: [
        {
          dataField: "id",
          dataType: "number",
          caption: "ID",
          validationRules: [{ type: "required" }],
          allowEditing: false,
          allowGrouping: false,
        },
        {
          dataField: "firstName",
          dataType: "string",
          caption: "First Name",
          validationRules: [{ type: "required" }],
          allowGrouping: false,
        },
        {
          dataField: "lastName",
          dataType: "string",
          caption: "Last Name",
          validationRules: [{ type: "required" }],
          allowGrouping: false,
        },
        {
          dataField: "age",
          dataType: "number",
          caption: "Age",
          validationRules: [{ type: "required" }],
        },
        {
          dataField: "email",
          dataType: "string",
          caption: "Email",
          validationRules: [{ type: "required" }],
          allowGrouping: false,
        },
        {
          dataField: "phone",
          dataType: "string",
          caption: "Phone",
          validationRules: [{ type: "required" }],
          allowGrouping: false,
        },
        {
          dataField: "username",
          dataType: "string",
          caption: "Username",
          validationRules: [{ type: "required" }],
          allowGrouping: false,
        },
        {
          dataField: "birthDate",
          dataType: "date",
          caption: "Birth Date",
          validationRules: [{ type: "required" }],
          allowGrouping: false,
        },
        {
          dataField: "role",
          dataType: "string",
          caption: "Role",
          validationRules: [{ type: "required" }],
          allowGrouping: true,
        },
      ],

      visible: true,
      filterValue: ["id", "=", user.id], // to get login user data only

      showRowLines: true,
      showBorders: true,
      columnAutoWidth: true,

      // form editing
      editing: {
        mode: "form",
        allowUpdating: true,
        allowAdding: false,
        allowDeleting: false,
        useIcons: true,
        selectTextOnEditStart: true,
      },

      height: null, // for reseting height

      // reseting grouping
      groupPanel: {
        visible: false,
        allowColumnDragging: false,
      },

      // reseting sorting
      sorting: {
        mode: "none", //  "single" (default) | "multiple" | "none"
      },

      // reseting selection
      selection: {
        mode: "none", // single | multiple | none (default)
      },

      // reseting group summary
      // summary: null,

      // reseting exporting
      export: {
        enabled: false,
      },
    });

    $("#postContainer").dxDataGrid({
      dataSource: new DevExpress.data.CustomStore({
        key: "id",
        loadMode: "raw",
        load: () => {
          return $.ajax({
            url: `https://dummyjson.com/posts?limit=251`,
            method: "GET",
          }).then((res) => {
            return res.posts;
          });
        },
        update: (key, values) => {
          return $.ajax({
            url: `https://dummyjson.com/posts/${key}`,
            method: "PUT",
            data: values,
          }).then((res) => {
            // console.log(res);
            DevExpress.ui.notify(
              {
                message: "Post updated",
                position: "top center",
                width: 200,
              },
              "success",
              2000
            );
          });
        },
        insert: (values) => {
          return $.ajax({
            url: `https://dummyjson.com/posts/add`,
            method: "POST",
            data: values,
          }).then((res) => {
            // console.log(res);
            DevExpress.ui.notify(
              {
                message: "Post added",
                position: "top center",
                width: 200,
              },
              "success",
              2000
            );
          });
        },
        remove: (key) => {
          return $.ajax({
            url: `https://dummyjson.com/posts/${key}`,
            method: "DELETE",
          }).then((res) => {
            // console.log(res);
            DevExpress.ui.notify(
              {
                message: "Post Deleted",
                position: "top center",
                width: 200,
              },
              "success",
              2000
            );
          });
        },
      }),

      columns: [
        {
          dataField: "id",
          dataType: "number",
          caption: "ID",
          allowEditing: false, // disable editing
          validationRules: [{ type: "required" }],
        },
        {
          dataField: "title",
          dataType: "string",
          caption: "Title",
          allowEditing: true, // enable editing
          validationRules: [{ type: "required" }],
        },
        {
          dataField: "tags",
          dataType: "string",
          caption: "Tags",
          allowEditing: true, // enable editing
          // column template
          cellTemplate: (container, options) => {
            container.text(options.value.join(", "));
          },
          validationRules: [{ type: "required" }],
        },
        {
          caption: "Reactions",
          columns: [
            {
              dataField: "reactions.likes",
              dataType: "number",
              caption: "👍 Likes",
              allowEditing: false,
              validationRules: [{ type: "required" }],
              headerFilter: {
                dataSource: [
                  {
                    text: "Likes: 0-500",
                    value: [
                      "reactions.likes",
                      ">=",
                      0,
                      "and",
                      "reactions.likes",
                      "<=",
                      500,
                    ],
                  },
                  {
                    text: "Likes: 0-1000",
                    value: [
                      "reactions.likes",
                      ">=",
                      500,
                      "and",
                      "reactions.likes",
                      "<=",
                      1000,
                    ],
                  },
                  {
                    text: "Likes: >1000",
                    value: ["reactions.likes", ">=", 1000],
                  },
                ],
              },
            },

            {
              dataField: "reactions.dislikes",
              dataType: "number",
              caption: "👎 Dislikes",
              allowEditing: false,
              validationRules: [{ type: "required" }],
              headerFilter: {
                dataSource: [
                  {
                    text: "Dislikes: 0-10",
                    value: [
                      "reactions.dislikes",
                      ">=",
                      0,
                      "and",
                      "reactions.dislikes",
                      "<=",
                      10,
                    ],
                  },
                  {
                    text: "Dislikes: 10-50",
                    value: [
                      "reactions.dislikes",
                      ">=",
                      10,
                      "and",
                      "reactions.dislikes",
                      "<=",
                      50,
                    ],
                  },
                  {
                    text: "Dislikes: >50",
                    value: ["reactions.dislikes", ">", 50],
                  },
                ],
              },
            },
          ],
        },
        {
          dataField: "views",
          dataType: "number",
          caption: "Views",
          allowEditing: false, // disable editing
          validationRules: [{ type: "required" }],
        },
        {
          dataField: "userId",
          dataType: "number",
          caption: "User ID",
          allowEditing: false, // disable editing
          validationRules: [{ type: "required" }],
        },
      ],

      // reseting summary
      summary: null,

      visible: true,
      filterValue: ["userId", "=", user.id],

      showRowLines: true,
      showBorders: true,
      columnAutoWidth: true,

      // cell editing
      editing: {
        mode: "cell",
        allowDeleting: true,
        allowUpdating: true,
        useIcons: true,
      },

      // paging and pager only for posts page
      paging: {
        enabled: false,
        pageSize: 5,
      },
      pager: {
        visible: false,
        showPageSizeSelector: true,
        allowedPageSizes: [5, 10, 15, "all"],
        showNavigationButtons: true,
        displayMode: "compact",
      },

      // textArea for body of post in masterDetail
      masterDetail: {
        enabled: true,
        // template for masteDetail
        template: (container, options) => {
          const data = options.data;
          // console.log(options);
          var dataSource = options.component.getDataSource();
          $("<div>")
            .dxTextArea({
              value: data.body,
              readOnly: true,
              height: 90,
              onValueChanged: (e) => {
                data.body = e.value;
                // console.log(dataSource);
                // to call updated function of customStore
                dataSource._store._updateFunc(data.id, data);
              },
            })
            .appendTo(container);
        },
      },

      // reseting filtering
      filterPanel: {
        visible: false,
      },
      filterRow: {
        visible: false,
      },
      headerFilter: {
        visible: false,
      },

      // reseting toolbar
      onToolbarPreparing: (e) => {
        // console.log(e);
        var toolbarItems = e.toolbarOptions.items;
        toolbarItems.push();
      },
    });
  }

  function initPosts(user) {
    // post data editing bt role
    var userRole = user.role;
    var editing = null;
    if (userRole == "admin") {
      editing = {
        allowDeleting: true,
        allowUpdating: true,
      };
    } else if (userRole == "moderator") {
      editing = {
        allowDeleting: false,
        allowEditing: true,
      };
    } else {
      editing = {
        allowDeleting: false,
        allowUpdating: false,
      };
    }

    $("#userContainer").dxDataGrid({
      visible: false, // to hide users
    });

    var postGrid = $("#postContainer")
      .dxDataGrid({
        visible: true, // to show posts

        editing: editing,

        // enabling paging and pager
        paging: {
          enabled: true,
        },
        pager: {
          visible: true,
        },

        // enabling filterRow , panel and haderFilter
        filterPanel: {
          visible: true,
        },
        filterRow: {
          visible: true,
        },
        headerFilter: {
          visible: true,
        },
        filterValue: null,

        // toolbar customization
        onToolbarPreparing: (e) => {
          console.log(e);
          var toolbarItems = e.toolbarOptions.items;
          toolbarItems.push(
            {
              widget: "dxCheckBox",
              options: {
                text: "RowLines",
                onValueChanged: (e) => {
                  // console.log(e);
                  postGrid.option("showRowLines", e.value);
                },
              },
              location: "after", // 'after' | 'before' | 'center'
            },
            {
              widget: "dxCheckBox",
              options: {
                text: "ColumnLines",
                onValueChanged: (e) => {
                  // console.log(e);
                  postGrid.option("showColumnLines", e.value);
                },
              },
              location: "after", // 'after' | 'before' | 'center'
            }
          );
        },

        // total summary (grid summary)
        summary: {
          totalItems: [
            {
              column: "id",
              summaryType: "count",
              alignment: "center",
              displayFormat: "Count : {0}",
            },
            {
              column: "👍 Likes",
              summaryType: "max",
              alignment: "right",
              displayFormat: "Max : {0}",
              skipEmptyValues: true,
            },
            {
              column: "👎 Dislikes",
              summaryType: "min",
              alignment: "right",
              displayFormat: "Min : {0}",
              skipEmptyValues: true,
            },
          ],
        },
      })
      .dxDataGrid("instance");
  }

  function initUsers(user) {
    $("#userContainer").dxDataGrid({
      visible: true, // to show users
      filterValue: null, // to show all users

      editing: {
        allowDeleting: true,
        allowAdding: true,
        allowUpdating: true,
      },

      // infinite scrolling
      height: 440,
      scrolling: {
        mode: "virtual",
        rowRenderingMode: "virtual",
      },

      // grouping
      grouping: {
        expandMode: "buttonClick", //  'buttonClick' | 'rowClick'
      },
      groupPanel: {
        visible: true, // to enable group panel
        allowColumnDragging: true, // enable/disable dragging
      },

      // mutliple sorting
      sorting: {
        // use "shift" to sort
        // use "ctrl" to remove sort
        mode: "multiple",
      },

      // mutliple selection
      selection: {
        mode: "multiple",
        showCheckBoxesMode: "always",
      },

      // group summary
      summary: {
        groupItems: [
          {
            name: "countSummary",
            column: "id",
            summaryType: "count",
          },
          {
            column: "age",
            summaryType: "min",
            displayFormat: "Min : {0} years",
            alignByColumn: true,
          },
        ],
      },

      // for enabling exporting
      export: {
        enabled: true,
        allowExportSelectedData: true,
      },
      onExporting(e) {
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Employees');

        DevExpress.excelExporter.exportDataGrid({
          component: e.component,
          worksheet,
          autoFilterEnabled: true,
        }).then(() => {
          workbook.xlsx.writeBuffer().then((buffer) => {
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Employees.xlsx');
          });
        });
      },
    });

    $("#postContainer").dxDataGrid({
      visible: false, // to hide posts
    });
  }
});
