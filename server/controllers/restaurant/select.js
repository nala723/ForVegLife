const models = require("../../models")

module.exports = async (req, res) => {
    // res.send('장소 하나 선택하기')

  try { {const placeId = req.params.placeId

    let data = []
    let review = []
    const placeData = await models.place.findOne({
      include: [
        {
          model:models.menuprice,
          required: true,
          attributes: ['menu', 'price']
        }
      ],
      where:{id:placeId},raw:true
    })


    const likeData = await models.users_places_like.findAll({
      include: [
        {
          model:models.user,
          require:true,
          attributes: ['vegType']
        }
      ],
      where:{place_id:placeId},raw:true
    })
    let like = {} , likeLen = likeData.length
    for(let i = 0; i< likeLen ; i++){
      if(likeData[i]['user.vegType'] in like ){
        like[likeData[i]['user.vegType']] = like[likeData[i]['user.vegType']]+1
      }
      else{
        like[likeData[i]['user.vegType']] = 1
      }
    }
    // like = {lacto : 3 , vegan : 4, vegetarian : 5}
    
    for(let key in like) {
      like[key] = like[key]/likeLen
    }
    const allReview = await models.review.findAll({
      include: [
        {
          model: models.user,
          required: true,
          attributes: ['nickname']
        }
      ],
      where:{place_id:placeId},raw:true
    })
    
    for(let i=0; i< allReview.length; i++){
      review.push({
        nickName: allReview[i].nickName,
        content: allReview[i].review,
        createdAt: allReview[i].createdAt,
        star: allReview[i].stars,
        reviewId: allReview[i].id,
      })
    }
  
    data.push({
      like: like,
      review: review,
      placeId: placeData.id,
      title: placeData.title,
      menu: placeData.menu,
      price: placeData.price,
    })
    

    res.status(200)
    .send(data)}}
    catch (error) {
      res.status(500).send(error);
   }
  };
  