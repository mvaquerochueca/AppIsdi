import { context } from '../ui'
import authenticateUser from '../logic/authenticateUser'
import './LoginRegister.css'

export default function Login({ onRegisterClick, onUserLoggedIn }) {
    console.log('Login -> render')

    const handleRegisterClick = (event) => {
        event.preventDefault()

        onRegisterClick()
    }

    const handleLogin = (event) => {
        event.preventDefault()

        const email = event.target.email.value
        const password = event.target.password.value

        try {
            const userId = authenticateUser(
                email,
                password,
                (error, userId) => {
                    if (error) {
                        alert(error.message)

                        return
                    }
                    context.userId = userId

                    onUserLoggedIn()
                }
            )
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div className="login page container ">
            <form className="form" onSubmit={handleLogin}>
                <span className="title">Sign In</span>

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
            </form>

            <div className="form-section">
                <p>You do not have an account?</p>
                <a href="" onClick={handleRegisterClick}>
                    Sign Up
                </a>
            </div>
        </div>
    )
}
