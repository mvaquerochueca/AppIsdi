import updateUserAvatar from '../logic/updateUserAvatar'
import { context } from '../ui'
import './Profile.css'
import { useContext } from 'react'
import Context from '../Context'
import Form from '../library/Form'
import Container from '../library/Container'
import Input from '../library/Input'
import Button from '../library/ButtonForm'

export default function UpdateAvatar({ onUserAvatarUpdated }) {
    const { alert } = useContext(Context)

    const handleUpdateAvatar = (event) => {
        event.preventDefault()

        const url = event.target.url.value

        try {
            updateUserAvatar(context.userId, url, (error) => {
                if (error) {
                    alert(error.message)

                    return
                }

                onUserAvatarUpdated()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <section>
            <Container tag="div">
                <Form onSubmit={handleUpdateAvatar}>
                    <span className="text-center text-xl mt-4">
                        Update avatar
                    </span>
                    <Input type="url" name="url" placeholder="Url" />
                    <Button type="submit" className="mb-4">
                        Update
                    </Button>
                </Form>
            </Container>
        </section>
    )
}
