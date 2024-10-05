import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    author: {
        type: String,
    },
    price: {
        type: Number,
    },
    position: {
        type: {
            shelf: {
                type: String,
            },
            row: {
                type: String,
            },
            column: {
                type: String,
            },
        },
    },
    status: {
        type: String,
        enum: ['available', 'borrowed'],
        default: 'available',
    },
})

export default mongoose.models.Book || mongoose.model('Book', bookSchema)

