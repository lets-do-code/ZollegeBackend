import { Earnings } from "../models/Earnings.js";
import { User } from "../models/User.js";

export const addEarnings = async (req, res) => {
    try {
        const { userId, amount } = req.body;

        if (amount <= 1000) {
            return res.status(400).json({ error: 'Amount must be greater than 1000.' });
        }

        const user = await User.findById(userId).populate('directReferrals');
        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Direct earnings for parent
        const parent = await User.findOne({ referralCode: user.parentReferralCode });
        if (parent) {
            const directProfit = (amount * 5) / 100;
            const earning = new Earnings({
                userId: user._id,
                parentUserId: parent._id,
                amount,
                profit: { direct: directProfit },
            });
            await earning.save();

            // Notify parent via WebSocket
            global.io.to(parent._id.toString()).emit('direct-earning', earning);
        }

        res.status(201).json({ message: 'Earnings added successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
