"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"

const trainingModules = [
  {
    id: 1,
    title: "Classroom Management",
    submodules: [
      { id: 1, title: "Setting Expectations", completed: false },
      { id: 2, title: "Positive Reinforcement", completed: false },
    ],
  },
  // ... (add more modules as needed)
]

interface QuizScore {
  moduleId: number
  submoduleId: number
  score: number
}

export default function TrainingHub() {
  const [modules, setModules] = useState(trainingModules)
  const [quizScores, setQuizScores] = useState<QuizScore[]>([])

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("quizScores") || "[]")
    setQuizScores(storedScores)
  }, [])

  const calculateProgress = (module) => {
    const moduleScores = quizScores.filter((score) => score.moduleId === module.id)
    const completedSubmodules = moduleScores.length
    return (completedSubmodules / module.submodules.length) * 100
  }

  const getLatestScore = (moduleId) => {
    const moduleScores = quizScores.filter((score) => score.moduleId === moduleId)
    if (moduleScores.length === 0) return null
    return moduleScores[moduleScores.length - 1].score
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Training Hub</h1>
        <div className="flex items-center">
          <Coins className="mr-2" />
          <span className="font-bold">Total Points: {quizScores.reduce((sum, score) => sum + score.score, 0)}</span>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {modules.map((module) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle>{module.title}</CardTitle>
              <CardDescription>Enhance your teaching skills</CardDescription>
            </CardHeader>
            <CardContent>
              <Progress value={calculateProgress(module)} className="mb-2" />
              <p>{calculateProgress(module).toFixed(0)}% Complete</p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Submodules:</h4>
                <ul className="space-y-2">
                  {module.submodules.map((submodule) => (
                    <li key={submodule.id} className="flex justify-between items-center">
                      <span>{submodule.title}</span>
                      <Badge
                        variant={
                          quizScores.some((score) => score.moduleId === module.id && score.submoduleId === submodule.id)
                            ? "default"
                            : "secondary"
                        }
                      >
                        {quizScores.some((score) => score.moduleId === module.id && score.submoduleId === submodule.id)
                          ? "Completed"
                          : "Not Started"}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
              {getLatestScore(module.id) !== null && (
                <p className="mt-4">Latest Score: {getLatestScore(module.id)} / 5</p>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button asChild>
                <Link href={`/start-training/${module.id}`}>
                  {calculateProgress(module) === 100 ? "Review" : "Continue"}
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

