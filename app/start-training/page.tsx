"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins, BookOpen, CheckCircle } from "lucide-react"

const placeholderModules = [
  { id: 1, title: "Introduction to Effective Teaching", duration: "15 mins", coins: 5 },
  { id: 2, title: "Classroom Management Basics", duration: "20 mins", coins: 7 },
  { id: 3, title: "Engaging Students in Learning", duration: "25 mins", coins: 10 },
]

export default function StartTraining() {
  const [currentModule, setCurrentModule] = useState(0)
  const [progress, setProgress] = useState(0)

  const handleStartModule = () => {
    // Simulate starting a module
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return prevProgress + 10
      })
    }, 1000)
  }

  const handleNextModule = () => {
    if (currentModule < placeholderModules.length - 1) {
      setCurrentModule(currentModule + 1)
      setProgress(0)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Start Training</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Module</CardTitle>
            <CardDescription>{placeholderModules[currentModule].title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center">
                <BookOpen className="mr-2" />
                {placeholderModules[currentModule].duration}
              </span>
              <span className="flex items-center">
                <Coins className="mr-2" />
                {placeholderModules[currentModule].coins} coins
              </span>
            </div>
            <Progress value={progress} className="mb-2" />
            <p>{progress}% Complete</p>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartModule} disabled={progress > 0 && progress < 100}>
              {progress === 0 ? "Start Module" : progress === 100 ? "Completed" : "In Progress"}
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Training Overview</CardTitle>
            <CardDescription>Your progress through the training modules</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {placeholderModules.map((module, index) => (
                <li key={module.id} className="flex items-center justify-between">
                  <span className="flex items-center">
                    {index < currentModule ? (
                      <CheckCircle className="mr-2 text-green-500" />
                    ) : index === currentModule ? (
                      <BookOpen className="mr-2 text-blue-500" />
                    ) : (
                      <BookOpen className="mr-2 text-gray-300" />
                    )}
                    {module.title}
                  </span>
                  <Badge variant={index <= currentModule ? "default" : "secondary"}>
                    {index < currentModule ? "Completed" : index === currentModule ? "In Progress" : "Not Started"}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleNextModule}
              disabled={currentModule >= placeholderModules.length - 1 || progress < 100}
            >
              Next Module
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

