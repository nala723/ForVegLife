export const initialState = {
   // User
   user: {
       accessToken:"",
       email:"",
       nickName: "",
       vegType: "vegetarian",
       password: null,
       profileblob: ""
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
  }

};