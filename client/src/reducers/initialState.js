export const initialState = {
   // User
   user: {
      accessToken:"",
       email:"",
       nickName: "",
       vegType: "vegetarian",
       password: null,
       profileblob: "",
       isLogin: false
   },
   
  // Review
  review : {
      placeId: null,
      title : "",
      content: "",
      star: null,
      createdAt: null,
      reviewId: null    
  },

  // Favorite
  favorite: {
    placeId: null,
    title: "",
    pictureUrl: "",
    address: ""
  },

  //map
  map: {
    x: 0,
    y: 0,
  }

};