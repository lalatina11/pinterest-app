import asyncHandler from "../middlewares/asyncHandler";

const commentsController = {
    create: asyncHandler(async (_, res) => {
        res.status(201).json({ message: "OK", error: false })
    })
}

export default commentsController