import { GetReq, PutReq, DeleteReq } from "../Helpers/ApiServices.js";
import { Toast } from "../Helpers/Utils.js";

var MyPostsConfig = {
  dataSource: new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    load: () => {
      return GetReq(`https://dummyjson.com/users/${window.user.id}/posts`).then(
        (res) => {
          return res.posts;
        }
      );
    },

    update: (key, values) => {
      return PutReq(`https://dummyjson.com/posts/${key}`, values).then(() => {
        Toast(`${Object.keys(values)[0]} updated`, "success");
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
};

function GetMyPostsConfig() {
  return MyPostsConfig;
}

export { GetMyPostsConfig };
