import express from "express"
import userController from "../controller/user"
const route = express()

route.post("/register", userController.register)

export default route