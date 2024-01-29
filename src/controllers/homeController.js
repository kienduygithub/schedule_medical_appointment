import db from '../models/index'
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

module.exports = {
    getHomePage: getHomePage
}