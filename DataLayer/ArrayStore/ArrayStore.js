$(document).ready(function () {
  var animeData = [
    {
      id: 1,
      name: "Naruto Uzumaki",
      anime: "Naruto",
      genre: "Action",
    },
    {
      id: 2,
      name: "Sasuke Uchiha",
      anime: "Naruto",
      genre: "Action",
    },
    {
      id: 3,
      name: "Monkey D. Luffy",
      anime: "One Piece",
      genre: "Adventure",
    },
    {
      id: 4,
      name: "Nami",
      anime: "One Piece",
      genre: "Adventure",
    },
    {
      id: 5,
      name: "Goku",
      anime: "Dragon Ball Z",
      genre: "Action",
    },
    {
      id: 6,
      name: "Vegeta",
      anime: "Dragon Ball Z",
      genre: "Action",
    },
    {
      id: 7,
      name: "Sailor Moon",
      anime: "Sailor Moon",
      genre: "Magical Girl",
    },
    {
      id: 8,
      name: "Usagi Tsukino",
      anime: "Sailor Moon",
      genre: "Magical Girl",
    },
    {
      id: 9,
      name: "Itadori Yuji",
      anime: "Jujutsu Kaisen",
      genre: "Action",
    },
    {
      id: 10,
      name: "Megumi Fushiguro",
      anime: "Jujutsu Kaisen",
      genre: "Action",
    },
  ];

  var animeDataStore = new DevExpress.data.ArrayStore({
    key: "id",
    data: animeData,

    errorHandler: (e) => {
      console.log("[ errorHandler object ]");
      console.log(e);
    },

    onInserting: function (values) {
      console.log("[ onInserting object ]");
      console.log(values);
    },

    onLoaded: function (result) {
      console.log("[ onLoaded object ]");
      console.log(result);
    },
  });

  animeDataStore
    .load(options)
    .done(function (data) {
      console.log("[  object ]");
      console.log(result);
    })
    .fail(function (error) {
      // Handle the "error" here
    });

  animeDataStore
    .insert({
      id: 14,
      name: "Megumi Fushiguro",
      anime: "Jujutsu Kaisen",
      genre: "Action",
    })
    .done(function (dataObj, key) {
      // console.log(dataObj);
      console.log(`[ Insert done ]: name : ${dataObj.name} , key : ${key}`);
    })
    .fail(function (error) {
      console.log(`[ Insert fail ]: ${error}`);
    });

  // console.log(animeDataStore);
});
