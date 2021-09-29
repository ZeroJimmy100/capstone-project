import mongoose, { model, Schema } from 'mongoose';

const communitySchema = new Schema({
    name: {
        type: String, 
        required: true
    },
    description: {
        type: String
    },
    password: {
        type: String,
        default: ""
    },
    owner: {
        type: String
    },
    myCommunity: [{
        type: String
    }]

}, {timestamps: true});