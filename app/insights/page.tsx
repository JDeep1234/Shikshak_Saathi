"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface QuizScore {
  moduleId: number
  submoduleId: number
  score: number
}

export default function InsightsDashboard() {
  const searchParams = useSearchParams()
  const moduleId = Number.parseInt(searchParams.get("moduleId") || "0")
  const [quizScores, setQuizScores] = useState<QuizScore[]>([])

  useEffect(() => {
    const storedScores = JSON.parse(localStorage.getItem("quizScores") || "[]")
    setQuizScores(storedScores)
  }, [])

  const moduleScores = quizScores.filter((score) => score.moduleId === moduleId)
  const totalScore = moduleScores.reduce((sum, score) => sum + score.score, 0)

  const chartData = moduleScores.map((score) => ({
    name: `Submodule ${score.submoduleId}`,
    score: score.score,
  }))

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Module Insights</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Module {moduleId} Results</CardTitle>
          <CardDescription>Your performance across all submodules</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold mb-4">Total Score: {totalScore}</p>
          <p>Great job! You've completed the module. Here's how you performed in each submodule:</p>
          <ul className="list-disc list-inside mt-4">
            {moduleScores.map((score, index) => (
              <li key={index}>
                Submodule {score.submoduleId}: {score.score} out of 5
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Performance by Submodule</CardTitle>
          <CardDescription>Your scores across different submodules</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

