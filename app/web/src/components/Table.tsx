export function Table({ children }: { children: React.ReactNode }) {
    return (
        <table className="w-full border border-gray-200">
            {children}
        </table>
    );
}
