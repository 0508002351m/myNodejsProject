const userController = require("../controller/user.controller")
const { modelName } = require("../db/models/user.model")

const router = require("express").Router()
const auth = require("../middleware/auth")
router.post("/register", userController.addUser)
router.get("/login",userController.login)
router.get("/showAll",auth, userController.showAll)
router.get("/showAll/:id",auth, userController.showSingle)
router.delete('/showAll/:id',auth, userController.delUser)
router.patch('/showAll/:id',auth, userController.editUser)




module.exports = router 