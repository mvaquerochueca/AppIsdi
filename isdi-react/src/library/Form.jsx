import './Form.css'

export default function Form({
    children,
    tag: Tag = 'form',
    className,
    ...props
}) {
    return (
        <Tag className={`Form ${className}`} {...props}>
            {children}
        </Tag>
    )
}
