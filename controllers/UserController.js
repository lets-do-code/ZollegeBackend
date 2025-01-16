
import { User } from "../models/User.js";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password, referralCode } = req.body;

        // Generate unique referral code for the new user
        const userReferralCode = Math.random().toString(36).substr(2, 6).toUpperCase();

        // Fetch parent user by referral code
        const parentUser = await User.findOne({ referralCode });

        if (!parentUser) {
            return res.status(400).json({ error: 'Invalid referral code.' });
        }

        if (parentUser.directReferrals.length >= 8) {
            return res.status(400).json({ error: 'Referral limit exceeded.' });
        }

        // Create new user
        const newUser = new User({
            name,
            email,
            password,
            referralCode: userReferralCode,
            parentReferralCode: referralCode,
            level: parentUser.level + 1,
        });

        await newUser.save();

        // Add to parent's direct referrals
        parentUser.directReferrals.push(newUser._id);
        await parentUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
