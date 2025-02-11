$(document).ready(function () {

    const commonStylingMode = 'filled'; // outlined underlined filled

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    $("#fullName").dxTextBox({
        hint: 'Enter your Full Name',
        stylingMode: commonStylingMode,
        placeholder: 'FisrtName MiddleName LastName',
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Name is required.',
        }, {
            type: 'pattern',
            pattern: /^[a-zA-Z\s]+$/,
            message: 'Only letters and space are allowed.',
        }]
    });

    var profileImgInstance = $("#profileImg").dxFileUploader({
        selectButtonText: 'Upload img',
        uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
        multiple: false, // alllow mutliple files
        uploadMode: 'instantly', 
        allowedFileExtensions: ['.jpg', '.jpeg','.png'], 
        invalidFileExtensionMessage: 'Not allowed Extensions',
        maxFileSize: 2000000, //2MB
        invalidMaxFileSizeMessage: `Too large [ Maxsize : 2 MB ]`,
    }).dxFileUploader('instance');

    $("#gender").dxRadioGroup({
        hint: 'Select your Gender',
        items: ["Male", "Female", "Other"],
        layout: 'horizontal',
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Gender is required',
        }],
    });

    $("#dateOfBirth").dxDateBox({
        displayFormat: 'dd/MM/yyyy',
        useMaskBehavior: true,
        hint: 'Enter your Birth Date',
        placeholder: 'dd/MM/yyyy',
        stylingMode: commonStylingMode,
        showClearButton: true,
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Date of birth is required',
        }, {
            type: 'range',
            max: maxDate,
            message: 'Age must be at least 18 years old',
        }],
    });

    $("#phoneNumber").dxTextBox({
        mode: 'tel',
        mask: '00000 00000',
        maskChar: 'X',
        maskInvalidMessage: 'Invalid Phone Number',
        hint: "Enter your Phone Number",
        stylingMode: commonStylingMode,
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Phone Number is required',
        }]
    });

    $("#email").dxTextBox({
        hint: 'Enter your Email',
        stylingMode: commonStylingMode,
        placeholder: 'example@mail.com',
    }).dxValidator({
        validationRules: [
            {
                type: 'required',
                message: 'Email is required',
            }, {
                type: 'email',
                message: 'Email is invalid',
            },
        ]
    });

    $("#address").dxTextArea({
        hint: 'Enter your Address',
        stylingMode: commonStylingMode,
        placeholder: 'Address Line',
    });

    $("#state").dxSelectBox({
        hint: 'Select your state',
        stylingMode: commonStylingMode,
        placeholder: 'Gujarat',

        dataSource: new DevExpress.data.CustomStore({
            loadMode: "raw", // Loads raw JSON data
            key: "code", // Unique key for identifying records
            load: () => $.getJSON("state.json"), // Fetches data from the specified JSON file
        }),
        valueExpr: 'code',
        displayExpr: 'name',

        acceptCustomValue: true,
        searchEnabled: true,
        showDataBeforeSearch: true,
        minSearchLength: 2, // Minimum search length before search begins
        noDataText: "No characters found",  // when no results are found
        searchExpr: 'name', // Search expression to filter items
        searchMode: 'startswith', // Search mode (contains or startswith)
        searchTimeout: 100, // Timeout for search (in milliseconds)
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'State is required',
        }]
    });

    $("#pincode").dxTextBox({
        hint: 'Enter your Pincode',
        stylingMode: commonStylingMode,
        mask: '000000',
        maskChar: 'X',
        maskInvalidMessage: 'Invalid Pin Code',
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Pincode is required',
        }]
    });

    $("#termsAndConditions").dxCheckBox({
        value: false,
        text: 'Agree to Terms and Conditions',
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'Must agree to Terms and Conditions',
        }],
    });



    $("#register").dxButton({
        hint: 'Submit the form',
        text: 'Register',
        type: 'default',
        useSubmitBehavior: true,
    });

    $('#form').on('submit', (e) => {
        e.preventDefault();

        DevExpress.ui.notify({
            message: 'Registration successful',
            position: 'top center',
            width: 200,
        }, 'success', 2000);
    });
});