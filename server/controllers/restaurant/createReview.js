const models = require("../../models");
const { isAuthorized } = require("../tokenFunctions");

module.exports = async (req, res) => {
  try {
    const { content, stars } = req.body;
    const placeId = req.params.placeId;
    console.log(stars);
    const authorization = req.headers["authorization"];
    if (!authorization) {
      res.status(401).json("invalid token");
    } else {
      const accessToken = authorization.split(" ")[1];
      const userData = isAuthorized(accessToken);
      const userId = userData.id;
      if (!userId) {
        res.status(401).json("invalid user");
      } else {
        const review = await models.review.create({
          review: content,
          stars: stars,
          place_id: placeId,
          user_id: userId,
        });
        res.send({ message: "left a review", reviewId: review.id });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
