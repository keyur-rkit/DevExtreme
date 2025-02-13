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

  var animeLocalStore = new DevExpress.data.LocalStore({
    key: ["id", "name"],
    name: "animeData",
    immediate: false,
    flushInterval: 3000,
    data: animeData,

    onload: () => {
      console.log("LocalStore loaded");
    },
  });

  $("#insert").dxButton({
    text: "Insert",
    onClick: function () {
      animeLocalStore.insert({
        id: 11,
        name: "Yami Sukehiro",
        anime: "Black Clover",
        genre: "Action",
      });
    },
  });

  $("#load").dxButton({
    text: "Load",
    onClick: function () {
      animeLocalStore
        .load()
        .done((data) => {
          console.log("[ Load Done ");
          console.log(data);
          console.log("]");
        })
        .fail((error) => {
          console.log(`[ Load Fail : ${error} ]`);
        });
    },
  });
});
