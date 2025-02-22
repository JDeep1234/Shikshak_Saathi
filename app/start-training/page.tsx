"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Coins, BookOpen, CheckCircle, FileText } from "lucide-react"

const placeholderModules = [
  { 
    id: 1, 
    title: "Introduction to Effective Teaching", 
    duration: "20 mins", 
    coins: 5, 
    pdfLink: "https://www.prodigygame.com/main-en/blog/teaching-strategies/",
    isComplete: false
  },
  { 
    id: 2, 
    title: "Classroom Management Basics", 
    duration: "20 mins", 
    coins: 7, 
    pdfLink: "https://www.prodigygame.com/main-en/blog/classroom-management-strategies/",
    isComplete: false
  },
  { 
    id: 3, 
    title: "Engaging Students in Learning", 
    duration: "25 mins", 
    coins: 10, 
    pdfLink: "https://lms.pdesas.org/content/courses/FFT/04/courses/PD9365/media/ebook/ebook.pdf",
    isComplete: false
  },
]

export default function StartTraining() {
  const [modules, setModules] = useState(placeholderModules)
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0)

  const toggleCompletion = () => {
    const updatedModules = [...modules]
    updatedModules[currentModuleIndex].isComplete = !updatedModules[currentModuleIndex].isComplete
    setModules(updatedModules)
  }

  const nextModule = () => {
    if (currentModuleIndex < modules.length - 1) {
      setCurrentModuleIndex(currentModuleIndex + 1)
    }
  }

  const currentModule = modules[currentModuleIndex]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Start Training</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Current Module Card */}
        <Card>
          <CardHeader>
            <CardTitle>Current Module</CardTitle>
            <CardDescription>{currentModule.title}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="flex items-center">
                <BookOpen className="mr-2" />
                {currentModule.duration}
              </span>
              <span className="flex items-center">
                <Coins className="mr-2" />
                {currentModule.coins} coins
              </span>
            </div>
            <Progress value={currentModule.isComplete ? 100 : 0} className="mb-2" />
            <p>{currentModule.isComplete ? "Completed" : "Not Completed"}</p>
            <div className="mt-4">
              <a href={currentModule.pdfLink} target="_blank" className="text-blue-500">
                <FileText className="inline-block mr-2" />
                Read the PDF for this module
              </a>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={toggleCompletion} className="w-full">
              {currentModule.isComplete ? "Mark as Not Complete" : "Mark as Complete"}
            </Button>
          </CardFooter>
        </Card>

        {/* Training Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Training Overview</CardTitle>
            <CardDescription>Your progress through the training modules</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {modules.map((module, index) => (
                <li key={module.id} className="flex items-center justify-between">
                  <span className="flex items-center">
                    {module.isComplete ? (
                      <CheckCircle className="mr-2 text-green-500" />
                    ) : (
                      <BookOpen className="mr-2 text-blue-500" />
                    )}
                    {module.title}
                  </span>
                  <Badge variant={module.isComplete ? "default" : "secondary"}>
                    {module.isComplete ? "Completed" : "Not Completed"}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              onClick={nextModule}
              disabled={currentModuleIndex >= modules.length - 1 || !currentModule.isComplete}
              className="w-full"
            >
              Next Module
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
