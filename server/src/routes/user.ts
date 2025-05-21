import express from "express"
import userController from "../controller/user"
const route = express()

route.post("/register", userController.register)
route.post("/login", userController.login)
route.post("/verify", userController.verifyOtp)
route.post("/logout", userController.logout)
route.get("/get-user/:username", userController.getLoggedInUser)
route.get("/github", userController.loginGithub)
route.get("/github/callback", userController.githubCallback)
route.get("/google", userController.getLoggedInUser)
route.get("/google/callback", userController.getLoggedInUser)

export default route