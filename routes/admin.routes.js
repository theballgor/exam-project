import {Router} from "express";
import User from '../models/User.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import roleMiddleware from '../middlewares/admin.middleware.js'
import Record from "../models/Record.js";
import {Roles} from "../types/user.types.js";

const router = Router()

router.get('/users', [authMiddleware, roleMiddleware], async (req, res) => {
    try {
        const {page, count} = req.query

        if (!page || !count) {
            return res.status(400).send()
        }

        const numPerPage = parseInt(count)
        if (isNaN(numPerPage)) {
            return res.status(400).send()
        }

        const users = await User
            .find({role: {$ne: Roles.Admin}})
            .skip(page > 0 ? (page * numPerPage) : 0)
            .limit(numPerPage)

        const responseUsers = await Promise.all(
            users.map(item => {
                return new Promise(async (resolve) => {
                    resolve({
                        id: item._id,
                        email: item.email,
                        username: item.username,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        countOfRecords: await Record.find({userId: item._id}).countDocuments()
                    })
                })
            }))

        res.status(200).json({
            users: responseUsers,
            totalCount: +page === 0 ? await User.find().countDocuments({role: {$ne: Roles.Admin}}) : undefined
        })
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})

router.delete('/users', [authMiddleware, roleMiddleware], async (req, res) => {
    try {
        const {userId} = req.body
        if (!userId || userId.toString() === req.admin.toString()) {
            return res.status(400).send()
        }
        await User.findByIdAndDelete(userId)
        await Record.deleteMany({userId})
        res.status(204).send()
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})


export default router