"use client"

import { Toaster } from "@/01-shared/ui/Sonner"
import { AuthDialog } from "@/04-widgets/auth"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { useSearchParams } from "next/navigation"
import { ReactNode } from "react"

interface IProviders {
  children: ReactNode
}

const Providers = ({ children }: IProviders) => {
  // const searchParams = useSearchParams()
  // const modal = searchParams.get("modal")

  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-center" richColors closeButton />
        {children}
        {/* {modal?.includes("auth") ? <AuthDialog /> : null} */}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers
