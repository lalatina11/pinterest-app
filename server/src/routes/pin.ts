import express from "express"
import pinController from "../controller/pin"
const route = express()

route.post("/", pinController.create)
route.get("/", pinController.getAallPins)

export default route