import './Form.css'

export default function Form({ children, ...props }) {
    return (
        <form className="flex flex-col gap-5 " {...props}>
            {children}
        </form>
    )
}
