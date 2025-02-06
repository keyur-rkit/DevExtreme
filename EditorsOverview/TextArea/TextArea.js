$(document).ready(function () {

    $("#textArea").dxTextArea({
        height: 100, // autoResize dont work with height
        stylingMode: 'filled',
        placeholder: 'filled Text Area',
    });

    $("#textArea2").dxTextArea({
        autoResizeEnabled: true, // default : false
        maxHeight: "200px",
        minHeight: "10px",
        maxLength: "100px",
        stylingMode: 'underlined',
        placeholder: 'underlined Text Area',
    });
});