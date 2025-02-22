"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const moduleData = {
  1: {
    title: "Classroom Management",
    description: "Learn effective strategies for managing your classroom",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    quizzes: [
      {
        question: "What is the most effective way to handle disruptive behavior?",
        options: [
          "Ignore it",
          "Immediately send the student out",
          "Address it calmly and privately",
          "Punish the entire class",
        ],
        correctAnswer: 2,
      },
    ],
  },
}

export default function ModuleDetails() {
  const params = useParams()
  const moduleId = params.id as string
  const module = moduleData[moduleId as keyof typeof moduleData]

  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [quizCompleted, setQuizCompleted] = useState(false)

  const handleQuizSubmit = () => {
    if (selectedAnswer === module.quizzes[currentQuiz].correctAnswer) {
      // Handle correct answer
      console.log("Correct answer!")
    } else {
      // Handle incorrect answer
      console.log("Incorrect answer.")
    }
    setQuizCompleted(true)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{module.title}</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Module Content</CardTitle>
          <CardDescription>{module.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{module.content}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Quiz</CardTitle>
          <CardDescription>Test your knowledge</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{module.quizzes[currentQuiz].question}</p>
          <RadioGroup onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))}>
            {module.quizzes[currentQuiz].options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
        <CardFooter>
          <Button onClick={handleQuizSubmit} disabled={selectedAnswer === null || quizCompleted}>
            {quizCompleted ? "Completed" : "Submit Answer"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

