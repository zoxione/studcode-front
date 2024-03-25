import { ReactNode } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/01-shared/ui/card"
import { Footer } from "@/04-widgets/footer"
import { Header } from "@/04-widgets/header"
import { Layout } from "@/04-widgets/layout"

interface LayoutPageProps {
  children: ReactNode
}

export default async function LayoutPage({ children }: LayoutPageProps) {
  return (
    <Layout header={<Header />} footer={<Footer />} className="flex justify-center items-center py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl">Правила</CardTitle>
          <CardDescription>Студенческий Код</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Layout>
  )
}
