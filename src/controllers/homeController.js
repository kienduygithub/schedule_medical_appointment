import db from '../models/index'
import homeService from '../services/homeService'
// GET HOME PAGE
const getHomePage = async (req, res) => {
    try {
        let dataRender = await db.User.findAll({
            raw: true,
            logging: false
        });
        return res.render('HomePage', { dataRender: JSON.stringify(dataRender) });
    } catch (error) {
        console.log(error);
    }
}
// GET CRUD
const getCRUD = async (req, res) => {
    try {
        return res.render('CRUD');
    } catch (error) {

    }
}
// POST CRUD
const postCRUD = async (req, res) => {
    try {
        const response = await homeService.postCRUD(req.body);
        console.log('>>> Response: ', response)
        return res.send('POST CREATE SUCCESSFULLY');
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
// GET CRUD
const getDataCRUD = async (req, res) => {
    try {
        const response = await homeService.getCRUD();
        console.log('===============================');
        console.log(response)
        console.log('===============================');
        return res.render('displayCRUD', { allUsers: response.data })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
// DELETE CRUD
const deleteCRUD = async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await homeService.deleteCRUD(userId);
        return res.redirect('/api/get-crud')
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}
module.exports = {
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    deleteCRUD: deleteCRUD,
    getDataCRUD: getDataCRUD,
    getHomePage: getHomePage,
}