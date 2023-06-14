// import retrieveUser from '../logic/retrieveUser'
// import retrievePost from '../logic/retrievePost'
// import { context } from '../ui'
// import { useState, useEffect } from 'react'

// export default function SavedPost() {
//     // const [user, setUser] = useState(null)
//     // const [posts, setPosts] = useState([])

//     // useEffect(() => {
//     //     try {
//     //         retrieveUser(context.userId, (error, user) => {
//     //             if (error) {
//     //                 alert(error.message)
//     //                 return
//     //             }

//     //             setUser(user)
//     //         })
//     //     } catch (error) {
//     //         alert(error.message)
//     //     }
//     // }, [])

//     // useEffect(() => {
//     //     if (user) {
//     //         try {
//     //             // Obtener los posts guardados en el array favs del usuario
//     //             retrievePost(user.favs, (error, posts) => {
//     //                 if (error) {
//     //                     alert(error.message)
//     //                     return
//     //                 }

//     //                 setPosts(posts)
//     //             })
//     //         } catch (error) {
//     //             alert(error.message)
//     //         }
//     //     }
//     // }, [user])

//     // const handleComparePosts = (postId) => {
//     //     if (user.favs.includes(postId)) {
//     //         // El post está guardado en los favoritos del usuario
//     //         // Aquí puedes agregar la lógica adicional que necesites
//     //     }
//     // }

//     return (
//         <section className="z-20">
//             {posts.map((post) => (
//                 <div key={post.id} className="saved-post-item">
//                     {/* Renderizar la información del post */}
//                     <img src={post.image} alt="Post" />
//                     <h1>{post.title}</h1>
//                     <p>{post.text}</p>
//                     <button onClick={() => handleComparePosts(post.id)}>
//                         Comparar
//                     </button>
//                 </div>
//             ))}
//         </section>
//     )
// }
