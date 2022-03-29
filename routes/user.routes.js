const userController = require("../controller/user.controller")
const { modelName } = require("../db/models/user.model")
const upload = require("../middleware/fileUpload")

const router = require("express").Router()
const auth = require("../middleware/auth")
const authadmin = require("../middleware/authdmin")
router.post("/profileImg",auth,upload.single("mohamed"), userController.profileImg)
router.post("/register", userController.addUser)
router.post("/login",userController.login)
router.get("/showAll",authadmin, userController.showAll)
router.get("/showAll/",authadmin, userController.showSingle)
router.delete('/showAll/',authadmin, userController.delUser)
router.patch('/showAll/:id',auth, userController.editUser)
router.post("/logout",auth, userController.logout)
router.post("/logoutAll",auth, userController.logoutAll)
router.post("/changePass",auth, userController.changePass)
router.post("/me",auth, userController.profile)


module.exports = router 