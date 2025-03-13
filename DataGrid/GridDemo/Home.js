$(document).ready(async () => {
  // Check login state
  var userToken = sessionStorage.getItem("userToken");

  // fetching user data
  if (userToken != null) {
    await $.ajax({
      url: "https://dummyjson.com/auth/me",
      type: "GET",
      headers: {
        Authorization: `Bearer ${userToken}`, // Pass JWT via Authorization header
      },
      success: (res) => {
        // console.log(res);

        window.user = res;
        console.log(window.user);
      },
      error: (e) => {
        console.log(`Error : ${e.responseJSON.message}`);
        window.location.href = "./Login.html";
      },
    });
  } else {
    window.location.href = "./Login.html";
  }

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
      location.reload(); // to frefresh page
    },
  });

  const tabPanel = $("#tabpanel")
    .dxTabPanel({
      width: "100%",
      animationEnabled: true,
      swipeEnabled: true,
      loop: true,
      showNavButtons: true,

      items: [
        {
          title: "Profile",
          template: () => {
            return $(`<div id="userProfile">`).dxDataGrid({
              dataSource: new DevExpress.data.CustomStore({
                key: "id",
                loadMode: "raw",
                load: () => {
                  return $.ajax({
                    url: `https://dummyjson.com/users/${window.user.id}`,
                    method: "GET",
                  }).then((res) => {
                    return [res];
                  });
                },
                // update: (key, values) => {
                //   return $.ajax({
                //     url: `https://dummyjson.com/users/${key}`,
                //     method: "PUT",
                //     data: values,
                //   }).then((res) => {
                //     // console.log(res);
                //     DevExpress.ui.notify(
                //       {
                //         message: "User updated",
                //         position: "top center",
                //         width: 200,
                //       },
                //       "success",
                //       2000
                //     );
                //   });
                // },
              }),
              columns: [
                {
                  dataField: "id",
                  dataType: "number",
                  caption: "ID",
                  validationRules: [{ type: "required" }],
                  allowEditing: false,
                },
                {
                  dataField: "firstName",
                  dataType: "string",
                  caption: "First Name",
                  validationRules: [{ type: "required" }],
                },
                {
                  dataField: "lastName",
                  dataType: "string",
                  caption: "Last Name",
                  validationRules: [{ type: "required" }],
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
                },
                {
                  dataField: "phone",
                  dataType: "string",
                  caption: "Phone",
                  validationRules: [{ type: "required" }],
                },
                {
                  dataField: "username",
                  dataType: "string",
                  caption: "Username",
                  validationRules: [{ type: "required" }],
                },
                {
                  dataField: "birthDate",
                  dataType: "date",
                  caption: "Birth Date",
                  validationRules: [{ type: "required" }],
                },
                {
                  dataField: "role",
                  dataType: "string",
                  caption: "Role",
                  validationRules: [{ type: "required" }],
                },
              ],

              showRowLines: true,
              showBorders: true,
              columnAutoWidth: true,

              // form editing
              editing: {
                mode: "form",
                allowUpdating: true,
                useIcons: true,
                selectTextOnEditStart: true,
              },
            });
          },
        },
        {
          title: "Own Posts",
          template: () => {
            return $(`<div id="userPost">`).dxDataGrid({
              dataSource: new DevExpress.data.CustomStore({
                key: "id",
                loadMode: "raw",
                load: () => {
                  return $.ajax({
                    url: `https://dummyjson.com/users/${window.user.id}/posts`,
                    method: "GET",
                  }).then((res) => {
                    return res.posts;
                  });
                },
              }),

              columns: [
                {
                  dataField: "id",
                  dataType: "number",
                  caption: "ID",
                },
                {
                  dataField: "title",
                  dataType: "string",
                  caption: "Title",
                },
                {
                  dataField: "tags",
                  dataType: "string",
                  caption: "Tags",
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
                },
                {
                  dataField: "userId",
                  dataType: "number",
                  caption: "User ID",
                },
              ],

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
            });
          },
        },
        {
          title: "Feed",
          template: () => {
            var userRole = window.user.role;
            var editing = null;
            if (userRole == "admin") {
              editing = {
                mode: "popup",
                allowDeleting: true,
                allowUpdating: true,
                useIcons: true,
              };
            } else if (userRole == "moderator") {
              editing = {
                mode: "popup",
                allowDeleting: false,
                allowEditing: true,
                useIcons: true,
              };
            } else {
              editing = {
                allowDeleting: false,
                allowUpdating: false,
              };
            }

            return $(`<div id="feed">`).dxDataGrid({
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
                  validationRules: [{ type: "required" }],
                },
                {
                  dataField: "title",
                  dataType: "string",
                  caption: "Title",
                  validationRules: [{ type: "required" }],
                },
                {
                  dataField: "tags",
                  dataType: "string",
                  caption: "Tags",
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
                  validationRules: [{ type: "required" }],
                },
                {
                  dataField: "userId",
                  dataType: "number",
                  caption: "User ID",
                  validationRules: [{ type: "required" }],
                },
              ],

              showRowLines: true,
              showBorders: true,
              columnAutoWidth: true,

              // editing based on role
              editing: editing,

              // paging and pager
              paging: {
                enabled: true,
                pageSize: 5,
              },
              pager: {
                visible: true,
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

              // filtering
              filterPanel: {
                visible: true,
              },
              filterRow: {
                visible: true,
              },
              headerFilter: {
                visible: true,
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

              // toolbar for appearance
              onToolbarPreparing: (e) => {
                // console.log(e);
                var toolbarItems = e.toolbarOptions.items;
                toolbarItems.push(
                  {
                    widget: "dxCheckBox",
                    options: {
                      text: "RowLines",
                      onValueChanged: (e) => {
                        // console.log(e);
                        $("#feed")
                          .dxDataGrid("instance")
                          .option("showRowLines", e.value);
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
                        $("#feed")
                          .dxDataGrid("instance")
                          .option("showColumnLines", e.value);
                      },
                    },
                    location: "after", // 'after' | 'before' | 'center'
                  },
                  {
                    widget: "dxCheckBox",
                    options: {
                      text: "RowAlternation",
                      onValueChanged: (e) => {
                        // console.log(e);
                        $("#feed")
                          .dxDataGrid("instance")
                          .option("rowAlternationEnabled", e.value);
                      },
                    },
                    location: "after", // 'after' | 'before' | 'center'
                  }
                );
              },
            });
          },
        },
        {
          title: "Users",
          visible: window.user.role === "admin",
          template: () => {
            return $(`<div id="users">`).dxDataGrid({
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

              showRowLines: true,
              showBorders: true,
              columnAutoWidth: true,

              // form editing
              editing: {
                mode: "popup",
                allowUpdating: true,
                allowAdding: true,
                allowDeleting: true,
                useIcons: true,
                selectTextOnEditStart: true,
              },

              // paging and pager only for posts page
              paging: {
                enabled: true,
                pageSize: 5,
              },
              pager: {
                visible: true,
                showPageSizeSelector: true,
                allowedPageSizes: [5, 10, 15, "all"],
                showNavigationButtons: true,
                displayMode: "compact",
              },

              // grouping
              grouping: {
                expandMode: "rowClick", //  'buttonClick' | 'rowClick'
              },
              groupPanel: {
                visible: true, // to enable group panel
                allowColumnDragging: true, // enable/disable dragging
              },

              // mutliple  sorting
              sorting: {
                mode: "multiple", //  "single" (default) | "multiple" | "none"
              },

              // mutliple selection
              selection: {
                mode: "multiple",
                showCheckBoxesMode: "always",
                allowSelectAll: true, // can/can't select all
                selectAllMode: "page", // page | allPages (default)
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
                const worksheet = workbook.addWorksheet("Users");

                DevExpress.excelExporter
                  .exportDataGrid({
                    component: e.component,
                    worksheet,
                    autoFilterEnabled: true, // to get header filter in excel
                  })
                  .then(() => {
                    workbook.xlsx.writeBuffer().then((buffer) => {
                      saveAs(
                        new Blob([buffer], {
                          type: "application/octet-stream",
                        }),
                        "Users.xlsx"
                      );
                    });
                  });
              },
            });
          },
        },
      ],
    })
    .dxTabPanel("instance");
});
