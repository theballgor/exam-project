import {Router} from "express";
import {check, validationResult} from 'express-validator'
import User from '../models/User.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import roleMiddleware from '../middlewares/admin.middleware.js'

const router = Router()


router.post('/users', [authMiddleware, roleMiddleware], async (req, res) => {
    try {
        const {skip, count} = req.query

        if(!skip || count) {
            return res.status(400).send()
        }

        console.log(req.admin.userId)

        res.status(201).json({message: 'Register success'})
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})

export default router