const models = require("../../models");
const { isAuthorized } = require("../tokenFunctions");
module.exports = async (req, res) => {
  // res.send('장소 하나 선택하기')

  try {
    {
      const placeId = req.params.placeId;
      const authorization = req.headers["authorization"];
      let data = [];
      let review = [];
      const accessToken = authorization.split(" ")[1];
      if(isAuthorized(accessToken) === 'jwt expired'){
        res.set('accessToken', remakeToken(req));
      }
      const userData = isAuthorized(accessToken);
      const userId = userData.id;
      let favirote;
      if (userId) {
        favirote = await models.users_places_like.findOne({
          where: { user_id: userId, place_id: placeId },
        });
      } else {
        favirote = undefined;
      }

      const placeData = await models.place.findOne({
        where: { id: placeId },
      });
      const menuprices = await models.menuprice.findAll({
        where: { place_id: placeId },
      });
      console.log(placeData);
      const likeData = await models.users_places_like.findAll({
        include: {
          model: models.user,
          require: true,
          attributes: ["vegType"],
        },

        where: { place_id: placeId },
        raw: true,
      });
      let like = {},
        likeLen = likeData.length;
      for (let i = 0; i < likeLen; i++) {
        if (likeData[i]["user.vegType"] in like) {
          like[likeData[i]["user.vegType"]] =
            like[likeData[i]["user.vegType"]] + 1;
        } else {
          like[likeData[i]["user.vegType"]] = 1;
        }
      }
      // like = {lacto : 3 , vegan : 4, vegetarian : 5}

      for (let key in like) {
        like[key] = like[key] / likeLen;
      }
      const allReview = await models.review.findAll({
        include: [
          {
            model: models.user,
            required: true,
            attributes: ["nickname"],
          },
        ],
        where: { place_id: placeId },
        raw: true,
      });

      for (let i = 0; i < allReview.length; i++) {
        review.push({
          nickName: allReview[i].nickName,
          content: allReview[i].review,
          createdAt: allReview[i].createdAt,
          star: allReview[i].stars,
          reviewId: allReview[i].id,
        });
      }

      data.push({
        like: like,
        review: review,
        placeId: placeData.id,
        title: placeData.title,
        menu: menuprices.map((x) => x.menu),
        price: menuprices.map((x) => x.price),
        favirote: favirote,
      });

      res.status(200).send(data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
