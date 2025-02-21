import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins } from "lucide-react"

export default function UserProfile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>John Doe</CardTitle>
          <CardDescription>Mathematics Teacher</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Progress</h3>
            <Progress value={60} className="mb-2" />
            <p>Modules Completed: 3/5</p>
            <p>Quizzes Completed: 7/15</p>
            <p>Average Quiz Score: 85%</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Rewards</h3>
            <div className="flex items-center">
              <Coins className="mr-2" />
              <span className="font-bold">Total Coins: 80</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Badges Earned</h3>
            <div className="flex gap-2">
              <Badge>Quick Learner</Badge>
              <Badge>Engagement Expert</Badge>
              <Badge>Tech Savvy</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

