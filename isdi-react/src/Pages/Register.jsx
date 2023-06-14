import registerUser from '../logic/registerUser'
import './LoginRegister.css'
import { useEffect, useState, useContext } from 'react'
import petitionApiQuote from '../../LibraryApis/petitionApiQuote'
import Context from '../Context'
import { ButtonForm, Input, Container } from '../library'

export default function Register({ onLoginClick, onUserRegistered }) {
    console.debug('Register -> Render')
    const { alert } = useContext(Context)

    const [quote, setQuote] = useState(null)

    useEffect(() => {
        try {
            petitionApiQuote((error, content, author) => {
                if (error) {
                    alert(error.message, 'error')
                    return
                }
                setQuote({ content, author })
            })
        } catch (error) {
            alert(error.message, 'error')
        }
    }, [])

    const handleLoginClick = (event) => {
        event.preventDefault()

        onLoginClick()
    }

    const handleRegisterUser = function (event) {
        event.preventDefault()

        const name = event.target.name.value
        const email = event.target.email.value
        const password = event.target.password.value

        try {
            registerUser(name, email, password, (error) => {
                if (error) {
                    alert(error.message)
                    return
                }

                onUserRegistered()
                handleLoginClick(event)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <Container tag="main">
            <Form onSubmit={handleRegisterUser}>
                <span className="text-2xl text-center mt-5 ">Sing Up</span>
                <span className="text-center ml-1 mr-1">
                    Create a free account with your email
                </span>
                {/* {quote && (
                    <p className="text-center">
                        <q>{quote.content}</q>
                        <br />
                        <cite>{quote.author}</cite>
                    </p>
                )} */}
                <Input type="text" name="name" placeholder="Full Name" />
                <Input type="email" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />

                <ButtonForm type="submit">Sing up</ButtonForm>
            </Form>
            <p className="text-center p-2">Have an account? </p>
            <div className="flex flex-col justify-center p-4">
                <a
                    href=""
                    onClick={handleLoginClick}
                    className="text-center text-blue-500"
                >
                    Sign In
                </a>
            </div>
        </Container>
    )
}
