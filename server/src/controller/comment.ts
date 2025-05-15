import asyncHandler from "../middlewares/asyncHandler";

const commentController = {
    create: asyncHandler(async (_, res) => {
        res.status(201).json({ message: "OK", error: false })
    })
}

export default commentController