const models = require("../../models")
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
    // res.send('즐겨찾기 해제')
    try {const authorization = req.headers['authorization'];
    const placeId = req.params.placeId
    console.log(authorization)
    if(!authorization){
      res.status(401).json('invalid token')
    }
    else{
      const accessToken = authorization.split(' ')[1];
      if(isAuthorized(accessToken) === 'jwt expired'){
        res.set('accessToken', remakeToken(req));
      }
      const userData = isAuthorized(accessToken);
      const userId = userData.id;
      if(!userId){
          res.status(401).json('invalid user')
      }
      else{
        models.users_places_like.destroy({
        where:{user_id:userId,place_id:placeId}}
        )
    res.send({ message : `dislike ${req.params.placeId} restaurant` })
}
    }}
    catch (error) {
        res.status(500).send(error);
     }
}
  