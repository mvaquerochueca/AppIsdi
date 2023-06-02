import updateUserAvatar from '../logic/updateUserAvatar'
import { context } from '../ui'
import './Profile.css'

export default function UpdateAvatar({ onUserAvatarUpdated }) {
    const handleUpdateAvatar = (event) => {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url, (error) => {
                if (error) {
                    alert(error.message)

                    return
                    onUserAvatarUpdated()
                }
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <section>
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
        </section>
    )
}
