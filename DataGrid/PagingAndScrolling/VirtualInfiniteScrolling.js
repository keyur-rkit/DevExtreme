$(document).ready(() => {
  $("#gridContainer").dxDataGrid({
    dataSource: new DevExpress.data.CustomStore({
      key: "id",
      loadMode: "raw",
      load: () => {
        return $.ajax({
          //   url: "https://67adeabb9e85da2f020bb443.mockapi.io/anime",
          url: "https://dummyjson.com/users?limit=208",
          method: "GET",
        }).then((result) => {
          console.log(result.users);
          return result.users;
        });
      },
    }),
    showBorders: true,
    // columns: [
    //   {
    //     dataField: "id",
    //     dataType: "number",
    //     width: 50,
    //   },
    //   {
    //     dataField: "name",
    //     dataType: "string",
    //   },
    //   {
    //     dataField: "anime",
    //     dataType: "string",
    //   },
    //   {
    //     dataField: "genre",
    //     dataType: "string",
    //   },
    // ],
    columns: [
      {
        dataField: "id",
        dataType: "number",
        width: 50,
      },
      {
        dataField: "firstName",
        dataType: "string",
      },
      {
        dataField: "lastName",
        dataType: "string",
      },
      {
        dataField: "birthDate",
        dataType: "string",
      },
    ],
    scrolling: {
      mode: "virtual", // 'infinite' | 'standard' | 'virtual'
      useNative: false,
      showScrollbar: "onHover", // 'always' | 'never' | 'onHover' | 'onScroll'
      preloadEnabled: true, // pages are loaded in advance for smoother scrolling
      scrollByContent: true, // scroll content with a swipe gesture (useNative : false)
      scrollByThumb: true, // scroll content with the scrollbar (useNative : false)

      rowRenderingMode: "virtual",
      columnRenderingMode: "virtual",

      // standard: Renders all columns at once
      // virtual: Renders only those columns that get into the viewport.
      // Infinite: Each next page is loaded once the scrollbar reaches the end of its scale.
    },
  });
});
