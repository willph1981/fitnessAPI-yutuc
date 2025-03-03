const express = require("express");
const { registerUser, loginUser, getUserDetails } = require("../controllers/userController");
const { verifyToken } = require("../auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/details", verifyToken, getUserDetails); 

module.exports = router;
