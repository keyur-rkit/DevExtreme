import { GetReq, PutReq } from "../Helpers/ApiServices.js";
import { Toast } from "../Helpers/Utils.js";

var ProfileConfig = {
  dataSource: new DevExpress.data.CustomStore({
    key: "id",
    loadMode: "raw",
    load: () => {
      return GetReq(`https://dummyjson.com/users/${window.user.id}`).then(
        (res) => {
          return [res];
        }
      );
    },
    update: (key, values) => {
      return PutReq(`https://dummyjson.com/users/${key}`, values).then(() => {
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
};

function GetProfileConfig() {
  return ProfileConfig;
}

export { GetProfileConfig };
