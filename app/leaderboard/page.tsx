import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Coins } from "lucide-react"

const leaderboardData = [
  { id: 1, name: "Akshay", coins: 120, badges: ["Quick Learner", "Engagement Expert"] },
  { id: 2, name: "Priya", coins: 115, badges: ["Tech Savvy", "Classroom Pro"] },
  { id: 3, name: "Aditi", coins: 100, badges: ["Engagement Expert"] },
  { id: 4, name: "Vijay", coins: 95, badges: ["Quick Learner"] },
  { id: 5, name: "Arjun", coins: 90, badges: ["Tech Savvy"] },
]

export default function Leaderboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Leaderboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Coins</TableHead>
            <TableHead>Badges</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((teacher, index) => (
            <TableRow key={teacher.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{teacher.name}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Coins className="mr-2" />
                  {teacher.coins}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {teacher.badges.map((badge, badgeIndex) => (
                    <Badge key={badgeIndex}>{badge}</Badge>
                  ))}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

