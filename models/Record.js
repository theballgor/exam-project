import mongoose from "mongoose"

const schema = new mongoose.Schema({
    content: {type: String, minlength: 4, maxlength: 256},
    userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'}
})

const Record = mongoose.model('Record', schema)

export default Record