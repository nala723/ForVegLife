const router = require("express").Router();

const controllers = require("../controllers");

router.post("/signin", controllers.googleSignin);
router.get("/signout", controllers.googleSignout);
router.delete("/withdrawal", controllers.googleWithdrawal);

module.exports = router;
