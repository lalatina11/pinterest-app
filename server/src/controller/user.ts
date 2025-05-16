import type { Request, Response } from "express";

import asyncHandler from "../middlewares/asyncHandler";
import type { UserType } from "../types";
import { hashSync } from "bcrypt-ts";
import User from "../models/user";

const userController = {
    register: asyncHandler(async (req: Request, res: Response) => {
        const { username, email, password, name } = req.body as UserType
        const usernameRegex = /^[a-zA-Z0-9]{6,}$/
        const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (!usernameRegex.test(username)) {
            throw new Error('username harus minimal 6 karakter dan hanya mengandung huruf dan angka')
        }
        if (!emailRegex.test(email)) {
            throw new Error('email tidak valid')
        }

        if (!password) throw new Error("Password diperlukan")
        if (password.length < 6) {
            throw new Error('password harus minimal 6 karakter')
        }
        if (name.length < 6) {
            throw new Error('nama harus minimal 6 karakter')
        }
        const existingUsername = await User.findOne({ username })

        if (existingUsername) throw new Error("Username sudah digunakan")

        const existingEmail = await User.findOne({ email })

        if (existingEmail) throw new Error("Email sudah digunakan")

        const hashedPassword = hashSync(password, 12)

        const user = await User.create({ username, email, name, password: hashedPassword })

            ; (await user).save()

        res.status(201).json({ message: "user created", user, error: false })
    })
}
export default userController