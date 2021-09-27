import mongoose from "mongoose";
import {Roles} from "../types/user.types.js";

const schema = new mongoose.Schema({
    email: {type: String, required: true, unique: true, minlength: 5, maxlength: 64},
    firstName: {type: String, minlength: 0, maxlength: 32},
    lastName: {type: String, minlength: 0, maxlength: 32},
    additionalInfo: {type: String, minlength: 0, maxlength: 128},
    username: {type: String, required: true, unique: true, minlength: 4, maxlength: 16},
    role: {type: String, required: true, default: Roles.User},
    password: {type: String, required: true},
})

const User = mongoose.model('User', schema)

export default User