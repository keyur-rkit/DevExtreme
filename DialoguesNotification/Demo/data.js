const animeData = new DevExpress.data.ArrayStore({
  data: [
    { id: "1", name: "Anime Series", parentId: null },
    {
      id: "1_1",
      name: "Naruto",
      desc: "A story about a young ninja who seeks recognition from his peers.",
      img: "https://sm.ign.com/t/ign_sr/gallery/b/best-anime/best-anime-series-on-netflix_7ssh.1080.jpg",
      parentId: "1",
    },
    {
      id: "1_2",
      name: "Attack on Titan",
      desc: "Humanity fights for survival against man-eating giants.",
      img: "https://sm.ign.com/t/ign_sr/gallery/b/best-anime/best-anime-series-on-netflix_7ssh.1080.jpg",
      parentId: "1",
    },

    { id: "2", name: "Anime Movies", parentId: null },
    {
      id: "2_1",
      name: "Your Name",
      desc: "A romantic fantasy film about two teenagers who swap bodies.",
      img: "https://staticg.sportskeeda.com/editor/2023/11/ca6d8-16995589166955-1920.jpg",
      parentId: "2",
    },
    {
      id: "2_2",
      name: "Spirited Away",
      desc: "A young girl enters a world of spirits and gods to save her parents.",
      img: "https://staticg.sportskeeda.com/editor/2023/11/ca6d8-16995589166955-1920.jpg",
      parentId: "2",
    },
    {
      id: "2_3",
      name: "My Neighbor Totoro",
      desc: "Two sisters encounter magical creatures in rural Japan.",
      img: "https://staticg.sportskeeda.com/editor/2023/11/ca6d8-16995589166955-1920.jpg",
      parentId: "2",
    },
    {
      id: "2_4",
      name: "Princess Mononoke (Not available)",
      desc: "A young prince gets involved in a struggle between humans and forest gods.",
      locked: true,
      parentId: "2",
    },
    {
      id: "2_5",
      name: "Akira",
      desc: "A cyberpunk film set in a dystopian future Tokyo.",
      img: "https://staticg.sportskeeda.com/editor/2023/11/ca6d8-16995589166955-1920.jpg",
      parentId: "2",
    },

    { id: "3", name: "Anime Manga", parentId: null },
    {
      id: "3_1",
      name: "One Piece",
      desc: "A story about a young pirate's quest for the ultimate treasure.",
      img: "https://m.media-amazon.com/images/I/81p4UmDRdtL._AC_UF1000,1000_QL80_.jpg",
      parentId: "3",
    },
    {
      id: "3_2",
      name: "Berserk",
      desc: "A dark fantasy tale of a lone warrior's struggle against evil.",
      img: "https://m.media-amazon.com/images/I/81p4UmDRdtL._AC_UF1000,1000_QL80_.jpg",
      parentId: "3",
    },
    {
      id: "3_3",
      name: "Vinland Saga",
      desc: "A historical epic about Vikings and their adventures.",
      img: "https://m.media-amazon.com/images/I/81p4UmDRdtL._AC_UF1000,1000_QL80_.jpg",
      parentId: "3",
    },

    { id: "4", name: "Anime Games", locked: true, parentId: null },

    { id: "5", name: "Anime Merchandise", parentId: null },
    {
      id: "5_1",
      name: "Naruto Action Figure",
      desc: "An action figure of the popular ninja Naruto.",
      img: "https://sm.ign.com/ign_ap/screenshot/default/untitled-design-1_kqrp.png",
      parentId: "5",
    },
    {
      id: "5_2",
      name: "Attack on Titan Hoodie",
      desc: "A hoodie featuring designs from the Attack on Titan series.",
      img: "https://sm.ign.com/ign_ap/screenshot/default/untitled-design-1_kqrp.png",
      parentId: "5",
    },
  ],
  key: "id",
  parentIdExpr: "parentId",
});

const parentItems = [
  { id: "1", name: "Anime Series" },
  { id: "2", name: "Anime Movies" },
  { id: "3", name: "Anime Manga" },
  { id: "4", name: "Anime Games" },
  { id: "5", name: "Anime Merchandise" },
];
