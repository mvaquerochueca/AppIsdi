import updateUserPassword from '../logic/updateUserPassword'
import { context } from '../ui'
import './Profile.css'
import { useContext } from 'react'
import Context from '../Context'
import Form from '../library/Form'
import Container from '../library/Container'
import { Button, Input } from '../library'

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
                <Form onSubmit={handleUpdatePassword}>
                    <span className="text-xl  mt-4 text-center">
                        Update password
                    </span>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <Input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                    />
                    <Input
                        type="password"
                        name="newPasswordConfirm"
                        placeholder="New Password Confirmation"
                    />
                    <Button type="submit" className="mb-4">
                        Update
                    </Button>
                </Form>
            </Container>
        </section>
    )
}
