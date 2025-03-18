import { PostReq, GetReq, PutReq, DeleteReq } from "../Helpers/ApiServices.js";
import { Toast } from "../Helpers/Utils.js";

var UsersConfig = {
  dataSource: new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    load: () => {
      return GetReq(`https://dummyjson.com/users?limit=208`).then((res) => {
        return res.users;
      });
    },

    update: (key, values) => {
      return PutReq(`https://dummyjson.com/users/${key}`, values).then(() => {
        Toast("User Updated", "success");
      });
    },

    insert: (values) => {
      return PostReq(`https://dummyjson.com/users/add`, values).then(() => {
        Toast("User added", "success");
      });
    },

    remove: (key) => {
      return DeleteReq(`https://dummyjson.com/users/${key}`).then(() => {
        Toast("User Deleted", "success");
      });
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

  editing: {
    mode: "popup",
    allowUpdating: true,
    allowAdding: true,
    allowDeleting: true,
    useIcons: true,
    selectTextOnEditStart: true,
  },

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

  grouping: {
    expandMode: "rowClick",
  },
  groupPanel: {
    visible: true,
    allowColumnDragging: true,
  },

  sorting: {
    mode: "multiple",
  },

  selection: {
    mode: "multiple",
    showCheckBoxesMode: "always",
    allowSelectAll: true,
    selectAllMode: "page",
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
};

function GetUsersConfig() {
  return UsersConfig;
}

export { GetUsersConfig };
