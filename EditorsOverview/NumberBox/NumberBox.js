$(document).ready(function () {

    var numberBoxInstance = $("#numberBox").dxNumberBox({
        format: "00.0",
        value: 15,
        //min: 10,
        //max: 20,
        showSpinButtons: true,
        useLargeSpinButtons: true, // only for desktop
        step: 0.5,
        showClearButton: true,
        width: 200,
        placeholder: '00.0',
        onInitialized: () => {
            console.log("numberBox Initialized");
        },
        onContentReady: () => {
            console.log("numberBox ContentReady");
        },
        onDisposing: () => {
            console.log("numberBox Disposing");
        },
        onFocusIn: () => {
            console.log("numberBox Focused In");
        },      
        onFocusOut: () => {
            console.log("numberBox Focused out");
        }
    }).dxNumberBox("instance");

    $('#button').dxButton({
        stylingMode: 'contained',
        text: 'Dispose NumberBox1',
        type: 'danger',
        width: 200,
        onClick() {
            numberBoxInstance.dispose();
        },
    });

    // Phone number box with custom validation
    $("#numberBox2").dxTextBox({
        mode: 'tel', // Effect keyboard of mobile device
        value: '',
        placeholder: '9876543210',
        width: 200,
        validationRules: [
            {
                type: "custom",
                validationCallback: function (e) {
                    const phoneRegex = /^[0-9]{10}$/;
                    if (!phoneRegex.test(e.value)) {
                        return false;
                    }
                    return true;
                },
                message: "Please enter a valid 10-digit phone number."
            }
        ],
        onInput: (e) => {
            console.log("Input event :", e.event.currentTarget.value);
        },
        onKeyDown: (e) => {
            console.log("KeyDown Event :",e.event.type, e.event.key);
        },
        onKeyUp: (e) => {
            console.log("KeyUp Event :",e.event.type, e.event.key);
        }
    });

});
