const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

//posting the user
router.post("/add-user", userController.createUser);

//login user
router.post("/login", userController.loginUser);

//getting the user for forget password and login aslo
// router.get("/get-users", userController.getUser);

//getting all users excluding login user
router.get("/get-users/:email", userController.getUserExcludingLoginUser);

router.post("/reset", userController.resetPassword);

//passoword reset
router.put("/update-user", userController.updateUser);

//getting user by email for profile
router.get("/admin/:email", userController.getUserByEmail);

//updating user by email for profile update
router.put("/admin/:email", userController.updateUserByEmail);

//deleting the user by admin using email
router.delete("/admin/:email", userController.deleteUser);

module.exports = router;
