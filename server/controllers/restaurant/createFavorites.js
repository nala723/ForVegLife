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
      userId = await models.user.findOne({where:{email:userId}})
      
      models.users_places_like.create({
        user_id: userId,
        place_id: placeId
      })
      res.send('즐겨찾기 하기')
    };
  }}
  catch (error) {
    res.status(500).send(error);
 }
}
  