import { useState } from 'react'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { context } from './ui'

export default function App() {
    const [view, setView] = useState(context.userId ? 'home' : 'login')

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const handleGoToSavePost = () => setView('savePost')

    // componentWillMount() {
    //     console.log('App -> componentWillMount')
    // }

    // componentDidMount() {
    //     console.log('App -> componentDidMount')
    // }

    // componentWillUnmount() {
    //     console.log('App -> componentWillUnmount')
    // }

    console.log('App -> render')

    switch (view) {
        case 'login':
            return (
                <Login
                    onRegisterClick={handleGoToRegister}
                    onUserLoggedIn={handleGoToHome}
                />
            )
        case 'register':
            return <Register onLoginClick={handleGoToLogin} />
        case 'home':
            return <Home onLoggedOut={handleGoToLogin} />
    }
}
