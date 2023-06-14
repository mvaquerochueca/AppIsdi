import { useState } from 'react'
import Register from './Pages/Register'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { context } from './ui'
import Alert from './components/Alert'
import Context from './Context'
import { Loader } from './library/index.js'
// import SavedPost from './components/SavedPosts'

export default function App() {
    const [view, setView] = useState(context.userId ? 'home' : 'login')
    const [feedback, setFeedback] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleGoToRegister = () => setView('register')

    const handleGoToLogin = () => setView('login')

    const handleGoToHome = () => setView('home')

    const handleAcceptAlert = () => setFeedback(null)

    // const handleGoToSavedPosts = () => setView('savedPosts')

    const alert = (message, level = 'warn') => {
        setFeedback({ message, level })
    }
    const freeze = () => setLoading(true)
    const unfreeze = () => setLoading(false)

    console.debug('App -> render')

    return (
        <Context.Provider value={{ alert, freeze, unfreeze }}>
            {view === 'login' && (
                <Login
                    onRegisterClick={handleGoToRegister}
                    onUserLoggedIn={handleGoToHome}
                />
            )}

            {view === 'register' && (
                <Register
                    onLoginClick={handleGoToLogin}
                    onUserRegistered={handleGoToLogin}
                />
            )}
            {view === 'home' && <Home onLoggedOut={handleGoToLogin} />}
            {feedback && (
                <Alert
                    message={feedback.message}
                    level={feedback.level}
                    onAccept={handleAcceptAlert}
                />
            )}
            {loading && <Loader />}
        </Context.Provider>
    )
}
