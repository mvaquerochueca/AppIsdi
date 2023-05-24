import { context } from '../ui'
import updatePost from '../logic/updatePosts'
import retrievePost from '../logic/retrievePost'
import './Modal.css'

export default function EditPostModal({ onCancel, onPostUpdated, postId }) {
    console.log('EditPostModal -> render')

    function handleCancel(event) {
        event.preventDefault()

        onCancel()
    }

    function handleUpdatePost(event) {
        event.preventDefault()

        const image = event.target.image.value
        const text = event.target.text.value

        try {
            updatePost(context.userId, postId, image, text)

            onPostUpdated()
        } catch (error) {
            alert(error.message)
        }
    }

    try {
        const { image, text } = retrievePost(context.userId, postId)

        return (
            <section className="edit-post container">
                <form className="modal-edit-post" onSubmit={handleUpdatePost}>
                    <h3>Update Post</h3>
                    <input
                        type="url"
                        name="image"
                        id="image"
                        placeholder="Image Url"
                        defaultValue={image}
                    />

                    <textarea
                        className="input"
                        name="text"
                        cols="30"
                        rows="10"
                        placeholder="text"
                        defaultValue={text}
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
                </form>
            </section>
        )
    } catch (error) {
        alert(error.message)

        return null
    }
}
