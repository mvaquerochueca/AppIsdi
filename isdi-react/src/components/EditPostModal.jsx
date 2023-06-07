import { context } from '../ui'
import updatePost from '../logic/updatePosts'
import retrievePost from '../logic/retrievePost'
import { useState, useEffect } from 'react'
import './Modal.css'
import Container from '../library/Container'
import Form from '../library/Form'

export default function EditPostModal({ onCancel, onPostUpdated, postId }) {
    const [post, setPost] = useState(null)

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleUpdatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost(context.userId, postId, image, text, (error) => {
                if (error) {
                    alert(error.message)

                    return
                }
                onPostUpdated()
                handleCancel(event)
            })
        } catch (error) {
            alert(error.message)
        }
    }

    useEffect(() => {
        try {
            retrievePost(context.userId, postId, (error, post) => {
                if (error) {
                    alert(error.message)

                    return
                }

                setPost(post)
            })
        } catch (error) {
            alert(error.message)
        }
    }, [])

    console.debug('EditPostModal -> render')
    console.debug('EditPostModal -> render')

    return (
        <>
            {post && (
                <Container tag="section" className="add-post ">
                    <Form
                        tag="form"
                        className="modal-add-post"
                        onSubmit={handleUpdatePost}
                    >
                        <h3>Update Post</h3>

                        <input
                            type="url"
                            name="image"
                            id="image"
                            defaultValue={post.image}
                            placeholder="Image URL"
                        />

                        <textarea
                            className="input"
                            name="text"
                            cols="30"
                            rows="10"
                            defaultValue={post.text}
                            placeholder="Text"
                        ></textarea>
                        <div>
                            <button className="button-create" type="submit">
                                Update
                            </button>
                            <button
                                className="button cancel"
                                type="button"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </Form>
                </Container>
            )}
        </>
    )
}
