import { ReactNode } from "react";

export interface Column<T> {
    header: string;
    accessor: keyof T;
    render?: (value: any, row: T) => ReactNode;
}

interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    emptyMessage?: string;
}

export function Table<T>({
    columns,
    data,
    emptyMessage = "No hay datos",
}: TableProps<T>) {
    if (data.length === 0) {
        return <p>{emptyMessage}</p>;
    }

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    {columns.map((col) => (
                        <th
                            key={String(col.accessor)}
                            className="border-b px-4 py-2 text-left"
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((col) => {
                            const value = row[col.accessor];

                            return (
                                <td
                                    key={String(col.accessor)}
                                    className="border-b px-4 py-2"
                                >
                                    {col.render ? col.render(value, row) : String(value)}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
