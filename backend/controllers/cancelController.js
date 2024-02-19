import Cancel from '../models/cancel.js';

export const getAllCancel = async (req, res) => {
    try {
        const cancels = await Cancel.find({});

        if (cancels.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully',
                data: cancels,
            });
        } else {
            throw new Error('No cancels found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const getCancel = async (req, res) => {
    const codeTicket = new RegExp(`^${req.query.CodeTicket}$`);
    const customer = new RegExp(`^${req.query.Customer}$`);

    console.log(codeTicket, customer);

    try {
        const cancels = await Cancel.find({
            CodeTicket: codeTicket,
            Customer: customer,
        });

        if (cancels.length > 0) {
            res.status(200).json({
                success: true,
                message: 'Successfully',
                data: cancels,
            });
        } else {
            throw new Error('No cancels found');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};

export const createCancel = async (req, res) => {
    const newCancel = new Cancel(req.body);

    try {
        const saveCancel = await newCancel.save();
        res.status(200).json({
            success: true,
            message: 'Successfully created',
            data: saveCancel,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};

export const deleteCancel = async (req, res) => {
    const id = req.params.id;
    try {
        await Cancel.findByIdAndDelete(id);

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

export const notifyCompany = async (req, res) => {
    const Company = new RegExp(`^${req.query.Company}$`);

    try {
        const cancels = await Cancel.find({
            Company: Company,
        });

        res.status(200).json({
            success: true,
            message: 'Successfully found search',
            count: cancels.length,
            data: cancels,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: 'Not found ',
        });
    }
};
