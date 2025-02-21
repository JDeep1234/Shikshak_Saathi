import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"

const trainingModules = [
  { id: 1, title: "Classroom Management", progress: 75, quizzes: 3, coins: 25 },
  { id: 2, title: "Lesson Planning", progress: 100, quizzes: 4, coins: 40 },
  { id: 3, title: "Student Engagement", progress: 0, quizzes: 3, coins: 0 },
  { id: 4, title: "Technology Integration", progress: 50, quizzes: 3, coins: 15 },
]

export default function TrainingHub() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Training Hub</h1>
        <div className="flex items-center">
          <Coins className="mr-2" />
          <span className="font-bold">Total Coins: 80</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {trainingModules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>Enhance your teaching skills</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={module.progress} className="mb-2" />
              <p>{module.progress}% Complete</p>
              <p className="mt-2">Quizzes: {module.quizzes}</p>
              <p>Coins earned: {module.coins}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Badge variant={module.progress === 100 ? "default" : "secondary"}>
                {module.progress === 100 ? "Completed" : "In Progress"}
              </Badge>
              <Button asChild>
                <Link href={`/training-hub/${module.id}`}>{module.progress === 100 ? "Review" : "Continue"}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

