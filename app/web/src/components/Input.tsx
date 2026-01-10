import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, id, className, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1">
                {label && (
                    <label htmlFor={id} className="text-sm font-medium">
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    id={id}
                    className={`border rounded px-3 py-2 focus:outline-none focus:ring ${error ? "border-red-500" : "border-gray-300"
                        } ${className ?? ""}`}
                    {...props}
                />

                {error && <span className="text-sm text-red-500">{error}</span>}
            </div>
        );
    }
);

Input.displayName = "Input";
