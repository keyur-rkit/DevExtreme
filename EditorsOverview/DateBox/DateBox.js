$(document).ready(function () {
    const now = new Date();

    $('#dateBox').dxDateBox({
        type: 'date', // date time datetime
        acceptCustomValue: false,
        accessKey: 't',
        applyValueMode: 'useButtons', // default: instantly
        max: new Date(),
        min: new Date(1900, 0, 1),
        dateOutOfRangeMessage: 'date is out of range',
        disabled: true, 
        disabledDates: [
            new Date('02/02/2025') // mm/dd/yyyy
        ],
        disabledDates: function (args) {
            const dayOfWeek = args.date.getDay();
            const isWeekend = args.view === 'month' && (dayOfWeek === 0 || dayOfWeek === 6);
            return isWeekend;
        },
        elementAttr: {
            name: 'dateBox'
        },
        height: '50px',
        width: '500px',
        hint: 'Date Box',
        inputAttr: {
            id: "inputId"
        },
        openOnFieldClick: true,
        placeholder: '7/15/2004',
        rtlEnabled: true,
        showClearButton: true,
        stylingMode: 'filled',  // outlined underlined filled
        useMaskBehavior: true // can only type in format
    });

    $('#timeBox').dxDateBox({
        type: 'time',
        interval: 10, // default 30
        pickerType: 'rollers', // native calendar rollers list
        value: now,
    });

    $('#datetimeBox').dxDateBox({
        type: 'datetime',
        applyButtonText: '👍',
        cancelButtonText: '❌',
        displayFormat: 'EEEE, d of MMM, yyyy HH:mm',
        invalidDateMessage: 'Date or time is invalid',
        maxLength: 6,
        opened: true,
    });

    $('#dateBox2').dxDateBox({
        onkeydown: (e) => {
            console.log(`${e.event.key}`)
        }
    });

    // instance method
    var dateBoxInstance = $("#dateBox").dxDateBox("instance");
    var timeBoxInstance = $("#timeBox").dxDateBox("instance");
    var datetimeBoxInstance = $("#datetimeBox").dxDateBox("instance");

    dateBoxInstance.focus(); // focus method
    setTimeout(function () {
        datetimeBoxInstance.close(); // close method
        dateBoxInstance.blur(); // bulr method

        dateBoxInstance.beginUpdate(); // beginUpdate method
        dateBoxInstance.option("value", new Date()); // options method to set value
        dateBoxInstance.option("disabled", false);
        dateBoxInstance.endUpdate(); // endUpdate method
    }, 1500)

    const clearButton = dateBoxInstance.getButton("clear");
    console.log(clearButton);

    dateBoxInstance.on("valueChanged", function (e) {
        console.log("New value:", e.value);
    });

    //// Subscribe to multiple events
    //dateBoxInstance.on({
    //    opened: () => { console.log("DateBox opened") },
    //    closed: () => { console.log("DateBox closed") }
    //});

    datetimeBoxInstance.on("keyDown", function (e) {
            console.log(`${e.event.key} Enter key pressed`);
    });

    //dateBoxInstance.off("keyDown");

    // dateBoxInstance.dispose();
    // $("#dateBox").remove();
});