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
      console.log("[ errorHandler object : ");
      console.log(e);
      console.log("]");
    },

    onInserting: (values) => {
      console.log("[ onInserting object ");
      console.log(values);
      console.log("]");
    },

    onInserted: (values) => {
      console.log("[ onInserted object ");
      console.log(values);
      console.log("]");
    },

    onLoading: (obj) => {
      console.log("[ onLoading object ");
      console.log(obj);
      console.log("]");
    },

    onLoaded: (result) => {
      console.log("[ onLoaded object ");
      console.log(result);
      console.log("]");
    },

    onUpdating: (key, values) => {
      console.log("[ onUpdating object ");
      console.log(key);
      console.log(values);
      console.log("]");
    },

    onUpdated: (key, values) => {
      console.log("[ onUpdated object ");
      console.log(key);
      console.log(values);
      console.log("]");
    },

    onRemoving: (key) => {
      console.log("[ onRemoving object ");
      console.log(key);
      console.log("]");
    },

    onRemoved: (key) => {
      console.log("[ onRemoved object ");
      console.log(key);
      console.log("]");
    },

    // modify dont have any parameters
    // modify is called when the data is inserted, updated, or removed
    onModifying: () => {
      console.log("[ onModifying object ]");
    },

    onModified: () => {
      console.log("[ onModified object ]");
    },

    onPush: (changes) => {
      console.log("[ onPush object ");
      console.log(changes);
      console.log("]");
    },
  });

  $("#load").dxButton({
    text: "Load",
    onClick: () => {
      animeDataStore
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

  $("#insert").dxButton({
    text: "Insert",
    onClick: () => {
      animeDataStore
        .insert({
          id: 14,
          name: "Megumi Fushiguro",
          anime: "Jujutsu Kaisen",
          genre: "Action",
        })
        .done((dataObj, key) => {
          // console.log(dataObj);
          console.log(
            `[ Insert done , name : ${dataObj.name} , key : ${key} ]`
          );
        })
        .fail((error) => {
          console.log(`[ Insert fail : ${error} ]`);
        });
    },
  });

  $("#update").dxButton({
    text: "Update",
    onClick: () => {
      animeDataStore
        .update(10, {
          id: 10, // id can not be updated
          name: "Zenitsu Agatsuma",
          anime: "Demon Slayer",
          genre: "Action",
        })
        .done((dataObj, key) => {
          console.log(
            `[ Update done , name : ${dataObj.name} , key : ${key} ]`
          );
        })
        .fail((error) => {
          console.log(`[ Update fail : ${error} ]`);
        });
    },
  });

  $("#remove").dxButton({
    text: "Remove",
    onClick: () => {
      animeDataStore
        .remove(10)
        .done((key) => {
          console.log(`[ Remove done , key : ${key} ]`);
        })
        .fail((error) => {
          console.log(`[ Remove fail : ${error} ]`);
        });
    },
  });

  $("#push").dxButton({
    text: "Push",
    onClick: () => {
      animeDataStore.push([
        {
          type: "insert",
          data: {
            id: 15,
            name: "Tanjiro Kamado",
            anime: "Demon Slayer",
            genre: "Action",
          },
        },
        {
          type: "update",
          key: 9,
          data: {
            id: 9,
            name: "Yuji Itadori",
            anime: "Jujutsu Kaisen",
            genre: "Action",
          },
        },
        {
          type: "remove",
          key: 8,
        },
      ]);
    },
  });

  $("#clear").dxButton({
    text: "Clear",
    onClick: () => {
      animeDataStore.clear();
    },
  });

  $("#getByKey").dxButton({
    text: "Get By Key",
    onClick: () => {
      animeDataStore
        .byKey(8)
        .done((data) => {
          console.log(`[ byKey done : ${data.name} ]`);
        })
        .fail((error) => {
          console.log(`[ byKey fail : ${error} ]`);
        });
    },
  });

  $("#totalCount").dxButton({
    text: "Total Count",
    onClick: () => {
      animeDataStore.totalCount().done((count) => {
        console.log(`[ Total Count : ${count} ]`);
      });
    },
  });

  $("#other").dxButton({
    text: "Other",
    onClick: () => {
      console.log(`Key : ${animeDataStore.key()}`);
      console.log(`keyOf(obj) : ${animeDataStore.keyOf(animeData[0])}`);
    },
  });

  // console.log(animeDataStore);
});
