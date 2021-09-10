const router = require("express").Router();

const controllers = require("../controllers");

router.post("/", controllers.registration);
router.get("/category/:category", controllers.category);
router.get("/:placeId", controllers.select);
router.post("/:placeId/like", controllers.createFavorites);
router.delete("/:placeId/dislike", controllers.cancelFavorites)
router.post("/:placeId/review", controllers.createReview)

module.exports = router;
