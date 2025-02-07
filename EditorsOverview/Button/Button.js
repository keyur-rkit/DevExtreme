$(document).ready(function () {

    $("#button1").dxButton({
        stylingMode: 'contained',
        text: 'Contained',
        type: 'normal',
        icon: 'preferences',
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
    });

})