import "../styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-pink-200" >
      <body>
          <header className="bg-pink-300 text-pink-900 text-center p-4 font-bold">
              <h1 className="text-3xl font-light">Task Manager</h1>
          </header>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}