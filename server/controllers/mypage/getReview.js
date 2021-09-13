const { review, place} = require('../../models');
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

        //const reviewList = await review.findAll({attributes : ['id', 'stars', 'review', 'createdAt'], where : { user_id : userId}});

        const reviewList = await review.findAll({
          attributes : ['id', 'stars', 'review', 'place_id', 'createdAt'],
          include : [{
            model : place,
            required: true,
            attributes : ['title']
          }],
          where : {
            user_id : userId
          }
        });

        for(let i=0; i<reviewList.length; i++){
            obj['title'] = reviewList[i].dataValues.place.dataValues.title;
            obj['content'] = reviewList[i].dataValues.review;
            obj['star'] = reviewList[i].dataValues.stars;
            obj['createdAt'] = reviewList[i].dataValues.createdAt;
            obj['reviewId'] = reviewList[i].dataValues.id;
            obj['placeId'] = reviewList[i].dataValues.place_id;
            sendArr.push(obj);
            obj = {};
        }

        res.status(200).json({review_star : sendArr});
      }
    } catch (error) {
      res.status(500).send(error);
    }
};
  