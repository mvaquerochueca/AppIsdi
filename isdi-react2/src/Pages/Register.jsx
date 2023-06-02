import registerUser from '../logic/registerUser'
import './LoginRegister.css'

export default function Register({ onLoginClick, onUserRegistered }) {
    console.log('Register -> Render')

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
        <div className="register page container">
            <form className="form" onSubmit={handleRegisterUser}>
                <span className="title">Sing Up</span>
                <span className="subtitle">
                    Create a free account with your email
                </span>
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
            </form>

            <div className="form-section">
                <p>
                    Have an account?{' '}
                    <a href="" onClick={handleLoginClick}>
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    )
}
