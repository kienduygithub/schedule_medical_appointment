import db from '../models/index'
import bcrypt from 'bcryptjs'

// LOGIN USER
const loginUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { email, password } = data;
            let user = await db.User.findOne({
                where: { email: email },
                attributes: {
                    exclude: [ 'createdAt', 'updatedAt' ]
                }
            })
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: 'The email is incorrect'
                })
            } else {
                const comparePassword = bcrypt.compareSync(password, user.password);
                if (!comparePassword) {
                    resolve({
                        status: 'ERR',
                        message: 'The password is incorrect'
                    })
                } else {
                    user = await db.User.findOne({
                        where: { email: email },
                        attributes: {
                            exclude: [
                                'password', 'createdAt', 'updatedAt'
                            ]
                        }
                    })
                    resolve({
                        status: 'OK',
                        message: 'LOGIN SUCCESS',
                        data: user
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}
// GET ALL USERS
const getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId && userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: [ 'password', 'createdAt', 'updatedAt' ]
                    }
                });
                resolve({
                    status: 'OK',
                    message: 'ALL USERS',
                    data: users
                })
            } else if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: [ 'password', 'createdAt', 'updatedAt' ]
                    }
                })
                resolve({
                    status: 'OK',
                    message: `SINGLE USER ID ${ userId }`,
                    data: users
                })
            } else if (!userId) {
                resolve({
                    status: 'OK',
                    message: 'Missing some parameters',
                    data: users
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    loginUser: loginUser,
    getAllUsers: getAllUsers
}