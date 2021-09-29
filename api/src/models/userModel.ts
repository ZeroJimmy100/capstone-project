import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: false,
        default: ""
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String, 
        required: true,
        trim: true
    },
    emailToken: {
        type: String,
        trim: true
    },
    isVerified: {
        type: Boolean
    },
    accountBalance: {
        type: Number
    },
    listOfAddress: [{
        streetAddress: {
            type: String
        }
    }],
    phoneNum: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    }
});

export default mongoose.model('User', UserSchema);