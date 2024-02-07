"use client"

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { ReactNode } from "react"
import { toast } from "sonner"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { Toaster } from "@/01-shared/ui/Sonner"

interface IProviders {
  children: ReactNode
}

const Providers = ({ children }: IProviders) => {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        if (query.meta?.slug === "auth-user-whoami-query") {
          return
        }
        toast.error(`Произошла ошибка: ${error.message}`)
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, query) => {
        toast.error(`Произошла ошибка: ${error.message}`)
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster position="top-center" richColors closeButton />
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default Providers
