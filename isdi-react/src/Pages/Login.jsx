import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
// import './LoginRegister.css'
import { useContext, useEffect, useState } from 'react'
import Context from '../Context'
import petitionApiQuote from '../../LibraryApis/petitionApiQuote'
import Container from '../library/Container'
import Form from '../library/Form'
import Input from '../library/Input'
import Button from '../library/Button'

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
            <Form onSubmit={handleLogin}>
                <span className="text-2xl text-center mt-5 ">Sign In</span>

                {/* {quote && (
                    <p className="text-center">
                        <q>{quote.content}</q>
                        <br />
                        <cite>{quote.author}</cite>
                    </p>
                )} */}
                <span className="text-l text-center mt-5 ">¡Welcome Back!</span>

                <Input type="email" name="email" placeholder="Email" />
                <Input type="password" name="password" placeholder="Password" />
                <Button type="submit">Login</Button>
            </Form>

            <p className="text-center p-2">You do not have an account?</p>
            <div className="flex justify-center p-4">
                <a
                    href=""
                    onClick={handleRegisterClick}
                    className="text-center text-blue-500"
                >
                    Sign Up
                </a>
            </div>
        </Container>
    )
}
