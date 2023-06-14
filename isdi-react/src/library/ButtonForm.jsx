export default function Button({ children, className, ...props }) {
    return (
        <button
            className={`text-white bg-blue-700 
             hover:bg-blue-800 focus:ring-4
              focus:ring-blue-300 font-medium rounded-lg 
              text-sm px-2 py-2.5 mr-14 ml-14 mb-1
               dark:bg-blue-600 dark:hover:bg-blue-700 
               focus:outline-none dark:focus:ring-blue-800" 
               ${className ? className : ''}`}
            {...props}
        >
            {children}
        </button>
    )
}
