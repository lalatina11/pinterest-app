import express from "express"
import userController from "../controller/user"
const route = express()

route.post("/register", userController.register)
route.post("/login", userController.login)
route.post("/verify", userController.verifyOtp)
route.post("/logout", userController.logout)
route.get("/:username", userController.getLoggedInUser)

export default route