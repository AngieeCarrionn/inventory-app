import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    isLoading?: boolean;
    children: ReactNode;
}

export function Button({
    variant = "primary",
    isLoading = false,
    disabled,
    children,
    ...props
}: ButtonProps) {
    const baseClass =
        "px-4 py-2 rounded font-medium transition disabled:opacity-50";

    const variants = {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
        danger: "bg-red-600 text-white hover:bg-red-700",
    };

    return (
        <button
            className={`${baseClass} ${variants[variant]}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? "Cargando..." : children}
        </button>
    );
}
