import updateUserPassword from '../logic/updateUserPassword'
import { context } from '../ui'
import './Profile.css'
import { useContext } from 'react'
import Context from '../Context'
import Form from '../library/Form'
import Container from '../library/Container'

export default function UpdatePassword({}) {
    const { alert } = useContext(Context)

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
        } catch (error) {
            alert(error.message)
        }
    }

    console.debug('Profile -> Render')
    return (
        <section className="profile " id="profile-section">
            <Container tag="div">
                <Form
                    tag="form"
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
                </Form>
            </Container>
        </section>
    )
}
