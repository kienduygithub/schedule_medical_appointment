import db from '../models'
import doctorService from '../services/doctorService'
const getTopDoctorHome = async (req, res) => {
    try {
        let limit = req.query.limit;
        if (!limit) {
            limit = 10
        }
        const response = await doctorService.getTopDoctorHome(limit);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
const getAllDocters = async (req, res) => {
    try {
        const type = req.query.type;
        const response = await doctorService.getAllDocters(type);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
const postInfoDoctor = async (req, res) => {
    try {
        const response = await doctorService.postInfoDoctor(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDocters: getAllDocters,
    postInfoDoctor: postInfoDoctor
}