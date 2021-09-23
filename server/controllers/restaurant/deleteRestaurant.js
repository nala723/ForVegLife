const models = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
   try {
    const placeId = req.params.placeId
    const authorization = req.headers['authorization'];

    if(!authorization){
      res.status(401).json('invalid token')
    }
    else{
      const accessToken = authorization.split(' ')[1];
      const userData = isAuthorized(accessToken);
      const userId = userData.id;
      if(!userId){
      res.status(401).json('invalid user')
      }
      else{
      await models.place.destroy({
        where:{id:placeId}
      })
        res.send({message : "bye bye restaurant"})
      }
  };}
  catch (error) {
    res.status(500).send(error);
 }
}