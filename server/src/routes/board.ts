import express from "express"
import boardController from "../controller/board"
const route = express()

route.post("/create", boardController.create)

export default route