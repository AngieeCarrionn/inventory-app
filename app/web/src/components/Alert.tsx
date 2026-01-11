"use client";

type AlertProps = {
    message: string;
    type?: "error" | "success" | "warning" | "info";
    onClose?: () => void;
};

export function Alert({
    message,
    type = "error",
    onClose,
}: AlertProps) {
    const styles = {
        error: "bg-red-100 border-red-300 text-red-700",
        success: "bg-green-100 border-green-300 text-green-700",
        warning: "bg-yellow-100 border-yellow-300 text-yellow-700",
        info: "bg-blue-100 border-blue-300 text-blue-700",
    };

    return (
        <div
            className={`mb-4 flex items-start justify-between gap-4 rounded-xl border px-4 py-3 ${styles[type]}`}
        >
            <div className="text-sm">
                {message}
            </div>

            {onClose && (
                <button
                    onClick={onClose}
                    className="text-lg font-bold opacity-60 hover:opacity-100 leading-none"
                    aria-label="Close alert"
                >
                    ×
                </button>
            )}
        </div>
    );
}
