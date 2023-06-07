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
    validatePasswordRegister(newPassword, 'New password')
    validatePasswordRegister(newPasswordConfirm, 'New password confirm')
    validateCallback(callback)

    if (newPassword === password)
        throw new Error('New password equals old password')
    validatePasswordLogin(newPasswordConfirm, 'New password confirm')
    if (newPassword !== newPasswordConfirm)
        throw new Error('Password confirmation mismatch')

    findUserById(userId, (user) => {
        if (!user) {
            callback(new Error('User not found'))

            return
        }

        if (password !== user.password) {
            callback(new Error('Wrong password'))

            return
        }

        user.password = newPassword

        saveUser(user, () => callback(null))
    })
}
