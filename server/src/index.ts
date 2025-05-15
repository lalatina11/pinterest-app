import express from "express"

const PORT = process.env.PORT || 3030
const app = express()

app.listen(PORT, () => {
    console.log(`Server up and Running on http://localhost:${PORT}`);

})