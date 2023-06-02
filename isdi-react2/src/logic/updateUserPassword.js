import {
    validatePasswordLogin,
    validatePasswordRegister,
    validateId,
    validateCallback,
} from './helpers/validators'
import { findUserById } from '../data'
import { saveUser } from '../data'

export default function updateUserPassword(
    userId,
    password,
    newPassword,
    newPasswordConfirm,
    callback
) {
    validateId(userId)
    validatePasswordLogin(password)
    validatePasswordRegister(newPassword, 'new password')
    validatePasswordRegister(newPasswordConfirm, 'new password confirm')
    validateCallback(callback)

    if (newPassword === password)
        throw new Error('new password equals old password')
    validatePasswordLogin(newPasswordConfirm, 'new password confirm')
    if (newPassword !== newPasswordConfirm)
        throw new Error('password confirmation mismatch')

    findUserById(userId, (user) => {
        if (!user) {
            callback(new Error('user not found'))

            return
        }

        if (password !== user.password) {
            callback(new Error('wrong password'))

            return
        }

        user.password = newPassword

        saveUser(user, () => callback(null))
    })
}
