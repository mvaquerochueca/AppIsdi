import registerUser from '../logic/registerUser'
import './LoginRegister.css'
import { useEffect, useState, useContext } from 'react'
import petitionApiQuote from '../../LibraryApis/petitionApiQuote'
import Context from '../Context'
import Container from '../library/Container'
import Form from '../library/Form'

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
            <Form tag="form" onSubmit={handleRegisterUser}>
                <span className="title">Sing Up</span>
                <span className="subtitle">
                    Create a free account with your email
                </span>
                {quote && (
                    <p>
                        <q>{quote.content}</q>
                        <br />
                        <cite>{quote.author}</cite>
                    </p>
                )}
                <input
                    className="input-register"
                    type="text"
                    name="name"
                    placeholder="Full Name"
                />
                <input
                    className="input-register"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <input
                    className="input-register"
                    type="password"
                    name="password"
                    placeholder="Password"
                />

                <button className="button" type="submit">
                    Sing up
                </button>
            </Form>

            <div className="form-section-register">
                <p>
                    Have an account?{' '}
                    <a href="" onClick={handleLoginClick}>
                        Sign In
                    </a>
                </p>
            </div>
        </Container>
    )
}
