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
    getAallPins: asyncHandler(async (_, res) => {
        const pins = await Pin.find()
        res.status(200).send({ message: "OK", data: pins, error: false })
    })
}

export default pinController