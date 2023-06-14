import { FiMenu } from 'react-icons/fi'
import { useState, useEffect } from 'react'
import retrieveUser from '../logic/retrieveUser'
import { context } from '../ui'
import UpdateAvatar from './UpdateAvatar'
import UpdatePassword from '/Users/mario/Desktop/Github Repo/AppIsdi/isdi-react/src/components/UpdatePassword.jsx'

export default function Navigation() {
    const [open, setOpen] = useState(false)
    const [user, setUser] = useState()
    const [view, setView] = useState('posts')

    const handleUpdatePassword = (event) => {
        event.preventDefault()
        setView('update-password')
    }

    const handleLogout = () => {
        delete context.userId
        onLoggedOut()
    }

    useEffect(() => {
        try {
            retrieveUser(context.userId, (error, user) => {
                if (error) {
                    alert(error.message)
                    return
                }

                setUser(user)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    return (
        <header className="border-b border-gray-300 py-2 block h-14">
            <div className="flex items-center justif-between xl:max-w-7xl mx-auto max-w-full px-[8%] flex-wrap w-full ">
                <FiMenu
                    className="lg:hidden block h-6 w-6 cursor-pointer align-center  my-2 justify-start"
                    onClick={() => setOpen(!open)}
                />

                <nav
                    className={`${
                        open ? 'block' : 'hidden'
                    }  w-full lg:flex lg:items-center lg:w-auto z-10 `}
                >
                    <ul className="text-base text-gray-700 lg:flex lg:justify-between bg-zinc-700  border border-cyan-400 rounded-xl">
                        {user && (
                            <li>
                                <a
                                    className="text-white  lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                    href=""
                                >
                                    <p>{user.name}</p>
                                    <img
                                        src={user.avatar}
                                        className="w-12 h-12 rounded-full"
                                        alt=""
                                    />
                                </a>
                            </li>
                        )}
                        <li>
                            <a
                                className="text-white  lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                href=""
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-white lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                href=""
                                onClick={handleUpdatePassword}
                            >
                                Update Password
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-white lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                href=""
                            >
                                Update Avatar
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-white lg:px-5 py-2 block hover:text-blue-700 font-semibold"
                                href=""
                            >
                                Saved Post
                            </a>
                        </li>
                        <li>
                            <a
                                className="text-white lg:px-5 py-2 block bg-blue-700  rounded-xl"
                                href=""
                                onClick={handleLogout}
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
