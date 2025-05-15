import express from "express"
import userRoutes from "./routes/user.routes"

const PORT = process.env.PORT || 3030
const app = express()
app.use(express.json())

app.use("/api/users", userRoutes)

app.listen(PORT, () => {
    console.log(`Server up and Running on http://localhost:${PORT}`);

})