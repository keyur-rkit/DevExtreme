$(document).ready(function () {

    // Anime-related JSON data
    const animeData = [
        { "id": 1, "name": "Naruto Uzumaki", "anime": "Naruto", "genre": "Action" },
        { "id": 2, "name": "Sasuke Uchiha", "anime": "Naruto", "genre": "Action" },
        { "id": 3, "name": "Monkey D. Luffy", "anime": "One Piece", "genre": "Adventure" },
        { "id": 4, "name": "Nami", "anime": "One Piece", "genre": "Adventure" },
        { "id": 5, "name": "Goku", "anime": "Dragon Ball Z", "genre": "Action" },
        { "id": 6, "name": "Vegeta", "anime": "Dragon Ball Z", "genre": "Action" },
        { "id": 7, "name": "Sailor Moon", "anime": "Sailor Moon", "genre": "Magical Girl" },
        { "id": 8, "name": "Usagi Tsukino", "anime": "Sailor Moon", "genre": "Magical Girl" },
        { "id": 9, "name": "Itadori Yuji", "anime": "Jujutsu Kaisen", "genre": "Action" },
        { "id": 10, "name": "Megumi Fushiguro", "anime": "Jujutsu Kaisen", "genre": "Action" },
        { "id": 11, "name": "Nobara Kugisaki", "anime": "Jujutsu Kaisen", "genre": "Action" },
        { "id": 12, "name": "Satoru Gojo", "anime": "Jujutsu Kaisen", "genre": "Action" },
        { "id": 13, "name": "Tanjiro Kamado", "anime": "Demon Slayer", "genre": "Action" },
        { "id": 14, "name": "Nezuko Kamado", "anime": "Demon Slayer", "genre": "Action" },
        { "id": 15, "name": "Zenitsu Agatsuma", "anime": "Demon Slayer", "genre": "Action" },
        { "id": 16, "name": "Inosuke Hashibira", "anime": "Demon Slayer", "genre": "Action" },
        { "id": 17, "name": "Ichigo Kurosaki", "anime": "Bleach", "genre": "Action" },
        { "id": 18, "name": "Rukia Kuchiki", "anime": "Bleach", "genre": "Action" },
        { "id": 19, "name": "Renji Abarai", "anime": "Bleach", "genre": "Action" },
        { "id": 20, "name": "Byakuya Kuchiki", "anime": "Bleach", "genre": "Action" },
        { "id": 21, "name": "Eren Yeager", "anime": "Attack on Titan", "genre": "Action" },
        { "id": 22, "name": "Mikasa Ackerman", "anime": "Attack on Titan", "genre": "Action" },
        { "id": 23, "name": "Levi Ackerman", "anime": "Attack on Titan", "genre": "Action" },
        { "id": 24, "name": "Armin Arlert", "anime": "Attack on Titan", "genre": "Action" },
        { "id": 25, "name": "Light Yagami", "anime": "Death Note", "genre": "Thriller" },
        { "id": 26, "name": "L Lawliet", "anime": "Death Note", "genre": "Thriller" },
        { "id": 27, "name": "Ryuk", "anime": "Death Note", "genre": "Thriller" },
        { "id": 28, "name": "Misa Amane", "anime": "Death Note", "genre": "Thriller" },
        { "id": 29, "name": "Edward Elric", "anime": "Fullmetal Alchemist", "genre": "Adventure" },
        { "id": 30, "name": "Alphonse Elric", "anime": "Fullmetal Alchemist", "genre": "Adventure" },
        { "id": 31, "name": "Roy Mustang", "anime": "Fullmetal Alchemist", "genre": "Adventure" },
        { "id": 32, "name": "Winry Rockbell", "anime": "Fullmetal Alchemist", "genre": "Adventure" },
        { "id": 33, "name": "Gon Freecss", "anime": "Hunter x Hunter", "genre": "Adventure" },
        { "id": 34, "name": "Killua Zoldyck", "anime": "Hunter x Hunter", "genre": "Adventure" },
        { "id": 35, "name": "Kurapika", "anime": "Hunter x Hunter", "genre": "Adventure" },
        { "id": 36, "name": "Leorio Paradinight", "anime": "Hunter x Hunter", "genre": "Adventure" },
        { "id": 37, "name": "Kenshin Himura", "anime": "Rurouni Kenshin", "genre": "Action" },
        { "id": 38, "name": "Kaoru Kamiya", "anime": "Rurouni Kenshin", "genre": "Action" },
        { "id": 39, "name": "Sanosuke Sagara", "anime": "Rurouni Kenshin", "genre": "Action" },
        { "id": 40, "name": "Aoshi Shinomori", "anime": "Rurouni Kenshin", "genre": "Action" }
    ];

    var selectBoxInstance = $("#selectBox").dxSelectBox({
        dataSource: new DevExpress.data.DataSource({
            store: {
                type: 'array',
                data: animeData,
                key: 'id'
            },
            group: 'anime',
        }),
        displayExpr: 'name', // Field to display in the dropdown 
        valueExpr: 'id', // Field for the actual value
        grouped: true, // Group the options based on the genre field
        groupTemplate(data) {
            return $(`<div><span class='dx-icon-favorites icon'></span> ${data.key}</div>`);
        },
        fieldTemplate(selectedItem) {
            if (selectedItem) {
                console.log(selectedItem);
                return $("<div>").dxTextBox({
                    value: "Favorite anime: " + selectedItem.name,
                    readOnly: true,
                });
            }
            else {
                return $("<div>").dxTextBox({
                    value: "Select Favorite Anime...",
                });
            }
        },
        itemTemplate: (data) => {
            //console.log(data);
            return `<div>${data.name}</div>`;
        },


    }).dxSelectBox("instance");

    $("#checkBox").dxCheckBox({
        text: "Group by Genre", // Label for the checkbox
        value: false, // Default to 'Group by Anime'
        onValueChanged: function (e) {
            // Update the grouping
            const groupBy = e.value ? 'genre' : 'anime'; // Toggle between 'genre' and 'anime'
            selectBoxInstance.option("dataSource", new DevExpress.data.DataSource({
                store: {
                    type: 'array',
                    data: animeData,
                    key: 'id'
                },
                group: groupBy, // Update the grouping
            }));
            selectBoxInstance.repaint(); // for better performance
        }
    });

    var selectBox2Instance = $("#selectBox2").dxSelectBox({
        dataSource: new DevExpress.data.CustomStore({
            loadMode: "raw", // Loads raw JSON data
            key: "id", // Unique key for identifying records
            load: () => $.getJSON("animeData.json"), // Fetches data from the specified JSON file
        }),
        valueExpr: 'id',
        displayExpr: 'name',
        searchEnabled: true,
        showDataBeforeSearch: true,
        minSearchLength: 2, // Minimum search length before search begins
        noDataText: "No characters found",  // No data text when no results are found
        searchExpr: 'name', // Search expression to filter items
        searchMode: 'contains', // Search mode (contains or startswith)
        searchTimeout: 100, // Timeout for search (in milliseconds)
        itemTemplate: (data) => {
            //console.log(data);
            return `<div>${data.name} [ ${data.anime} ] [ ${data.genre} ]</div>`;
        },
        width: 500,
        wrapItemText: true, // wrap long text
    }).dxSelectBox('instance');

    // change search type using this select box
    $("#selectBox3").dxSelectBox({
        items: ["name","anime","genre"],
        width: 300,
        placeholder: "Select searchExpr for box2...",
        onValueChanged: (e) => {
            selectBox2Instance.option("searchExpr",e.value)
        }
    });

});
