import { PostReq, GetReq, PutReq, DeleteReq } from "../Helpers/ApiServices.js";
import { Toast } from "../Helpers/Utils.js";

// Configuration for the Users data grid
var UsersConfig = {
  dataSource: new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    load: () => {
      // Load user data from the API
      return GetReq(`https://dummyjson.com/users?limit=208`).then((res) => {
        return res.users;
      });
    },

    update: (key, values) => {
      // Update user data in the API
      return PutReq(`https://dummyjson.com/users/${key}`, values).then(() => {
        Toast("User Updated", "success");
      });
    },

    insert: (values) => {
      // Insert new user data into the API
      return PostReq(`https://dummyjson.com/users/add`, values).then(() => {
        Toast("User added", "success");
      });
    },

    remove: (key) => {
      // Remove user data from the API
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
      allowEditing: false, // Disable editing for the ID field
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
    displayMode: "compact", // Compact display mode for better Adaptability
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

  // Group summary
  summary: {
    groupItems: [
      {
        name: "countSummary",
        column: "id",
        summaryType: "count", // Count summary
      },
      {
        column: "age",
        summaryType: "min", // Minimum age summary
        displayFormat: "Min : {0} years",
        alignByColumn: true,
      },
    ],
  },

  export: {
    enabled: true,
    allowExportSelectedData: true, // Allow exporting selected data
  },
  // method to handle excel exporting
  onExporting(e) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    DevExpress.excelExporter
      .exportDataGrid({
        component: e.component,
        worksheet,
        autoFilterEnabled: true, // Enable header filter in Excel
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

/**
 * Retrieves the users configuration.
 *
 * @returns {Object} The users configuration object.
 */
function GetUsersConfig() {
  return UsersConfig;
}

export { GetUsersConfig };
