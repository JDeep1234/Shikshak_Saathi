"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Shikshak_Saathi
        </Link>
        {/* Hamburger Menu Button (Visible on Mobile) */}
        <button className="md:hidden" onClick={toggleNav}>
          {isNavOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {/* Navbar (Visible on All Screens) */}
        <nav className={`${isNavOpen ? "block" : "hidden"} md:flex md:space-x-4 absolute md:static top-16 left-0 w-full md:w-auto bg-white shadow-md md:shadow-none p-4 md:p-0`}>
          <Link href="/" className="block text-gray-600 hover:text-blue-600 py-2 md:py-0">
            Home
          </Link>
          <Link href="/ai-feedback" className="block text-gray-600 hover:text-blue-600 py-2 md:py-0">
            AI Feedback
          </Link>
          <Link href="/training-hub" className="block text-gray-600 hover:text-blue-600 py-2 md:py-0">
            Training Hub
          </Link>
          <Link href="/insights" className="block text-gray-600 hover:text-blue-600 py-2 md:py-0">
            Insights
          </Link>
          <Link href="/leaderboard" className="block text-gray-600 hover:text-blue-600 py-2 md:py-0">
            Leaderboard
          </Link>
          <Link href="/profile" className="block text-gray-600 hover:text-blue-600 py-2 md:py-0">
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
  );
}
