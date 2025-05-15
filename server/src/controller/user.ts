import type { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler";
import type { UserType } from "../types";

const userController = {
    register: asyncHandler(async (req: Request, res: Response) => {
        const { username, email, password, name } = req.body as UserType
        if (!name) throw new Error("Please input your name")
        res.status(201).json({ message: "user created", user: "body", error: false })
    })
}
export default userController