import { useState, useEffect } from 'react'
import retrieveUser from '../logic/retrieveUser'
import { context } from '../ui'

export default function Profile() {
    const [user, setUser] = useState()

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
        <section>
            {user && (
                <ul>
                    <li>
                        <img
                            src={user.avatar}
                            alt="profile"
                            className="w-14 h-14"
                        />
                    </li>
                    <li>
                        <h1>Name: {user.name}</h1>
                    </li>
                    <li>
                        <h2>User Id: {user.id}</h2>
                    </li>

                    <li>
                        <h4>Saved Posts: {user.favs}</h4>
                    </li>
                </ul>
            )}
        </section>
    )
}
