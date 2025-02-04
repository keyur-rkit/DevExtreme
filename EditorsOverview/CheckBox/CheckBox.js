$(document).ready(function () {
    $("#checkBox").dxCheckBox({
        value: undefined, // true, false(same as "null"), undefined
        disabled: false,
        elementAttr: {
            class: "dummy",
            name: "CheckBox", // name added to #checkBox
            // id: "dummy" // override original
        }, // Specifies attributes
        focusStateEnabled: true, // focused using keyboard navigation
        // height: "50px", // string , number , function
        // weight: "50px",
        accessKey: 'k', // shortcut key (Alt + char)
        hint: "Alt + k", // like tooltip
        name: "checkBox", // name added to one hidden input
        tabIndex: 2, // number of element when Tab key is used for navigating
        text: "Age>18?",
        visible: true,
        rtlEnabled: true, // right to left
    });

    $("#checkBox2").dxCheckBox({
        tabIndex: 1
    });

    $('#checkBox3').dxCheckBox();

    // Gets the UI component's instance.
    var checkBoxInstance = $('#checkBox').dxCheckBox("instance");
    var checkBox2Instance = $('#checkBox2').dxCheckBox("instance");
    var checkBox3Instance = $('#checkBox3').dxCheckBox("instance");

    // Get html/jQuery element
    var elementBox3 = checkBox3Instance.element();

    // valueChanged event, on method to subscribes event
    checkBox2Instance.on("valueChanged", function () {
        checkBoxInstance.focus(); // get focus
        checkBoxInstance.reset(); // reset value to default

        // Begin the update
        checkBox3Instance.beginUpdate();

        // Make multiple changes
        checkBox3Instance.option("value", true);
        checkBox3Instance.option("text", "Updated Text");
        checkBox3Instance.option("disabled", false);

        // End the update and render changes
        checkBox3Instance.endUpdate();
    });

    // to remove event
    // checkBox2Instance.off("valueChanged");

    // Gets value of a single property
    console.log("Getting text using option, text: " + checkBoxInstance.option("text"));

    // Registers a handler to be executed when a user presses a specific key.
    checkBox3Instance.registerKeyHandler("del", function () {
        checkBox3Instance.option("text", "changed text");
    });

    // Raised after a UI component property is changed.
    checkBox3Instance.on("optionChanged", function () {
        console.log("option changed");
    });

    // dispose() method
    // $("#checkBox2").dxCheckBox("dispose");
    // $("#CheckBox2").remove();

});