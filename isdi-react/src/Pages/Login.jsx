import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
import './LoginRegister.css'
import { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import petitionApiQuote from '../../LibraryApis/petitionApiQuote'
import Container from '../library/Container'
import Form from '../library/Form'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    console.debug('Login -> render')
    const { alert, freeze, unfreeze } = useContext(Context)
    const [quote, setQuote] = useState(null)

    useEffect(() => {
        try {
            freeze()
            petitionApiQuote((error, content, author) => {
                unfreeze()
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

    const handleRegisterClick = (event) => {
        event.preventDefault()

        onRegisterClick()
    }

    // function showError(message) {
    //     toast.error(message, {
    //         position: 'top-right',
    //         autoClose: 3000,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progressBar: true,
    //         size: 'small',
    //     })
    // }

    const handleLogin = (event) => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            authenticateUser(email, password, (error, userId) => {
                if (error) {
                    alert(error.message, 'error')

                    return
                }
                context.userId = userId

                onUserLoggedIn()
            })
        } catch (error) {
            alert(error.message, 'warn')
        }
    }

    return (
        <Container tag="main">
            <Form tag="form" onSubmit={handleLogin}>
                <span className="title">Sign In</span>

                {quote && (
                    <p>
                        <q>{quote.content}</q>
                        <br />
                        <cite>{quote.author}</cite>
                    </p>
                )}

                <input
                    className="input-login"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <input
                    className="input-login"
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <button className="button" type="submit">
                    Login
                </button>
            </Form>

            <div className="Form-section">
                <p>You do not have an account?</p>
                <a href="" onClick={handleRegisterClick}>
                    Sign Up
                </a>
            </div>
        </Container>
    )
}
