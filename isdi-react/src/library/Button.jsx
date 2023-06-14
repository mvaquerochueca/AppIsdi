export default function ButtonLogout({ props, children }) {
    return (
        <button
            className={`bg-blue-500  text-white border-cyan-300 rounded-md mt px-2 text-lg shadow-md ${
                className ? className : ''
            }`}
            {...props}
        >
            {children}
        </button>
    )
}
