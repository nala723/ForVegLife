const models = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
   try {
    const { content, stars } = req.body
    const reviewId = req.params.reviewId
    const authorization = req.headers['authorization'];

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
      const review = await models.review.findOne({
        where:{id:reviewId}
      })
      if(review.user_id === userId){
        await models.review.update({
            review: content,
            stars: stars,
          },
          {
            where: {id:reviewId}
          })
            res.send({message : "review updated" ,reviewId:review.id})
      }
      else{
          res.send({message : "not yours"})
      }
      }
  };}
  catch (error) {
    res.status(500).send(error);
 }
}
  