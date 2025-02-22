"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface QuizComponentProps {
  question: {
    id: number
    question: string
    options: string[]
    correctAnswer: number
  }
  onAnswer: (isCorrect: boolean) => void
}

export default function QuizComponent({ question, onAnswer }: QuizComponentProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showSolution, setShowSolution] = useState(false)

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowSolution(true)
    }
  }

  const handleNext = () => {
    onAnswer(selectedAnswer === question.correctAnswer)
    setSelectedAnswer(null)
    setShowSolution(false)
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
      <RadioGroup onValueChange={(value) => setSelectedAnswer(Number.parseInt(value))} className="mb-4">
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
      {!showSolution ? (
        <Button onClick={handleSubmit} disabled={selectedAnswer === null}>
          Submit Answer
        </Button>
      ) : (
        <div>
          <p className={selectedAnswer === question.correctAnswer ? "text-green-600" : "text-red-600"}>
            {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect."}
          </p>
          <p>The correct answer is: {question.options[question.correctAnswer]}</p>
          <Button onClick={handleNext} className="mt-4">
            Next Question
          </Button>
        </div>
      )}
    </div>
  )
}

