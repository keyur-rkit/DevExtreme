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
        { "id": 8, "name": "Usagi Tsukino", "anime": "Sailor Moon", "genre": "Magical Girl" }
    ];

    $("#selectBox").dxSelectBox({
        dataSource: animeData,
        displayExpr: 'name', // Field to display in the dropdown 
        valueExpr: 'id', // Field for the actual value
        showDataBeforeSearch: true,
        acceptCustomValue: true,
        minSearchLength: 2, // Minimum search length before search begins
        noDataText: "No characters found",  // No data text when no results are found
        searchEnabled: true,
        searchExpr: 'name', // Search expression to filter items
        searchMode: 'contains', // Search mode (contains or startswith)
        searchTimeout: 500, // Timeout for search (in milliseconds)
        //grouped: true, // Group the options based on the genre field
        //fieldTemplate (data)  {

        //},
        itemTemplate: (data) => {
            console.log(data);
            return `<div>${data.name}</div>`;
        },


    });

});
