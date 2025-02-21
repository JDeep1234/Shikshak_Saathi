"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

const moduleCompletionData = [
  { name: "Module 1", completed: 65 },
  { name: "Module 2", completed: 59 },
  { name: "Module 3", completed: 80 },
  { name: "Module 4", completed: 55 },
]

const quizScoresData = [
  { name: "Quiz 1", score: 85 },
  { name: "Quiz 2", score: 92 },
  { name: "Quiz 3", score: 78 },
  { name: "Quiz 4", score: 88 },
]

const teacherData = [
  { id: 1, name: "John Doe", modulesCompleted: 3, avgQuizScore: 85, coins: 80 },
  { id: 2, name: "Jane Smith", modulesCompleted: 4, avgQuizScore: 92, coins: 95 },
  { id: 3, name: "Bob Johnson", modulesCompleted: 2, avgQuizScore: 78, coins: 60 },
]

const engagementData = [
  { name: "Daily Active", value: 75 },
  { name: "Weekly Active", value: 15 },
  { name: "Monthly Active", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export default function InsightsDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Insights Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Module Completion</CardTitle>
            <CardDescription>Percentage of teachers who completed each module</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={moduleCompletionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="completed" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quiz Scores</CardTitle>
            <CardDescription>Average scores for each quiz</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={quizScoresData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Teacher Performance</CardTitle>
          <CardDescription>Overview of individual teacher progress</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Modules Completed</TableHead>
                <TableHead>Avg. Quiz Score</TableHead>
                <TableHead>Coins Earned</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teacherData.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell>{teacher.name}</TableCell>
                  <TableCell>{teacher.modulesCompleted}</TableCell>
                  <TableCell>{teacher.avgQuizScore}%</TableCell>
                  <TableCell>{teacher.coins}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Teacher Engagement</CardTitle>
          <CardDescription>Distribution of teacher activity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

