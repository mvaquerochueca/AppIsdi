export default function petitionApiQuote(callback) {
    var xhr = new XMLHttpRequest()

    xhr.onload = () => {
        const { content, author } = JSON.parse(xhr.responseText)
        callback(null, content, author)
    }

    xhr.onerror = () => {
        callback(new Error('connection error'))
    }

    xhr.open('GET', 'https://api.quotable.io/random')
    xhr.send()
}
