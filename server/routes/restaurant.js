const router = require("express").Router();

const controllers = require("../controllers");

router.post("/", controllers.registration);
router.get("/recommendation", controllers.recommendation);
router.get("/category/:category/:address", controllers.category);
router.get("/:placeId", controllers.select);
router.post("/:placeId/like", controllers.createFavorites);
router.delete("/:placeId/dislike", controllers.cancelFavorites)
router.post("/:placeId/review", controllers.createReview)
router.delete("/:reviewId/review", controllers.deleteReview)
router.delete("/:placeId", controllers.deleteRestaurant)
router.patch("/:reviewId/review", controllers.updateReview)
router.patch("/:placeId", controllers.updateRestaurant)
module.exports = router;
