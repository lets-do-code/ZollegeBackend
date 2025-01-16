import mongoose from "mongoose";

const earningsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    parentUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: Number,
    profit: {
        direct: Number,
        indirect: Number,
    },
    status: { type: String, enum: ['pending', 'completed'], default: 'completed' },
    createdAt: { type: Date, default: Date.now },
});

const Earnings = mongoose.model.Earnings || mongoose.model('Earnings', earningsSchema);

export { Earnings }