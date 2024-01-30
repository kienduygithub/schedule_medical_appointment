import userService from '../services/userService'
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
        return res.status(404).json({
            message: error
        })
    }
}
module.exports = {
    loginUser: loginUser
}