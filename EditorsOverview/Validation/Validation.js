$(document).ready(function () {

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 18);

    $("#name").dxTextBox({

    }).dxValidator({
        validationRules: [
            {
                type: 'required',
                message: 'Name is required.',
            }, {
                type: 'pattern',
                pattern: /^[A-Za-z]+$/,
                message: 'Only letters are allowed.',
            }, {
                type: 'stringLength',
                min: 2,
                message: 'Name must have at least 2 letters',
            }
        ]
    });

    $("#email").dxTextBox({

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

    $("#dob").dxDateBox({
        displayFormat: 'dd/MM/yyyy',
        useMaskBehavior: true,
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

    $("#password").dxTextBox({
        mode: 'password',
    }).dxValidator({
        validationRules: [
            {
                type: 'required',
                message: 'Password is required',
            }, {
                type: 'stringLength',
                min: 6,
                message: 'Password must be 6 characters long',
            }
        ],
    });

    $("#confirmPassword").dxTextBox({
        mode: 'password',
    }).dxValidator({
        validationRules: [
            {
                type: 'required',
                message: 'Confirm Password is required',
            }, {
                type: 'compare',
                comparisonTarget: () => {
                    const passwordInstance = $('#password').dxTextBox('instance');
                    if (passwordInstance) {
                        return passwordInstance.option('value');
                    }
                    return null;
                },
                message: "Need same password as above.",
            },
        ],
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

    $("#signUp").dxButton({
        text: 'Sign Up',
        type: 'default',
        useSubmitBehavior: true,
    });

    $('#signUpForm').on('submit', (e) => {
        e.preventDefault();

        DevExpress.ui.notify({
            message: 'Signed up successful',
            position: 'top center',
            width: 200,
        }, 'success', 2000);
    });

});