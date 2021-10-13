import {Router} from "express";
import {check, validationResult} from 'express-validator'
import User from '../models/User.js'
import {Roles} from "../types/user.types.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/register', [
    check('email', 'Invalid email').isEmail(),
    check('username', 'Username must be from 4 to 16 symbols').isLength({min: 4, max: 16}),
    check('password', 'Password must be from 8 to 16 symbols').isLength({min: 8, max: 16})
], async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: 'Validation error'})
        }
        const {email, password, username} = req.body
        const dbUserByUsername = await User.findOne({username})
        if (dbUserByUsername) {
            return res.status(400).json({message: 'Same user already exists'})
        }
        const dbUserByEmail = await User.findOne({email})
        if (dbUserByEmail) {
            return res.status(400).json({message: 'Same user already exists'})
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const candidate = new User({
            email: email.toLowerCase(),
            password: hashPassword,
            username: username.toLowerCase(),
            role: Roles.User
        })
        await candidate.save()
        res.status(201).json({message: 'Register success'})
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})

router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body

        const candidate = await User.findOne({email: email.toLowerCase()})
        if (!candidate) {
            return res.status(400).json({
                message: 'Invalid login or password'
            })
        }

        const isCorrect = await bcrypt.compare(password, candidate.password)
        if (!isCorrect) {
            return res.status(400).json({
                message: 'Invalid login or password'
            })
        }

        const token = jwt.sign(
            {userId: candidate._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )

        res.status(201).json({
            userId: candidate._id,
            username: candidate.username,
            email: candidate.email,
            token: token,
            role: candidate.role
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})

router.post('/check', [authMiddleware], async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        res.status(201).json({role: user.role})
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})


export default router