$(document).ready(function () {

    $("#textBox").dxTextBox({
        mask: '00/00/0000',
        maskChar: 'x',
        width: 200,
        showMaskMode: 'onFocus', // default : 'always'
        hint: "Enter date (MM/DD/YYYY)",
        maskInvalidMessage: 'Custom message :Invalid value',
        onValueChanged: (e) => {
            console.log(`Value Changed from [ ${e.previous} ] to [ ${e.value} ]`);
        },
        useMaskedValue: true, // if false , orignal value dosn't have '00/00/0000' this format
    });

    var textBox2Instance = $("#textBox2").dxTextBox({
        mode: 'password', // 'email' | 'password' | 'search' | 'tel' | 'text' | 'url'
        width: 200,
        value: 'secret',
        buttons: [{
            name: 'password',
            location: 'after',
            options: {
                icon: 'tips',
                stylingMode: 'text',
                onClick() {
                    textBox2Instance.option('mode', textBox2Instance.option('mode') === 'text' ? 'password' : 'text');
                },
            },
        }]
    }).dxTextBox('instance');

    $("#textBox3").dxTextBox({
        mask: 'H:Mm',
        maskRules:{
            H: char => char >= 5 && char <= 7,
            M: char => char >= 0 && char <= 5,
            m: char => char >= 0 && char <= 9
        },
        maskInvalidMessage: 'Enter time between 5 to 7',
        width: 200,
    });

});