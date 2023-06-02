import updateUserPassword from '../logic/updateUserPassword'
import updateUserAvatar from '../logic/updateUserAvatar'
import { context } from '../ui'
import './Profile.css'
import { useState, useEffect } from 'react'

export default function UpdatePassword({}) {
    function handleUpdatePassword(event) {
        event.preventDefault()

        const password = event.target.password.value
        const newPassword = event.target.newPassword.value
        const newPasswordConfirm = event.target.newPasswordConfirm.value

        try {
            updateUserPassword(
                context.userId,
                password,
                newPassword,
                newPasswordConfirm,
                (error) => {
                    if (error) {
                        alert(error.message)

                        return
                    }
                }
            )

            alert('Password updated successfully')
        } catch (error) {
            alert(error.message)
        }
    }

    console.log('Profile -> Render')
    return (
        <section className="profile " id="profile-section">
            <div className="container">
                <form
                    className="form profile-password-form"
                    onSubmit={handleUpdatePassword}
                >
                    <span className="subtitle">Update password</span>
                    <input
                        className="input-change-password"
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <input
                        className="input-change-password"
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                    />
                    <input
                        className="input-change-password"
                        type="password"
                        name="newPasswordConfirm"
                        placeholder="New Password Confirmation"
                    />
                    <button
                        className="button upadte-new-password"
                        type="submit"
                    >
                        Update
                    </button>
                </form>
            </div>
        </section>
    )
}
