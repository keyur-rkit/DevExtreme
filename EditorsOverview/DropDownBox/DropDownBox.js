$(document).ready(function () {

    $("#dropdownbox").dxDropDownBox({
        items: ["One Piece", "Naruto", "Jujutsu Kaisen", "Demon Slayer"],  // Static data array
        placeholder: 'Select a value...',
        height: "50px",
        width: "500px",
        hint: "Drop Down Box",
        showDropDownButton: false, // default : true
        acceptCustomValue: false, // default : false

        contentTemplate: (e) => {   
            const $list = $("<div>").dxList({
                dataSource: e.component.option("items"),
                selectionMode: "single", 
                onSelectionChanged: (selectionEvent) => {
                    console.log(selectionEvent);
                    var selectedValue = selectionEvent.addedItems;
                    e.component.option('value', selectedValue)
                    e.component.close(); 
                },
                showSelectionControls: true 
            });
            return $list;
        }
    });

    $("#multiValuebox").dxDropDownBox({
        items: ["Keyur", "Hit", "Drashti", "Meet","Vivek"],
        contentTemplate: function (e) {  
            const $list = $("<div>").dxList({
                dataSource: e.component.option("items"),
                selectionMode: "multiple",
                onSelectionChanged: (selectionEvent) => {
                    console.log(selectionEvent);
                    var selectedValues = selectionEvent.component.option('selectedItems'); // use for multiple
                    e.component.option('value', selectedValues.join(', ')); // use for multiple
                },
                showSelectionControls: true
            });
            return $list;
        },

        buttons: [
            {
                name: "clearButton",
                location: "after",
                options: {
                    text: "❌",
                    onClick: function () {
                        // Clear the selected items in the list when the clear button is clicked
                        const listInstance = $("#multiValuebox").dxDropDownBox("instance").content().find(".dx-list").dxList("instance");
                        listInstance.option("selectedItems",[]); // Unselect all items
                        // Optionally, clear the value of the dropdown box as well
                        $("#multiValuebox").dxDropDownBox("instance").option("value", null);
                    }
                }
            },
            "dropDown"
        ]
    });

});

