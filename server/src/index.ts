import express from "express"
import userRoutes from "./routes/user"
import pinRoutes from "./routes/pin"
import commentRoutes from "./routes/comment"
import boardRoute from "./routes/board"
import connectDB from "./config/db"
import cookieParser from "cookie-parser"

const PORT = process.env.PORT || 3030
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use("/api/users", userRoutes)
app.use("/api/pins", pinRoutes)
app.use("/api/comments", commentRoutes)
app.use("/api/boards", boardRoute)

app.listen(PORT, () => {
    connectDB()
    console.log(`Server up and Running on http://localhost:${PORT}`);
})