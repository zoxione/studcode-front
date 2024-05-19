"use client"

import { useEffect } from "react"

interface UmamiSendProps {
  projectId: string
  userId: string
}

const UmamiSend = ({ projectId, userId }: UmamiSendProps) => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return
    }
    ;(async () => {
      fetch(`${process.env.UMAMI_URL}/api/send/`, {
        method: "POST",
        headers: {
          "User-Agent": navigator.userAgent,
        },
        body: JSON.stringify({
          payload: {
            hostname: window.location.hostname,
            language: navigator.language,
            referrer: document.referrer,
            screen: `${window.screen.width}x${window.screen.height}`,
            title: document.title,
            url: window.location.pathname,
            website: process.env.UMAMI_WEBSITE_ID,
            name: "user-visit-project",
            data: {
              projectId: projectId,
              userId: userId,
              date: Date.now(),
            },
          },
          type: "event",
        }),
      })
    })()
  }, [])

  return null
}

export { UmamiSend }
