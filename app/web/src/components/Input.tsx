type Props = React.InputHTMLAttributes<HTMLInputElement>;

export function Input(props: Props) {
    return (
        <input
            {...props}
            className="border px-2 py-1 rounded w-full"
        />
    );
}
