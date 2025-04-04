"use client"  

import React, { useState } from "react"  
import { Button } from "@/components/ui/button"  
import { Textarea } from "@/components/ui/textarea"  
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"  
import { Upload, Download } from "lucide-react"  
import { jsPDF } from "jspdf"  
import Groq from "groq-sdk"  

const { LlamaAI } = require("@meta/llama-ai")  

export default function AIFeedback() {  
  const [textInput, setTextInput] = useState("")  
  const [audioFile, setAudioFile] = useState(null)  
  const [textFeedback, setTextFeedback] = useState("")  
  const [audioFeedback, setAudioFeedback] = useState("")  
  const [isProcessing, setIsProcessing] = useState(false)  

  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })  

  const handleTextSubmit = async (e) => {  
    e.preventDefault()  
    setIsProcessing(true)  

    try {  
      // Fetch feedback using GROQ API  
      const groqCompletion = await groq.chat.completions.create({  
        messages: [  
          {  
            role: "user",  
            content: `Explain the importance of fast language models, based on this input: ${textInput}`,  
          },  
        ],  
        model: "llama-3.3-70b-versatile",  
      });  

      const feedback = groqCompletion.choices[0]?.message?.content || "";  
      setTextFeedback(feedback)  

      // Save feedback to the database  
      await saveFeedback(textInput, feedback, "text")  
    } catch (error) {  
      console.error("Error processing text input:", error)  
      setTextFeedback("An error occurred while processing the text input.")  
    } finally {  
      setIsProcessing(false)  
    }  
  }  

  const handleAudioSubmit = async (e) => {  
    e.preventDefault()  
    if (!audioFile) {  
      alert("Please upload an audio file first.")  
      return  
    }  
    setIsProcessing(true)  

    try {  
      // Step 1: Transcribe the audio  
      const { transcription, language } = await transcribeAudio(audioFile)  

      // Step 2: Get feedback on transcription from GROQ API  
      const prompt = `Analyze the following class recording transcription and provide feedback on the conceptual clarity of the class. Focus on whether the concepts were explained clearly, logically, and in a way that students can understand. The language of the transcription is ${language}:\n\n${transcription}`  
      const groqCompletion = await groq.chat.completions.create({  
        messages: [{ role: 'user', content: prompt }],  
        model: "llama-3.3-70b-versatile",  
      });  

      const feedback = groqCompletion.choices[0]?.message?.content || "";  
      setAudioFeedback(feedback)  

      // Save feedback to the database  
      await saveFeedback(transcription, feedback, "audio")  
    } catch (error) {  
      console.error("Error processing audio input:", error)  
      setAudioFeedback("An error occurred while processing the audio input.")  
    } finally {  
      setIsProcessing(false)  
    }  
  }  

  const transcribeAudio = async (file) => {  
    const formData = new FormData()  
    formData.append("file", file)  

    const response = await fetch("/api/transcribe", {  
      method: "POST",  
      body: formData,  
    })  

    if (!response.ok) {  
      throw new Error("Failed to transcribe audio")  
    }  

    const result = await response.json()  
    return result  
  }  

  const saveFeedback = async (input, feedback, type) => {  
    try {  
      const response = await fetch("/api/feedback", {  
        method: "POST",  
        headers: {  
          "Content-Type": "application/json",  
        },  
        body: JSON.stringify({  
          input: input,  
          feedback: feedback,  
          type: type,  
        }),  
      })  

      if (!response.ok) {  
        throw new Error("Failed to save feedback")  
      }  

      const result = await response.json()  
      console.log("Feedback saved:", result)  
    } catch (error) {  
      console.error("Error saving feedback:", error)  
    }  
  }  

  const downloadPDF = () => {  
    const doc = new jsPDF()  
  
    // Set margins and font  
    const margin = 15  
    const lineHeight = 7  
    const pageWidth = 180 // Adjusted width to fit within A4 page  
    let yPos = margin  
  
    // Add title  
    doc.setFontSize(20)  
    doc.setFont("helvetica", "bold")  
    doc.setTextColor(0, 0, 128) // Dark blue color  
    doc.text("Lesson Plan and AI Feedback", margin, yPos)  
    yPos += lineHeight * 2  
  
    // Add lesson plan content  
    doc.setFontSize(16)  
    doc.setFont("helvetica", "bold")  
    doc.setTextColor(0, 0, 0) // Black color  
    doc.text("Lesson Plan:", margin, yPos)  
    yPos += lineHeight  
  
    doc.setFontSize(12)  
    doc.setFont("helvetica", "normal")  
    const lessonPlanLines = doc.splitTextToSize(textInput, pageWidth)  
    lessonPlanLines.forEach((line) => {  
      // Check if content exceeds page height  
      if (yPos > 280) {  
        doc.addPage() // Add a new page  
        yPos = margin // Reset yPos for the new page  
      }  
      doc.text(line, margin, yPos)  
      yPos += lineHeight  
    })  
    yPos += lineHeight * 2  
  
    // Add feedback content  
    doc.setFontSize(16)  
    doc.setFont("helvetica", "bold")  
    doc.text("AI Feedback:", margin, yPos)  
    yPos += lineHeight  
  
    doc.setFontSize(12)  
    doc.setFont("helvetica", "normal")  
    const feedback = textFeedback || audioFeedback  
  
    // Parse feedback for better formatting  
    feedback.split("\n").forEach((line) => {  
      if (line.startsWith("**")) {  
        // Check if content exceeds page height  
        if (yPos > 280) {  
          doc.addPage() // Add a new page  
          yPos = margin // Reset yPos for the new page  
        }  
  
        // Heading  
        doc.setFontSize(14)  
        doc.setFont("helvetica", "bold")  
        doc.setTextColor(0, 0, 128) // Dark blue color  
        const headingLines = doc.splitTextToSize(line.replace(/\*\*/g, ""), pageWidth)  
        headingLines.forEach((headingLine) => {  
          if (yPos > 280) {  
            doc.addPage() // Add a new page  
            yPos = margin // Reset yPos for the new page  
          }  
          doc.text(headingLine, margin, yPos)  
          yPos += lineHeight  
        })  
      } else if (line.startsWith("* ")) {  
        // Check if content exceeds page height  
        if (yPos > 280) {  
          doc.addPage() // Add a new page  
          yPos = margin // Reset yPos for the new page  
        }  
  
        // Bullet point  
        doc.setFontSize(12)  
        doc.setFont("helvetica", "normal")  
        doc.setTextColor(0, 0, 0) // Black color  
        const bulletLines = doc.splitTextToSize(`• ${line.replace("* ", "")}`, pageWidth)  
        bulletLines.forEach((bulletLine) => {  
          if (yPos > 280) {  
            doc.addPage() // Add a new page  
            yPos = margin // Reset yPos for the new page  
          }  
          doc.text(bulletLine, margin, yPos)  
          yPos += lineHeight  
        })  
      } else {  
        // Check if content exceeds page height  
        if (yPos > 280) {  
          doc.addPage() // Add a new page  
          yPos = margin // Reset yPos for the new page  
        }  
  
        // Paragraph  
        doc.setFontSize(12)  
        doc.setFont("helvetica", "normal")  
        doc.setTextColor(0, 0, 0) // Black color  
        const lines = doc.splitTextToSize(line, pageWidth)  
        lines.forEach((line) => {  
          if (yPos > 280) {  
            doc.addPage() // Add a new page  
            yPos = margin // Reset yPos for the new page  
          }  
          doc.text(line, margin, yPos)  
          yPos += lineHeight  
        })  
      }  
    })  
  
    // Save the PDF  
    doc.save("lesson-plan-feedback.pdf")  
  }  
  
  return (  
    <div className="container mx-auto px-4 py-8">  
      <h1 className="text-3xl font-bold mb-8">AI-Powered Feedback</h1>  

      {/* Text Input Section */}  
      <form onSubmit={handleTextSubmit} className="mb-8">  
        <Textarea  
          placeholder="Describe your classroom interaction or lesson plan here..."  
          value={textInput}  
          onChange={(e) => setTextInput(e.target.value)}  
          className="mb-4"  
          rows={6}  
        />  
        <Button type="submit" disabled={isProcessing}>  
          {isProcessing ? "Processing..." : "Get Text Feedback"}  
        </Button>  
      </form>  

      {/* Audio Input Section */}  
      <form onSubmit={handleAudioSubmit} className="mb-8">  
        <div className="flex items-center space-x-4 mb-4">  
          <input  
            type="file"  
            accept="audio/*"  
            onChange={(e) => setAudioFile(e.target.files[0])}  
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"  
          />  
          <Button type="submit" disabled={isProcessing || !audioFile}>  
            {isProcessing ? "Processing..." : "Analyze Class Recording"}  
          </Button>  
        </div>  
      </form>  

      {/* Text Feedback Display */}  
      {textFeedback && (  
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg mb-8">  
          <CardHeader>  
            <CardTitle className="text-2xl font-bold text-blue-900">Text Feedback</CardTitle>  
            <CardDescription className="text-gray-600">  
              Based on your text input, here's the feedback:  
            </CardDescription>  
          </CardHeader>  
          <CardContent>  
            <div className="prose prose-lg max-w-none">  
              {textFeedback.split("\n").map((line, index) => {  
                if (line.startsWith("**")) {  
                  return (  
                    <h3 key={index} className="text-xl font-semibold text-blue-800 mt-4 mb-2">  
                      {line.replace(/\*\*/g, "")}  
                    </h3>  
                  )  
                } else if (line.startsWith("* ")) {  
                  return (  
                    <ul key={index} className="list-disc list-inside text-gray-700">  
                      <li>{line.replace("* ", "")}</li>  
                    </ul>  
                  )  
                } else {  
                  return (  
                    <p key={index} className="text-gray-700">  
                      {line}  
                    </p>  
                  )  
                }  
              })}  
            </div>  
          </CardContent>  
        </Card>  
      )}  

      {/* Audio Feedback Display */}  
      {audioFeedback && (  
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 shadow-lg">  
          <CardHeader>  
            <CardTitle className="text-2xl font-bold text-blue-900">Class Recording Feedback</CardTitle>  
            <CardDescription className="text-gray-600">  
              Based on your class recording, here's the feedback on conceptual clarity:  
            </CardDescription>  
          </CardHeader>  
          <CardContent>  
            <div className="prose prose-lg max-w-none">  
              {audioFeedback.split("\n").map((line, index) => {  
                if (line.startsWith("**")) {  
                  return (  
                    <h3 key={index} className="text-xl font-semibold text-blue-800 mt-4 mb-2">  
                      {line.replace(/\*\*/g, "")}  
                    </h3>  
                  )  
                } else if (line.startsWith("* ")) {  
                  return (  
                    <ul key={index} className="list-disc list-inside text-gray-700">  
                      <li>{line.replace("* ", "")}</li>  
                    </ul>  
                  )  
                } else {  
                  return (  
                    <p key={index} className="text-gray-700">  
                      {line}  
                    </p>  
                  )  
                }  
              })}  
            </div>  
          </CardContent>  
        </Card>  
      )}  

      {/* Download PDF Button */}  
      {(textFeedback || audioFeedback) && (  
        <div className="mt-8">  
          <Button onClick={downloadPDF}>  
            <Download className="mr-2" />  
            Download PDF  
          </Button>  
        </div>  
      )}  
    </div>  
  )  
}  
