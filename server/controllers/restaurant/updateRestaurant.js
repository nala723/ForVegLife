const models = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
    try {
    const { category, menu, price }  = req.body
    const placeId = req.params.placeId
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
        await models.vegCategory.destroy({
            where : {place_id: placeId}
        })
        await models.menuprice.destroy({
            where : {place_id: placeId}
        })
        for(let i=0; i<category.length; i++){
          models.vegCategory.create({
            place_id:placeId,
            category:category[i]
          })
        }
        for(let i=0; i<menu.length; i++){
          models.menuprice.create({
            menu: menu[i],
            price: price[i],
            place_id:placeId
          })
        }
        res.send({
          placeId:placeId,
          message:"restaurant updated"
          })
        }
      }
    }
    catch (error) {
      res.status(500).send(error);
   }
  };
  