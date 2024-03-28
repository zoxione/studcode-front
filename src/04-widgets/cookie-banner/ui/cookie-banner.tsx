"use client"

import { CookieIcon } from "lucide-react"
import { useState, useEffect } from "react"

import { Button } from "@/01-shared/ui/button"
import { cn } from "@/01-shared/utils/cn"

interface CookieBannerProps {}

const CookieBanner = ({ ...props }: CookieBannerProps) => {
  const [open, setOpen] = useState(false)
  const [hide, setHide] = useState(false)

  const handleAccept = () => {
    setOpen(false)
    localStorage.setItem("cookie-accept", "true")
    setTimeout(() => {
      setHide(true)
    }, 700)
  }

  useEffect(() => {
    setOpen(true)
    if (localStorage.getItem("cookie-accept") === "true") {
      setOpen(false)
      setTimeout(() => {
        setHide(true)
      }, 700)
    }
  }, [])

  return (
    <div
      className={cn(
        "fixed z-[200] bottom-0 sm:right-4 sm:bottom-4 w-full sm:max-w-sm transition-transform duration-700",
        !open
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden",
      )}
      {...props}
    >
      <div className="bg-background border border-border rounded-md m-2">
        <div className="grid gap-2 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-medium">Мы используем cookie</h1>
            <CookieIcon className="h-5 w-5" />
          </div>
          <div className="">
            <p className="text-sm">
              Мы используем файлы cookie для улучшения вашего опыта. Продолжая посещать этот сайт, вы соглашаетесь с
              использованием нами файлов cookie.
            </p>
          </div>
          <div className="">
            <Button onClick={handleAccept} className="w-full">
              Принять
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CookieBanner }
