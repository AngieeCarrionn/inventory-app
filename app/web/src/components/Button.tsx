type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ children, ...props }: Props) {
    return (
        <button
            {...props}
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
            {children}
        </button>
    );
}
