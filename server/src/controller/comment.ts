import asyncHandler from "../middlewares/asyncHandler";
import Comment from "../models/comment";

const commentController = {
    create: asyncHandler(async (_, res) => {
        res.status(201).json({ message: "OK", error: false })
    }),
    getAllCommentsByPinId: asyncHandler(async (req, res) => {
        const pinId = req.query.pinId
        const Allcomments = await Comment.find({ pin: pinId }).sort({ createdAt: -1 }).populate("user", "username name avatar")
        if (!Allcomments || Allcomments.length < 0) {
            throw new Error("No comment available")
        }
        res.status(200).json({ message: "OK", data: Allcomments, error: false })
    })
}

export default commentController