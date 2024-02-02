import db from '../models/index'
import bcrypt from 'bcryptjs'

const salt = bcrypt.genSaltSync(10);
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
// CREATE NEW USER
const createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existedEmail = await db.User.findOne({
                where: { email: data.email }
            })
            if (existedEmail) {
                resolve({
                    status: 'ERR',
                    message: 'Your email is already in used, Plz try another email'
                })
            } else {
                const passwordHashed = await hashPassword(data.password);
                let user = await db.User.create({
                    email: data.email,
                    password: passwordHashed,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    phonenumber: data.phonenumber,
                    gender: data.gender,
                    roleId: data.roleId,
                    positionId: data.positionId
                })
                resolve({
                    status: 'OK',
                    message: 'CREATE NEW USER SUCCESS',
                    data: user
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
const hashPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const passwordHashed = await bcrypt.hashSync(password, salt);
            resolve(passwordHashed)
        } catch (error) {
            reject(error)
        }
    })
}
// EDIT USER
const editUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: `The user id ${ data.id } isn't exist in system`
                })
            } else {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save()
                resolve({
                    status: 'OK',
                    message: `EDIT USER SUCCESS`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
// DELETE USER
const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await db.User.findOne({
                where: { id: userId }
            })
            if (!user) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not exist in system'
                })
            } else {
                await db.User.destroy({
                    where: { id: userId }
                });
                resolve({
                    status: 'OK',
                    message: `DELETE USER ID ${ userId } SUCCESS`
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
// GET ALL CODES
const getAllCodes = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            const allcodes = await db.Allcode.findAll({
                where: { type: typeInput }
            });
            resolve({
                status: 'OK',
                message: 'ALL ALLCODES',
                data: allcodes
            })
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    loginUser: loginUser,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getAllCodes: getAllCodes
}