const router = require("express").Router();

const controllers = require("../controllers");
const upload = require('../middleware/upload');

router.patch("/user-info", upload.single('profile'), controllers.updateUserInfo);
router.get("/user-info", controllers.getUserInfo);
router.get("/favorites", controllers.getFavorites);
router.get("/review",     controllers.getReview);

module.exports = router;
