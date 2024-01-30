import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);
// POST CRUD
const postCRUD = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const passwordAfterHashed = await hashPassword(data.password);
            const existedEmail = await db.User.findOne({
                where: { email: data.email }
            });
            if (existedEmail) {
                resolve({
                    status: 'ERR',
                    message: 'The user has been defined'
                })
            } else {
                const user = await db.User.create({
                    email: data.email,
                    password: passwordAfterHashed,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId
                })
                resolve({
                    status: 'OK',
                    message: 'CREATE NEW USER'
                });
            }
        } catch (error) {
            reject(error);
        }
    })
}
const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const passwordHashed = await bcrypt.hashSync(password, salt);
            resolve(passwordHashed);
        } catch (error) {
            reject(error);
        }
    })
}
// GET CRUD
const getCRUD = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUsers = await db.User.findAll({
                raw: true
            })
            resolve({
                status: 'OK',
                message: 'ALL USERS',
                data: allUsers
            })
        } catch (error) {
            reject(error)
        }
    })
}
// DELETE CRUD
const deleteCRUD = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: `The user id ${ userId } hasn't been defined`
                })
            } else {
                await user.destroy();
                const allUsers = await db.User.findAll({
                    raw: true
                })
                resolve({
                    status: 'OK',
                    message: 'DELETE USER SUCCESSFULLY',
                    data: allUsers
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    deleteCRUD: deleteCRUD
}