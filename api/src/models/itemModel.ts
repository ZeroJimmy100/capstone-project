import mongoose, { model, Schema } from 'mongoose';

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }, 
    sellerEmail: {
        type: String,
        required: true
    },
    buyerEmail: {
        type: String
    },
    itemImage: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

export default mongoose.model('Item', itemSchema);