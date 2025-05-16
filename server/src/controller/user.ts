import type { Request, Response } from "express";
import jwt from "jsonwebtoken"

import asyncHandler from "../middlewares/asyncHandler";
import type { UserType } from "../types";
import { compareSync, hashSync } from "bcrypt-ts";
import User from "../models/user";
import { otp, otpStore, transporter } from "../libs";

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

        const user = await User.create({ username, email, name, password: hashedPassword });

        user.save()

        if (user) {
            otpStore.set(user.email, otp);

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: user.email,
                subject: "Kode OTP untuk Candra Pin",
                text: `Kode verifikasi anda adalah: ${otp}`,
            });
        }


        res.status(201).json({ message: "Pendaftaran berhasil, kami telah mengirimkan kode verifikasi, cek kotak pesan email atau spam dan verifikasi", error: false })
    }),
    login: asyncHandler(async (req, res) => {
        const identifier = req.body.identifier as UserType['username'] | UserType["email"]
        const password = req.body.password as UserType["password"]

        if (!identifier) throw new Error("Silahkan masukkan Password")
        if (!password) throw new Error("Silahkan masukkan Password")

        const existingUser = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] })
        if (!existingUser) throw new Error("User tidak ditemukan")

        if (!existingUser.password) throw new Error("Sepertinya anda mendaftar dengan platform google atau github, silahkan login dengan platform tersebut")

        const validPassword = compareSync(password, existingUser.password)

        if (!validPassword) throw new Error("Password yang anda masukkan tidak valid")

        if (!existingUser.isAuthenticated) {
            otpStore.set(existingUser.email, otp);

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: existingUser.email,
                subject: "Kode OTP untuk Candra Pin",
                text: `Kode verifikasi anda adalah: ${otp}`,
            });
            return res.status(400).json({ message: "Akun anda belum terverifikasi, silahkan verifikasi terlebih dahulu, kami sudah mengirimkan kode verifikasi, cek kotak pesan email atau spam", isVerified: false, error: true })
        }

        const token = jwt.sign({ id: existingUser._id }, process.env.SECRET_KEY || "".toString(), {
            expiresIn: "1h",
        });


        res.cookie('token', token, {
            path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax"
        }).status(200).send({ message: "Login berhasil!", error: false })
    })
}
export default userController