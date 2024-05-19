"use client"

import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "next-themes"
import { ReactNode, Suspense } from "react"
import { toast } from "sonner"

import { Toaster } from "@/01-shared/ui/sonner"
import { DialogProvider } from "./dialog-provider"
import { TooltipProvider } from "@/01-shared/ui/tooltip"

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
        console.log(error)
        toast.error(`Ой! Произошла ошибка.`)
      },
    }),
    mutationCache: new MutationCache({
      onError: (error) => {
        console.log(error)
        toast.error(`Ой! Произошла ошибка.`)
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
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>
            <Toaster position="top-center" richColors closeButton />
            <Suspense>
              <DialogProvider />
            </Suspense>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export { Providers }
