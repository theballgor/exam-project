import User from '../models/User.js'
import {Roles} from "../types/user.types.js";

export default async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        if(user.role !== Roles.Admin) {
            return res.status(401).json({ message: "Administrator permission required" })
        }
        req.admin = user._id
        next()
    } catch (e) {
        res.status(500).json({ message: "Administrator permission required" })
    }
}