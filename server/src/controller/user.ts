import type { Request, Response } from "express";
import type { UserForm } from "../types";

import asyncHandler from "../middlewares/asyncHandler";

const userController = {
    register: asyncHandler(async (req: Request, res: Response) => {
        const body = req.body as UserForm
        if (!body.name) throw new Error("Please input your name")
        res.status(201).json({ message: "user created", user: body, error: false })
    })
}
export default userController