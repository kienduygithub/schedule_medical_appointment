import db from '../models'

const getTopDoctorHome = (limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                limit: limit,
                order: [
                    [ 'createdAt', 'DESC' ]
                ],
                attributes: {
                    exclude: [ 'password' ]
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: [ 'valueEn', 'valueVn' ] },
                    { model: db.Allcode, as: 'genderData', attributes: [ 'valueEn', 'valueVn' ] }
                ],
                nest: true,
                raw: true
            })
            console.log('data', doctors[ 0 ].positionData);
            resolve({
                status: 'OK',
                message: 'GET ALL TOP DOCTOR HOME',
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}
const getAllDocters = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: [ 'image', 'password' ]
                },
                include: [
                    { model: db.Allcode, as: 'positionData', attributes: [ 'valueEn', 'valueVn' ] },
                    { model: db.Allcode, as: 'genderData', attributes: [ 'valueEn', 'valueVn' ] }
                ],
                raw: true,
                nest: true
            })
            resolve({
                status: 'OK',
                message: 'GET ALL DOCTORS',
                data: doctors
            })
        } catch (error) {
            reject(error)
        }
    })
}
const postInfoDoctor = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.id || !inputData.contentHTML || !inputData.contentMarkdown) {
                resolve({
                    status: 'ERR',
                    message: 'Missing parameter'
                })
            } else {
                await db.Markdown.create({
                    contentHTML: inputData.contentHTML,
                    contentMarkdown: inputData.contentMarkdown,
                    description: inputData.description,
                    doctorId: inputData.id
                })
                resolve({
                    status: 'OK',
                    message: 'SAVE INFO DOCTOR SUCCESS'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDocters: getAllDocters,
    postInfoDoctor: postInfoDoctor
}