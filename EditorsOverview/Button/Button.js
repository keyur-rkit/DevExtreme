$(document).ready(function () {

    $("#textBox1").dxTextBox({
        width:200,
    }).dxValidator({
        validationGroup: "dummyGroup",
        validationRules: [{
            type: "required",
            message: "this is required field",
        }]
    });

    $("#textBox2").dxTextBox({
        width: 200,
    }).dxValidator({
        validationGroup: "dummyGroup",
        validationRules: [{
            type: "required",
            message: "this is also required field",
        }]
    });

    $("#button1").dxButton({
        stylingMode: 'contained',
        text: 'Validate',
        type: 'normal',
        icon: 'preferences',
        onClick: () => {
            DevExpress.validationEngine.validateGroup("dummyGroup");
        },
    });

    $("#button2").dxButton({
        stylingMode: 'text',
        text: 'Text',
        type: 'success',
        icon: 'palette',

    });

    $("#button3").dxButton({
        stylingMode: 'outlined',
        text: 'Outlined',
        type: 'default',
        icon: 'discord.svg',
    });

    $("#button4").dxButton({
        stylingMode: 'contained',
        text: 'Contained',
        type: 'danger',
        onClick: () => {
            DevExpress.ui.notify("error message", "error", 1000); // "info", "warning", "error", "success".
        },
    });

})