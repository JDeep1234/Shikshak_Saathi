"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import QuizComponent from "@/components/quiz-component"

const placeholderModules = [
  {
    id: 1,
    title: "Classroom Management",
    submodules: [
      {
        id: 1,
        title: "Setting Expectations",
        content: `Setting clear expectations is crucial for effective classroom management. Here are key points to consider:

1. Establish rules early: Set clear rules and procedures at the beginning of the school year.
2. Be consistent: Apply rules consistently to all students.
3. Involve students: Allow students to participate in creating classroom rules.
4. Positive framing: Frame expectations in a positive manner.
5. Regular reminders: Consistently remind students of expectations throughout the year.`,
        questions: [
          {
            id: 1,
            question: "What is the best time to set classroom expectations?",
            options: ["First day of school", "After the first week", "When problems arise", "End of the semester"],
            correctAnswer: 0,
          },
          {
            id: 2,
            question: "Why is it important to involve students in creating classroom rules?",
            options: [
              "It saves the teacher time",
              "It increases student buy-in and compliance",
              "It's a school requirement",
              "It makes the rules more complex",
            ],
            correctAnswer: 1,
          },
          {
            id: 3,
            question: "How should expectations be framed?",
            options: ["Negatively", "Positively", "Neutrally", "It doesn't matter"],
            correctAnswer: 1,
          },
          {
            id: 4,
            question: "How often should students be reminded of classroom expectations?",
            options: ["Only on the first day", "Weekly", "When they misbehave", "Consistently throughout the year"],
            correctAnswer: 3,
          },
          {
            id: 5,
            question: "What is a key aspect of implementing classroom rules?",
            options: [
              "Changing them frequently",
              "Applying them inconsistently",
              "Being consistent with all students",
              "Only enforcing them sometimes",
            ],
            correctAnswer: 2,
          },
        ],
      },
      {
        id: 2,
        title: "Positive Reinforcement",
        content: `Positive reinforcement is a powerful tool in classroom management. Key aspects include:

1. Immediate feedback: Provide immediate positive feedback for desired behaviors.
2. Specific praise: Be specific about what the student did well.
3. Variety of rewards: Use a mix of verbal praise, privileges, and tangible rewards.
4. Consistency: Consistently reinforce positive behaviors.
5. Age-appropriate: Tailor reinforcement strategies to the age group you're teaching.`,
        questions: [
          {
            id: 1,
            question: "Which of the following is an example of positive reinforcement?",
            options: ["Giving extra homework", "Praising good behavior", "Ignoring misbehavior", "Removing privileges"],
            correctAnswer: 1,
          },
          {
            id: 2,
            question: "Why is immediate feedback important in positive reinforcement?",
            options: [
              "It saves time",
              "It clearly links the behavior to the reward",
              "It's easier for the teacher",
              "It's not important",
            ],
            correctAnswer: 1,
          },
          {
            id: 3,
            question: "What type of praise is most effective?",
            options: ["General praise", "Specific praise", "No praise", "Delayed praise"],
            correctAnswer: 1,
          },
          {
            id: 4,
            question: "Why is it important to use a variety of rewards?",
            options: [
              "To confuse students",
              "To save money",
              "To maintain student interest and motivation",
              "It's not important",
            ],
            correctAnswer: 2,
          },
          {
            id: 5,
            question: "How should reinforcement strategies be tailored?",
            options: [
              "One size fits all",
              "Based on teacher preference",
              "According to school policy",
              "Age-appropriate for the students",
            ],
            correctAnswer: 3,
          },
        ],
      },
    ],
  },
]

export default function StartTraining() {
  const params = useParams()
  const router = useRouter()
  const moduleId = Number.parseInt(params.moduleId as string)
  const [currentModule, setCurrentModule] = useState(placeholderModules.find((m) => m.id === moduleId))
  const [currentSubmodule, setCurrentSubmodule] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showContent, setShowContent] = useState(true)
  const [showQuiz, setShowQuiz] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [submoduleCompleted, setSubmoduleCompleted] = useState(false)

  useEffect(() => {
    setCurrentModule(placeholderModules.find((m) => m.id === moduleId))
  }, [moduleId])

  const handleStartQuiz = () => {
    setShowContent(false)
    setShowQuiz(true)
  }

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(score + 1)
    }

    if (currentQuestion < 4) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowQuiz(false)
      setShowResults(true)
      setSubmoduleCompleted(true)
      // Update localStorage with the new score
      const currentScores = JSON.parse(localStorage.getItem("quizScores") || "[]")
      currentScores.push({ moduleId, submoduleId: currentSubmodule + 1, score: score + (isCorrect ? 1 : 0) })
      localStorage.setItem("quizScores", JSON.stringify(currentScores))
    }
  }

  const handleNextSubmodule = () => {
    if (currentSubmodule < currentModule.submodules.length - 1) {
      setCurrentSubmodule(currentSubmodule + 1)
      setCurrentQuestion(0)
      setScore(0)
      setShowContent(true)
      setShowResults(false)
      setSubmoduleCompleted(false)
    } else {
      handleFinish()
    }
  }

  const handleFinish = () => {
    router.push(`/insights?moduleId=${moduleId}`)
  }

  const handleViewContent = () => {
    setShowContent(true)
    setShowQuiz(false)
    setShowResults(false)
  }

  if (!currentModule) return <div>Module not found</div>

  const currentSubmoduleContent = currentModule.submodules[currentSubmodule]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{currentModule.title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{currentSubmoduleContent.title}</CardTitle>
          <CardDescription>
            Submodule {currentSubmodule + 1} of {currentModule.submodules.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {showContent && (
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentSubmoduleContent.content.replace(/\n/g, "<br>") }} />
              <Button onClick={handleStartQuiz} className="mt-4">
                Start Quiz
              </Button>
            </div>
          )}
          {showQuiz && (
            <QuizComponent question={currentSubmoduleContent.questions[currentQuestion]} onAnswer={handleAnswer} />
          )}
          {showResults && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Quiz Results</h3>
              <p>You scored {score} out of 5</p>
              <Button onClick={handleNextSubmodule} className="mt-4 mr-2">
                {currentSubmodule < currentModule.submodules.length - 1 ? "Next Submodule" : "Finish Module"}
              </Button>
              <Button onClick={handleViewContent} variant="outline">
                View Content
              </Button>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Progress
            value={(currentSubmodule * 100 + (submoduleCompleted ? 100 : 0)) / currentModule.submodules.length}
            className="w-full"
          />
        </CardFooter>
      </Card>
    </div>
  )
}

