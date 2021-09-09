const router = require("express").Router();

const controllers = require("../controllers");

router.post("/registration", controllers.registration);
router.get("/category/:category", controllers.category);
router.get("/place-id/:placeId", controllers.select);
router.post("/favorites", controllers.createFavorites);
router.delete("/favorites/:placeId", controllers.cancelFavorites)
router.post("/review", controllers.createReview)

module.exports = router;
