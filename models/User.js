import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    referralCode: { type: String, unique: true },
    parentReferralCode: String,
    directReferrals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    level: Number,
    createdAt: { type: Date, default: Date.now },
});
const User = mongoose.model.User || mongoose.model('User', userSchema);

export { User }