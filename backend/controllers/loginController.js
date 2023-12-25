import Login from '../models/login.js';

export const getAllAccounts = async (req, res) => {
    try {
        const accounts = await Login.find({});

        if (accounts.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully',
                data: accounts,
            });
        } else {
            throw new Error('No accounts found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};
