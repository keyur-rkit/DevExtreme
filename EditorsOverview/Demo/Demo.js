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

    var profileImgInstance = $("#uploadProfileImg").dxFileUploader({
        selectButtonText: 'Upload Photo',
        uploadUrl: 'https://js.devexpress.com/Demos/NetCore/FileUploader/Upload',
        multiple: false,
        uploadMode: 'instantly',
        allowedFileExtensions: ['.jpg', '.jpeg', '.png'],
        invalidFileExtensionMessage: 'Not allowed Extensions',
        maxFileSize: 2000000, //2MB
        invalidMaxFileSizeMessage: `Too large [ Maxsize : 2 MB ]`,
        width: 300,
        labelText: 'or Drop Photo here',

        dropZone: "#profilePhoto",
        dialogTrigger: "#profilePhoto",


        // Event handler for when upload is completed
        onUploaded: (e) => {
            var { file } = e;
            var fileReader = new FileReader();

            fileReader.onload = function (event) {
                $("#profilePhoto").attr("src", event.target.result);
                $("#profilePhoto").attr("hidden", false);
            };
            fileReader.readAsDataURL(file);
            // console.log(`File Uploaded Successfully`);
            // console.log(e);
        },


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
            load: async () => {
                try {
                    const response = await fetch("https://mocki.io/v1/35e6c288-3772-4816-891d-1c36e03339fc");
                    return await response.json();
                } catch {
                    return [];
                }
            },
        }),
        valueExpr: 'name',
        displayExpr: 'name',

        acceptCustomValue: true,
        searchEnabled: true,
        showDataBeforeSearch: true,
        noDataText: "No state found",  // when no results are found
        searchExpr: 'name', // Search expression to filter items
        searchMode: 'startswith', // Search mode (contains or startswith)
        searchTimeout: 100, // Timeout for search (in milliseconds)

        // for districts into city selectBox
        onValueChanged: async function (e) {
            const selectedState = e.value;
            // Find the state object from our data
            const cityData = await $.getJSON("city.json");
            const cityForState = cityData.find(item => item.state === selectedState);

            if (cityForState) {
                // Update the city select box's data source with the corresponding districts
                $("#city").dxSelectBox("instance").option("dataSource", cityForState.districts);
                // reset the city select box's value
                $("#city").dxSelectBox("instance").option("value", null);
            }
        }

    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'State is required',
        }]
    });

    $("#city").dxSelectBox({
        hint: 'Select your city',
        stylingMode: commonStylingMode,
        placeholder: 'Morbi',

        dataSource: [],

        acceptCustomValue: true,
        searchEnabled: true,
        showDataBeforeSearch: true,
        noDataText: "No city found",  // when no results are found
        searchMode: 'startswith', // Search mode (contains or startswith)
        searchTimeout: 100, // Timeout for search (in milliseconds)
    }).dxValidator({
        validationRules: [{
            type: 'required',
            message: 'City is required',
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

        // Collect form data
        const formData = {
            fullName: $("#fullName").dxTextBox("instance").option("value"),
            profileImage: $("#uploadProfileImg").dxFileUploader("instance").option("value"),
            gender: $("#gender").dxRadioGroup("instance").option("value"),
            dateOfBirth: $("#dateOfBirth").dxDateBox("instance").option("value"),
            phoneNumber: $("#phoneNumber").dxTextBox("instance").option("value"),
            email: $("#email").dxTextBox("instance").option("value"),
            address: $("#address").dxTextArea("instance").option("value"),
            state: $("#state").dxSelectBox("instance").option("value"),
            city: $("#city").dxSelectBox("instance").option("value"),
            termsAccepted: $("#termsAndConditions").dxCheckBox("instance").option("value"),
        };

        // Store in local storage
        localStorage.setItem("fromData", JSON.stringify(formData));
        sessionStorage.setItem("fromData", JSON.stringify(formData));

        DevExpress.ui.notify({
            message: 'Registration successful',
            position: 'top center',
            width: 200,
        }, 'success', 2000);

        location.reload();
    });
});