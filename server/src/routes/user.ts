import express from "express"
const route = express()

route.get("/register", (_, res) => {
    res.status(201).json({ message: "user created!" })
})

export default route