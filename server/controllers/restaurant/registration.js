const models = require("../../models");
const { crawling } = require("../crawlingFunction/crawling");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
    try {const { point, category, title, menu, price, placeUrl, address }  = req.body
    const [longitude, latitude] = point
    const authorization = req.headers['authorization'];

    if(!authorization){
      res.status(401).json('invalid token')
    }
    else{
      const accessToken = authorization.split(' ')[1];
      console.log(accessToken)
      const userData = isAuthorized(accessToken);
      console.log(userData)
      const userid = userData.id;
      if(!userid){
      res.status(401).json('invalid user')
      }
      else{
        console.log(1)
        const placeData = await models.place.create({
        title: title,
        longitude: longitude,
        latitude: latitude,
        address: address
      })
        for(let i=0; i<category.length; i++){
          models.vegCategory.create({
            place_id:placeData.id,
            category:category[i]
          })
        }
        for(let i=0; i<menu.length; i++){
          models.menuprice.create({
            menu: menu[i],
            price: price[i],
            place_id:placeData.id
          })
        }
        crawling(placeUrl,placeData)
        res.send({
          placeId:placeData.id,
          message:"successfully registered"
          })
        }
      }
    }
    catch (error) {
      res.status(500).send(error);
   }
  };
  