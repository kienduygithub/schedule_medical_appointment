import userService from '../services/userService'
// LOGIN USER
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await userService.loginUser({ email, password });
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
// GET ALL USER
const getAllUsers = async (req, res) => {
    try {
        let id = req.body.id; // ALL, ID
        if (!id) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Missing some parameters',
                data: []
            })
        }
        const response = await userService.getAllUsers(id);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
// CREATE NEW USER
const createNewUser = async (req, res) => {
    try {
        const {
            email, password, firstName, lastName,
            address, phonenumber
        } = req.body;
        if (!email || !password || !firstName || !lastName || !address || !phonenumber) {
            return res.status(404).json({
                status: 'ERR',
                message: 'Missing some parameters'
            })
        }
        const response = await userService.createNewUser(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
// EDIT USER
const editUser = async (req, res) => {
    try {
        const response = await userService.editUser(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
// DELETE USER
const deleteUser = async (req, res) => {
    try {
        const userId = req.query.id;
        if (!userId) {
            return res.status(500).json({
                status: 'ERR',
                message: 'Missing some parameters'
            })
        }
        const response = await userService.deleteUser(userId);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
// GET ALL CODES
const getAllCodes = async (req, res) => {
    try {
        const type = req.params.type;
        if (!type) {
            return res.status(500).json({
                status: 'ERR',
                message: 'Missing some parameters'
            })
        }
        const response = await userService.getAllCodes(type);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
module.exports = {
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllCodes: getAllCodes
}