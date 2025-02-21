import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, MessageCircle, BarChart } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Empower Your Teaching with AI</h1>
        <p className="text-xl mb-8">
          Get personalized feedback, access training modules, and gain valuable insights to enhance your teaching
          skills.
        </p>
        <Button size="lg" asChild>
          <Link href="/ai-feedback">Get AI Feedback Now</Link>
        </Button>
      </section>

      <section className="grid md:grid-cols-3 gap-8 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="mr-2" />
              AI-Powered Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Receive instant, personalized feedback on your teaching methods and classroom interactions.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2" />
              Training Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Access a wide range of interactive training modules to enhance your professional skills.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart className="mr-2" />
              Insights Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track your progress and gain valuable insights into your teaching performance.
            </CardDescription>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

