import type { Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

import { compareSync, hashSync } from "bcrypt-ts";
import { otp, otpStore, transporter } from "../libs";
import asyncHandler from "../middlewares/asyncHandler";
import User from "../models/user";
import type { UserType } from "../types";

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
            path: "/", httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", maxAge: 7 * 24 * 60 * 60 * 1000
        }).status(200).send({ message: "Login berhasil!", error: false })
    }),
    verifyOtp: asyncHandler(async (req, res) => {
        const { identifier, otp } = req.body

        if (!identifier || !otp) {
            throw new Error("Email atau Username dan OTP diperlukan");
        }

        const existingUser = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] })
        if (!existingUser) throw new Error("User tidak ditemukan")

        const storedOtp = otpStore.get(existingUser.email);
        if (!storedOtp || storedOtp !== otp) {
            throw new Error("OTP Tidak valid");
        }

        const updatedUser = await User.updateOne({ $or: [{ username: identifier }, { email: identifier }] }, { $set: { isAuthenticated: true } })

        if (!updatedUser) throw new Error("Terjadi kesalahan, silahkan cobalagi")

        res.status(200).send({ message: "Verifikasi berhasil, Anda sekarang dapat login!", error: false })

    }),
    logout: asyncHandler(async (_, res) => {
        res.clearCookie("token")
        res.status(200).json({ message: "Logout Berhasil", error: false })
    }),
    getLoggedInUser: asyncHandler(async (req, res) => {
        const token = req.cookies.token

        if (!token) throw new Error("user tidak terauthentifikasi")
        const { id } = jwt.verify(token, process.env.SECRET_KEY || "") as JwtPayload
        const user = await User.findOne({ _id: id })
        if (!user) {
            throw new Error("User Not Found")
        }

        if (!user.isAuthenticated) throw new Error("User is not verified yet")

        const { password, ...allUserInfoWithoutPassword } = user.toObject()
        res.status(200).send({ message: "ok", user: allUserInfoWithoutPassword, error: false })
    }),
    loginGithub: asyncHandler(async (_, res) => {
        res.redirect(
            `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
        );
    }),
    githubCallback: asyncHandler(async (req, res) => {
        const code = req.query.code
        if (!code) throw new Error("Code are required")

        // Exchange code for access token
        const tokenRes = await fetch(
            "https://github.com/login/oauth/access_token",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                    code,
                }),
            }
        );

        const tokenData = await tokenRes.json() as { access_token: string };
        const accessToken = tokenData.access_token;

        if (!accessToken) throw new Error("Failed to get access token");

        // Get GitHub user data
        const userRes = await fetch("https://api.github.com/user", {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userFromGithub = await userRes.json() as { login: string, email: string, avatar_url: string };

        if (!userFromGithub) throw new Error("Failed to fetch user");

        const { login: username, email, avatar_url } = userFromGithub;

        if (!email || !username) {
            throw new Error("");
        }


        let user = await User.findOne({ email })

        const body = { username, email, name: username, avatar: avatar_url };

        if (!user) {
            user = await User.create({ ...body, isAuthenticated: true })
        }

        const { _id: userIdFromDB } = user.toObject();

        // Generate JWT token
        const token = jwt.sign(
            { id: userIdFromDB },
            process.env.SECRET_KEY || "".toString(),
            {
                expiresIn: "30m",
            }
        );
        // Set JWT cookie
        res.cookie('token', token, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax"
        })

        const referer = req.headers.referer || req.headers.origin
        const frontendUrl = referer
            ? new URL(referer).origin
            : process.env.FRONTEND_URL || "http://localhost:5173";

        res.redirect(frontendUrl);

    })
}
export default userController