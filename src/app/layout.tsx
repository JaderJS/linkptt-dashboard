import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Provider from "@/provider/provider"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LinkPTT",
  description: "LinkPTT",
}

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Provider>
      </body>
      <Toaster />
    </html>
  )
}
