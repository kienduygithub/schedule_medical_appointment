import db from '../models/index'
import bcrypt from 'bcryptjs'

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

module.exports = {
    loginUser: loginUser
}