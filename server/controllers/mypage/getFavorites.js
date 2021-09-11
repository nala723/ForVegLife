const { place, users_places_like} = require('../../models');
const { isAuthorized, remakeToken } = require('../tokenFunctions')

module.exports = async (req, res) => {
  const authorization = req.headers['authorization'];
  let sendArr = [];
  let obj = {};

  try {
    if(!authorization){
      res.status(401).json({message : 'invalid token'})
    }else{
        const accessToken = authorization.split(' ')[1];

        if(isAuthorized(accessToken) === 'jwt expired'){
          res.set('accessToken', remakeToken(req)); //엑세스 토큰 만기시 다시 만들어서 헤더에 담아서 보내기
        }

        const userData = isAuthorized(accessToken);

        const userId = userData.id;

        const likeList = await users_places_like.findAll({
          include : [{
            model : place,
            required : true,
            attributes : ['id', 'title', 'picture_url']
          }],
          where : {
            user_id : userId
          }
        });

        for(let i=0; i<likeList.length; i++){
          obj['title'] = likeList[i].dataValues.place.dataValues.title;
          obj['place_id'] = likeList[i].dataValues.place.dataValues.id;
          obj['picture_url'] = likeList[i].dataValues.place.dataValues.picture_url;
          sendArr.push(obj);
          obj = {};
        }

        res.status(200).json({place : sendArr});
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
  