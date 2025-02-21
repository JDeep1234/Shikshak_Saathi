import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          TeacherPD
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
          <Link href="/ai-feedback" className="text-gray-600 hover:text-blue-600">
            AI Feedback
          </Link>
          <Link href="/training-hub" className="text-gray-600 hover:text-blue-600">
            Training Hub
          </Link>
          <Link href="/insights" className="text-gray-600 hover:text-blue-600">
            Insights
          </Link>
          <Link href="/leaderboard" className="text-gray-600 hover:text-blue-600">
            Leaderboard
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-blue-600">
            Profile
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Select>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">Hindi</SelectItem>
              <SelectItem value="ta">Tamil</SelectItem>
              <SelectItem value="bn">Bengali</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/start-training">Start Training</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

