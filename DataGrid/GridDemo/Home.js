import { decryptData } from "./Helpers/Encryption.js";
import { PostReq, GetReq, PutReq, DeleteReq } from "./Helpers/ApiServices.js";
import { Toast, Redirect } from "./Helpers/Utils.js";

$(document).ready(async () => {
  // checking token in sessionStorage
  var encryptedToken = sessionStorage.getItem("userToken");
  if (encryptedToken) {
    // decrypting token
    var userToken = decryptData(encryptedToken);
  }

  // fetching user data using token
  if (userToken != null) {
    var headers = {
      Authorization: `Bearer ${userToken}`, // Pass token via Authorization header
    };
    await GetReq("https://dummyjson.com/auth/me", {}, headers)
      .then((res) => {
        window.user = res;
      })
      .fail(() => {
        Redirect("./Login.html");
      });
  } else {
    Redirect("./Login.html");
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
      Redirect("./Login.html");
    },
  });

  const tabPanel = $("#tabpanel")
    .dxTabPanel({
      width: "100%",
      swipeEnabled: true,
      loop: true,

      items: [
        {
          title: "Profile",
          template: () => {
            return $(`<div id="userProfile">`).dxDataGrid({
              dataSource: new DevExpress.data.CustomStore({
                key: "id",
                loadMode: "raw",
                load: () => {
                  return GetReq(
                    `https://dummyjson.com/users/${window.user.id}`
                  ).then((res) => {
                    return [res];
                  });
                },
                update: (key, values) => {
                  return PutReq(
                    `https://dummyjson.com/users/${key}`,
                    values
                  ).then(() => {
                    Toast("User updated", "success");
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
                  return GetReq(
                    `https://dummyjson.com/users/${window.user.id}/posts`
                  ).then((res) => {
                    return res.posts;
                  });
                },

                update: (key, values) => {
                  return PutReq(
                    `https://dummyjson.com/posts/${key}`,
                    values
                  ).then(() => {
                    Toast(`${Object.keys(values)[0]} updated`, "success");
                  });
                },

                remove: (key) => {
                  return DeleteReq(`https://dummyjson.com/posts/${key}`).then(
                    () => {
                      Toast("Post Deleted", "success");
                    }
                  );
                },
              }),

              columns: [
                {
                  dataField: "id",
                  dataType: "number",
                  caption: "ID",
                  allowEditing: false,
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
                  // cell template to show mulitple tags in Comma-Separate
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
                  var dataSource = options.component.getDataSource();
                  $("<div>")
                    .dxTextArea({
                      value: data.body,
                      readOnly: true,
                      height: 90,
                      onValueChanged: (e) => {
                        data.body = e.value;
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
                  return GetReq(`https://dummyjson.com/posts?limit=251`).then(
                    (res) => {
                      return res.posts;
                    }
                  );
                },
                update: (key, values) => {
                  return PutReq(
                    `https://dummyjson.com/posts/${key}`,
                    values
                  ).then(() => {
                    Toast("Post updated", "success");
                  });
                },
                remove: (key) => {
                  return DeleteReq(`https://dummyjson.com/posts/${key}`).then(
                    () => {
                      Toast("Post Deleted", "success");
                    }
                  );
                },
              }),

              columns: [
                {
                  dataField: "id",
                  dataType: "number",
                  caption: "ID",
                  allowEditing: false,
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
                  return GetReq(`https://dummyjson.com/users?limit=208`).then(
                    (res) => {
                      return res.users;
                    }
                  );
                },

                update: (key, values) => {
                  return PutReq(
                    `https://dummyjson.com/users/${key}`,
                    values
                  ).then(() => {
                    Toast("User Updated", "success");
                  });
                },

                insert: (values) => {
                  return PostReq(
                    `https://dummyjson.com/users/add`,
                    values
                  ).then(() => {
                    Toast("User added", "success");
                  });
                },

                remove: (key) => {
                  return DeleteReq(`https://dummyjson.com/users/${key}`).then(
                    () => {
                      Toast("User Deleted", "success");
                    }
                  );
                },
              }),
              columns: [
                {
                  dataField: "id",
                  dataType: "number",
                  caption: "ID",
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
