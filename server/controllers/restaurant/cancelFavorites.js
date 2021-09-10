const models = require("../../models")

module.exports = async (req, res) => {
    // res.send('즐겨찾기 해제')
    try {const authorization = req.headers['authorization'];
    const placeId = req.params.placeId

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

        models.users_places_like.destroy({
        where:{user_id:userId}},{where:{place_id:placeId}
        })
    res.send(`${req.params.placeId}이 id인 장소를 해제`)
}
    }}
    catch (error) {
        res.status(500).send(error);
     }
}
  