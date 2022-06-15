const { enrole, getEnroles, updateEnrole } = require("../controller/enrole");
const jwtVerify = require("../middleware/jwtVerify");
const checkAdmin = require("../middleware/checkAdmin");

const router = require("express").Router();

router.post("/", jwtVerify, checkAdmin, enrole);
router.get("/", jwtVerify, checkAdmin, getEnroles);
router.put("/:id", jwtVerify, checkAdmin, updateEnrole);

module.exports = router;
