import mongoose, { model, Schema } from 'mongoose';

const itemSchema = new Schema({
    name: String,
    description: String,
    price: Number, 
    sellerEmail: String,
    itemImage: {
        data: Buffer,
        contentType: String
    }
}, {timestamps: true});

export default mongoose.model('Item', itemSchema);