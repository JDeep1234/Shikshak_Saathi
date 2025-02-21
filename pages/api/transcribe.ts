import { NextRequest, NextResponse } from "next/server"
import { SpeechClient } from "@google-cloud/speech"

const speechClient = new SpeechClient()

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file) {
    return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
  }

  try {
    const audioBytes = Buffer.from(await file.arrayBuffer()).toString("base64")

    // Detect the language of the audio (optional, if language is not provided)
    const [languageDetection] = await speechClient.recognize({
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        languageCode: "en-IN", // Default to Indian English
        alternativeLanguageCodes: ["hi-IN", "bn-IN", "ta-IN", "te-IN", "mr-IN"], // Add more languages as needed
      },
    })

    // Use the detected language for transcription
    const detectedLanguage = languageDetection.results[0].languageCode

    const [transcriptionResponse] = await speechClient.recognize({
      audio: {
        content: audioBytes,
      },
      config: {
        encoding: "WEBM_OPUS",
        sampleRateHertz: 48000,
        languageCode: detectedLanguage, // Use the detected language
      },
    })

    const transcription = transcriptionResponse.results
      .map((result) => result.alternatives[0].transcript)
      .join("\n")

    return NextResponse.json({ transcription, language: detectedLanguage }, { status: 200 })
  } catch (error) {
    console.error("Error transcribing audio:", error)
    return NextResponse.json({ error: "Failed to transcribe audio" }, { status: 500 })
  }
}