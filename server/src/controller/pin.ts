import asyncHandler from "../middlewares/asyncHandler";
import Pin from "../models/pin";

const pinController = {
    create: asyncHandler(async (_, res) => {
        res.status(201).json({ message: "OK", error: false })
    }),
    getAallPins: asyncHandler(async (_, res) => {
        const pins = await Pin.find()
        res.status(200).send({ message: "OK", data: pins, error: false })
    })
}

export default pinController