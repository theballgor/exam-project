import {Router} from "express";
import User from '../models/User.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', [authMiddleware], async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            additionalInfo: user.additionalInfo
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})

router.put('/update', [authMiddleware], async (req, res) => {
    try {
        const {firstName, lastName, additionalInfo} = req.body
        const user = await User.findById(req.user.userId)
        if (firstName) {
            if (firstName.length !== 0 && firstName.length < 2 || firstName.length > 32) {
                return res.status(400).json({message: 'Validation error'})
            }
        }
        user.firstName = firstName

        if (lastName) {
            if (lastName.length !== 0 && lastName.length < 2 || lastName.length > 32) {
                return res.status(400).json({message: 'Validation error'})
            }
        }
        user.lastName = lastName

        if (additionalInfo) {
            if (firstName.length !== 0 && firstName.length < 2 || firstName.length > 128) {
                return res.status(400).json({message: 'Validation error'})
            }
        }
        user.additionalInfo = additionalInfo

        await user.save()

        res.status(201).json({message: 'Profile updated'})
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})


export default router