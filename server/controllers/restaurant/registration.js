const models = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
    try {const { point, category, title, menu, price }  = req.body
    const [longitude, latitude] = point

    const authorization = req.headers['authorization'];

    if(!authorization){
      res.status(401).json('invalid token')
    }
    else{
      const accessToken = authorization.split(' ')[1];
      const userData = isAuthorized(accessToken);
      const userid = userData.id;
      if(!userid){
      res.status(401).json('invalid user')
      }
      else{
        const placeData = await models.place.create({
        title: title,
        longitude: longitude,
        latitude: latitude
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
  