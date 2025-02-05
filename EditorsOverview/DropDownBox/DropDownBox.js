$(document).ready(function () {

    var anime = ["One Piece","Naruto","Jujutsu Kaisen","Demon Slayer"];

    $("#dropdownbox").dxDropDownBox({
        value: anime[0],  // Default value
        dataSource: anime,
        //displayExpr: "name"  // data field whose values should be displayed
        //valueExpr: "id"  // provides unique values
        placeholder: 'Select a value...',
        showClearButton: true, 
        height: "50px",
        width: "500px",
        hint: "Drop Down Box",
        showDropDownButton: false, // default : true
        acceptCustomValue: true, // default : false

        contentTemplate: (e) => {
            const $list = $("<div>").dxList({
                dataSource: e.component.option("dataSource"),
                selectionMode: "single",
                onSelectionChanged: (arg) => {
                    console.log(arg);
                    e.component.option("value", arg.addedItems[0]);
                    e.component.close();
                } 
            });
            return $list;
        }
    });

    $("#multiValuebox").dxDropDownBox({

    });

});

