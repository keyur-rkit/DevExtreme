$(document).ready(() => {
  var animeData = [
    {
      id: "1",
      name: "Naruto Uzumaki",
      anime: "Naruto",
      genre: "Action",
    },
    {
      id: "2",
      name: "Sasuke Uchiha",
      anime: "Naruto",
      genre: "Action",
    },
    {
      id: "3",
      name: "Monkey D. Luffy",
      anime: "One Piece",
      genre: "Adventure",
    },
    {
      id: "4",
      name: "Nami",
      anime: "One Piece",
      genre: "Adventure",
    },
    {
      id: "5",
      name: "Goku",
      anime: "Dragon Ball Z",
      genre: "Action",
    },
    {
      id: "6",
      name: "Vegeta",
      anime: "Dragon Ball Z",
      genre: "Action",
    },
    {
      id: "7",
      name: "Sailor Moon",
      anime: "Sailor Moon",
      genre: "Magical Girl",
    },
    {
      id: "8",
      name: "Usagi Tsukino",
      anime: "Sailor Moon",
      genre: "Magical Girl",
    },
    {
      id: "9",
      name: "Itadori Yuji",
      anime: "Jujutsu Kaisen",
      genre: "Action",
    },
    {
      id: "10",
      name: "Megumi Fushiguro",
      anime: "Jujutsu Kaisen",
      genre: "Action",
    },
    {
      id: "11",
      name: "Nobara Kugisaki",
      anime: "Jujutsu Kaisen",
      genre: "Action",
    },
    {
      id: "12",
      name: "Satoru Gojo",
      anime: "Jujutsu Kaisen",
      genre: "Action",
    },
    {
      id: "13",
      name: "Tanjiro Kamado",
      anime: "Demon Slayer",
      genre: "Action",
    },
    {
      id: "14",
      name: "Nezuko Kamado",
      anime: "Demon Slayer",
      genre: "Action",
    },
    {
      id: "15",
      name: "Zenitsu Agatsuma",
      anime: "Demon Slayer",
      genre: "Action",
    },
    {
      id: "16",
      name: "Inosuke Hashibira",
      anime: "Demon Slayer",
      genre: "Action",
    },
    {
      id: "17",
      name: "Ichigo Kurosaki",
      anime: "Bleach",
      genre: "Action",
    },
    {
      id: "18",
      name: "Rukia Kuchiki",
      anime: "Bleach",
      genre: "Action",
    },
    {
      id: "19",
      name: "Renji Abarai",
      anime: "Bleach",
      genre: "Action",
    },
    {
      id: "20",
      name: "Byakuya Kuchiki",
      anime: "Bleach",
      genre: "Action",
    },
    {
      id: "21",
      name: "Eren Yeager",
      anime: "Attack on Titan",
      genre: "Action",
    },
    {
      id: "22",
      name: "Mikasa Ackerman",
      anime: "Attack on Titan",
      genre: "Action",
    },
    {
      id: "23",
      name: "Levi Ackerman",
      anime: "Attack on Titan",
      genre: "Action",
    },
    {
      id: "24",
      name: "Armin Arlert",
      anime: "Attack on Titan",
      genre: "Action",
    },
    {
      id: "25",
      name: "Light Yagami",
      anime: "Death Note",
      genre: "Thriller",
    },
    {
      id: "26",
      name: "L Lawliet",
      anime: "Death Note",
      genre: "Thriller",
    },
    {
      id: "27",
      name: "Ryuk",
      anime: "Death Note",
      genre: "Thriller",
    },
    {
      id: "28",
      name: "Misa Amane",
      anime: "Death Note",
      genre: "Thriller",
    },
    {
      id: "29",
      name: "Edward Elric",
      anime: "Fullmetal Alchemist",
      genre: "Adventure",
    },
    {
      id: "30",
      name: "Alphonse Elric",
      anime: "Fullmetal Alchemist",
      genre: "Adventure",
    },
    {
      id: "31",
      name: "Roy Mustang",
      anime: "Fullmetal Alchemist",
      genre: "Adventure",
    },
    {
      id: "32",
      name: "Winry Rockbell",
      anime: "Fullmetal Alchemist",
      genre: "Adventure",
    },
    {
      id: "33",
      name: "Gon Freecss",
      anime: "Hunter x Hunter",
      genre: "Adventure",
    },
    {
      id: "34",
      name: "Killua Zoldyck",
      anime: "Hunter x Hunter",
      genre: "Adventure",
    },
    {
      id: "35",
      name: "Kurapika",
      anime: "Hunter x Hunter",
      genre: "Adventure",
    },
    {
      id: "36",
      name: "Leorio Paradinight",
      anime: "Hunter x Hunter",
      genre: "Adventure",
    },
    {
      id: "37",
      name: "Kenshin Himura",
      anime: "Rurouni Kenshin",
      genre: "Action",
    },
    {
      id: "38",
      name: "Kaoru Kamiya",
      anime: "Rurouni Kenshin",
      genre: "Action",
    },
    {
      id: "39",
      name: "Sanosuke Sagara",
      anime: "Rurouni Kenshin",
      genre: "Action",
    },
    {
      id: "40",
      name: "Aoshi Shinomori",
      anime: "Rurouni Kenshin",
      genre: "Action",
    },
  ];

  var animeDataSource = new DevExpress.data.DataSource({
    store: new DevExpress.data.ArrayStore({
      key: "id",
      data: animeData,
      onPush: (changes) => {
        console.log("[ Push Changes ");
        console.log(changes);
        console.log("]");
      },
    }),

    group: "anime", // with string

    // group: { selector: "anime", desc: true }, // with object

    map: (item) => {
      var newId = `#${item.id}`;
      var newName = `⚡ ${item.name}`;
      return {
        id: newId,
        name: newName,
        anime: item.anime,
        genre: item.genre,
      };
    },
    // filtering the data ( "=", "<>", ">", ">=", "<", "<=", "startswith", "endswith", "contains", "notcontains" )
    filter: ["id", ">", 10],

    paginate: true,
    pageSize: 10,

    requireTotalCount: false, // Require to get the total count of the data.

    // not working on static data
    reShapeOnPush: true, // Reshape the data after pushing.

    searchExpr: ["name", "anime", "genre"], // Search the data based on the given fields.
    searchOperation: "contains", // Search operation to be used.
    searchValue: "", //default search value.

    select: ["id", "name", "anime", "genre"], // Select the fields to be displayed.

    sort: [
      {
        selector: "name",
        desc: true,
      },
    ], // Sorting the data based on the given fields.

    onChanged: () => {
      console.log("Data Changed");
    },
    onLoadingChanged: (isLoading) => {
      if (isLoading) {
        console.log("AnimeData Loading...");
      } else {
        console.log("AnimeData Loaded");

        // to get the current page index
        console.log(`PageIndex: ${animeDataSource.pageIndex()}`);
        // to change or set the pageIndex
        // animeDataSource.pageIndex(3);

        // to get the current page data items
        console.log(animeDataSource.items());
      }
    },
    // postProcess: (data) => {
    //   console.log("[ Data to Post Process");
    //   console.log(data);
    //   console.log("]");
    //   return data;
    // },
  });

  // to get the current filter
  // console.log(`Filter: ${animeDataSource.filter()}`);
  // to change or set the filter
  // animeDataSource.filter(["id", "<", 10]);

  // to get the current group
  // console.log(`Group: ${animeDataSource.group()}`);
  // to change or set the group
  // animeDataSource.group("genre");

  // console.log(`isLastPage: ${animeDataSource.isLastPage()}`);
  // console.log(`isLoading: ${animeDataSource.isLoading()}`);
  // console.log(`isLoaded: ${animeDataSource.isLoaded()}`);

  // to get the current key
  // console.log(`Key: ${animeDataSource.key()}`);

  // console.log(`pageSize: ${animeDataSource.pageSize()}`);
  // to change or set the pageSize
  // animeDataSource.pageSize(5);

  // console.log(`paginate: ${animeDataSource.paginate()}`);
  // to change or set the paginate
  // animeDataSource.paginate(false);

  // Clears currently loaded DataSource items and calls the load() method.
  // animeDataSource.reload();

  // same for : requireTotalCount, searchExpr, searchOperation, searchValue, select, sort

  animeDataSource.load();
  console.log(`TotalCount: ${animeDataSource.totalCount()}`);

  $("#load").dxButton({
    text: "Load",
    onClick: () => {
      animeDataSource
        .load()
        .done((data, extra) => {
          console.log("[ Load Done ");
          console.log(data);
          console.log("]");
          console.log(extra);

          console.log(`Total Count : ${extra.totalCount}`);
        })
        .fail((error) => {
          console.log(`[ Load Fail : ${error} ]`);
        });
    },
  });

  $("#gridContainer").dxDataGrid({
    dataSource: animeDataSource,
    columns: [
      { dataField: "id", caption: "ID", width: 50 },
      { dataField: "name", caption: "Name" },
      { dataField: "anime", caption: "Anime" },
      { dataField: "genre", caption: "Genre" },
    ],
  });
});
