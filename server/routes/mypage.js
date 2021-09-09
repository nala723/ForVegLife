const router = require("express").Router();

const controllers = require("../controllers");

router.patch("/user-info", controllers.updateUserInfo);
router.get("/user-info", controllers.getUserInfo);
router.get("/favorites", controllers.getFavorites);
router.get("/review",     controllers.getReview);

module.exports = router;
