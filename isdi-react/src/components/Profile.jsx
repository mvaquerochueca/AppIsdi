import updateUserPassword from '../logic/updateUserPassword'
import updateUserAvatar from '../logic/updateUserAvatar'
import { context } from '../ui'
import './Profile.css'

export default function Profile({ onUserAvatarUpdated }) {
    const handleUpdateAvatar = (event) => {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url)

            onUserAvatarUpdated()
        } catch (error) {
            alert(error.message)
        }
    }

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
                newPasswordConfirm
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
                    className="form profile-avatar-form"
                    onSubmit={handleUpdateAvatar}
                >
                    <span>Update avatar</span>
                    <input
                        className="input-change-avatar"
                        type="url"
                        name="url"
                        placeholder="Url"
                    />
                    <button className="button" type="submit">
                        Update
                    </button>
                </form>
            </div>

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
