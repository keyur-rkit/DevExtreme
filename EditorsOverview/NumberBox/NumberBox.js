$(document).ready(function () {

    $("#numberBox").dxNumberBox({
        format: "00.0",
        value: 15,
        min: 10,
        max: 20,
        showSpinButtons: true,
        showClearButton: true,
        width: 150,
    });

    $("#numberBox2").dxNumberBox({
        mode: 'tel', // effect keybord of mobile device 
        value: '',
        onValueChanged: function (e) {
            const phoneRegex = /^[0-9]{10}$/; // Only numeric values allowed 
            if (!phoneRegex.test(e.value)) {    
                alert('Please enter a valid phone number.');
                e.component.option('value', '');
            }
        },
    })

});