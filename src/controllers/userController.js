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
module.exports = {
    loginUser: loginUser,
    getAllUsers: getAllUsers
}