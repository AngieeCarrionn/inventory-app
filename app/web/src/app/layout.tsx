import "./globals.css";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-[#F6F7E6] min-h-screen flex items-center justify-center">
                {children}
            </body>
        </html>
    );
}
