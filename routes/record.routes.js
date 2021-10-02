import {Router} from "express";
import Record from '../models/Record.js'
import authMiddleware from '../middlewares/auth.middleware.js'
import {check, validationResult} from "express-validator";

const router = Router()

router.get('/', [authMiddleware], async (req, res) => {
    try {
        const dbRecords = await Record.find({userId: req.user.userId})

        const records = dbRecords.map(item => {
            return {content: item.content, id: item._id}
        })

        res.status(200).json({
            records
        })

    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})

router.post('/', [
    authMiddleware,
    check('content', 'Record must be from 4 to 256 symbols').isLength({min: 4, max: 256})
], async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0]})
        }

        const {content} = req.body
        const record = new Record({
            content, userId: req.user.userId
        })
        await record.save()

        const newRecord = {content: record.content, id: record._id}

        res.status(200).json({record: newRecord})

    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})


router.put('/', [
    authMiddleware,
    check('content', 'Record must be from 4 to 256 symbols').isLength({min: 4, max: 256})
], async (req, res) => {

    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({message: errors.array()[0]})
        }

        const {content, recordId} = req.body
        if (!recordId || !content) {
            return res.status(400).json({message: 'Wrong data'})
        }

        const record = await Record.findById(recordId)
        if (record.userId.toString() !== req.user.userId.toString()) {
            return res.status(400).json({message: 'Bad request'})
        }

        record.content = content
        await record.save()

        res.status(204).send()

    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})

router.delete('/', [
    authMiddleware
], async (req, res) => {
    try {
        const {recordId} = req.body
        if (!recordId) {
            return res.status(400).json({message: 'Wrong data'})
        }
        const record = await Record.findById(recordId)
        if (record.userId.toString() !== req.user.userId.toString()) {
            return res.status(400).json({message: 'Bad request'})
        }
        await record.remove()
        res.status(204).send()
    } catch (e) {
        res.status(500).json({
            message: 'Something went wrong, try again later'
        })
    }
})


export default router