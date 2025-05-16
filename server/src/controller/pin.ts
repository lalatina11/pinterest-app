import asyncHandler from "../middlewares/asyncHandler";
import Pin from "../models/pin";
import type { PinType } from "../types";

const pinController = {
    create: asyncHandler(async (req, res) => {
        const { media, width, height, title, description, link, board, tags, user } = req.body as PinType;
        const newPin = new Pin({
            media,
            width,
            height,
            title,
            description,
            link,
            board,
            tags,
            user,
        });

        const pin = await newPin.save()
        res.status(201).send({ message: "Pin created successfully", data: pin, error: false })
    }),
    getAallPins: asyncHandler(async (req, res) => {
        const pageNumber = Number(req.query.cursor) || 0
        const searchKeyword = req.query.q || ""
        const limit = 21
        const pins = await Pin.find(searchKeyword ? { $or: [{ title: { $regex: searchKeyword || "", $options: "i" } }, { tags: { $in: [searchKeyword] } }] } : {}).limit(limit).skip(pageNumber * limit)

        const hasNextPage = pins.length === limit
        // await new Promise(resolve => setTimeout(resolve, 1000))
        res.status(200).send({ message: "OK", data: pins, nextCursor: hasNextPage ? pageNumber + 1 : null, error: false })
    })
}

export default pinController