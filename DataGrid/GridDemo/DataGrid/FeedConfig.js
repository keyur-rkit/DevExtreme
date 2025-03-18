import { GetReq, PutReq, DeleteReq } from "../Helpers/ApiServices.js";
import { Toast } from "../Helpers/Utils.js";

var editingByRoles = [
  {
    role: "admin",
    editing: {
      mode: "popup",
      allowDeleting: true,
      allowUpdating: true,
      useIcons: true,
    },
  },
  {
    role: "moderator",
    editing: {
      mode: "popup",
      allowDeleting: false,
      allowUpdating: true,
      useIcons: true,
    },
  },
  {
    role: "user",
    editing: {
      allowDeleting: false,
      allowUpdating: false,
    },
  },
];

var FeedConfig = {
  dataSource: new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    load: () => {
      return GetReq(`https://dummyjson.com/posts?limit=251`).then((res) => {
        return res.posts;
      });
    },
    update: (key, values) => {
      return PutReq(`https://dummyjson.com/posts/${key}`, values).then(() => {
        Toast("Post updated", "success");
      });
    },
    remove: (key) => {
      return DeleteReq(`https://dummyjson.com/posts/${key}`).then(() => {
        Toast("Post Deleted", "success");
      });
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

  editing: {},

  showRowLines: true,
  showBorders: true,
  columnAutoWidth: true,

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
    var toolbarItems = e.toolbarOptions.items;
    toolbarItems.push(
      {
        widget: "dxCheckBox",
        options: {
          text: "RowLines",
          onValueChanged: (res) => {
            e.component.option("showRowLines", res.value);
          },
        },
        location: "after",
      },
      {
        widget: "dxCheckBox",
        options: {
          text: "ColumnLines",
          onValueChanged: (res) => {
            e.component.option("showColumnLines", res.value);
          },
        },
        location: "after",
      },
      {
        widget: "dxCheckBox",
        options: {
          text: "RowAlternation",
          onValueChanged: (res) => {
            e.component.option("rowAlternationEnabled", res.value);
          },
        },
        location: "after",
      }
    );
  },
};

function GetFeedConfig() {
  var user = JSON.parse(sessionStorage.getItem("user"));
  var role = user ? user.role : "user";

  var roleData = editingByRoles.find((item) => item.role === role);
  var editing = roleData ? roleData.editing : {};
  FeedConfig.editing = editing;

  return FeedConfig;
}

export { GetFeedConfig };
