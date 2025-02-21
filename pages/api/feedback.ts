import { NextRequest, NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(req: NextRequest) {
  const { input, feedback } = await req.json()

  try {
    // Save feedback to the database
    const result = await prisma.feedback.create({
      data: {
        input,
        feedback,
      },
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    console.error("Error saving feedback:", error)
    return NextResponse.json({ message: "Failed to save feedback" }, { status: 500 })
  }
}