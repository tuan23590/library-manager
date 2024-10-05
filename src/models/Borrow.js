import mongoose from 'mongoose'

const borrowSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    },
    borrower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    borrowDate: {
        type: Date,
    },
    returnDate: {
        type: Date,
    },
})

export default mongoose.models.Borrow || mongoose.model('Borrow', borrowSchema)