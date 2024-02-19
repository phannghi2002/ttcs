import User from '../models/user.js';

//Create new ticket

export const createUser = async (req, res) => {
    const newUser = new User(req.body);

    try {
        const saveUser = await newUser.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to create. Try again ',
        });
    }
};

//update ticket

export const updateUser = async (req, res) => {
    const id = req.params.id;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: req.body,
            },
            { new: true },
        );

        res.status(200).json({
            success: true,
            message: 'Successfully updated',
            data: updatedUser,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to update. Try again ',
        });
    }
};

//delete ticket

export const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Successfully deleted',
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete. Try again ',
        });
    }
};

//getSingle ticket

export const getSingleUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);

        res.status(200).json({
            success: true,
            message: 'Successfully',
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found nhu c',
        });
    }
};

//getAll ticket

export const getAllUser = async (req, res) => {
    //for pagination

    try {
        const users = await User.find({});

        if (users.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully',
                data: users,
            });
        } else {
            throw new Error('No users found'); // Throw an error when tickets.length is <= 0
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found nhue b ',
        });
    }
};

// get User use phone to search

export const getUserEqualPhone = async (req, res) => {
    const { Phone, Email } = req.query;

    // Check if Email is not empty

    try {
        const user = await User.findOne({
            Phone: new RegExp(`^${Phone}$`),
            Email: { $ne: '' }, // Exclude users with empty Email
        });

        if (user) {
            res.status(200).json({
                success: true,
                message: 'User found',
                data: user,
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};
