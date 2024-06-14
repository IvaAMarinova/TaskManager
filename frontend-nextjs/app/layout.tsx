export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en" className="bg-red-700" >
        <body>
            <header className="bg-blue-500 text-white text-center p-4">
                <h1>Task Manager</h1>
            </header>
          {/* Layout UI */}
          <main>{children}</main>
        </body>
      </html>
    )
  }