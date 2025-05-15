import express from "express"
import pinController from "../controller/pin"
const route = express()

route.post("/create", pinController.create)

export default route