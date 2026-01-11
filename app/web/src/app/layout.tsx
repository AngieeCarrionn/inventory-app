import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-[#0D0D30] min-h-screen flex items-center justify-center">
                {children}
            </body>
        </html>
    );
}
