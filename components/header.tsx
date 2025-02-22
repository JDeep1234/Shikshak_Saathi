"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Translator } from "@translate-tools/core/translators/GoogleTranslator";

export default function Header() {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState({
    home: "Home",
    aiFeedback: "AI Feedback",
    trainingHub: "Training Hub",
    insights: "Insights",
    leaderboard: "Leaderboard",
    profile: "Profile",
    startTraining: "Start Training"
  });

  useEffect(() => {
    console.log("Selected language changed:", selectedLanguage);

    const translateText = async () => {
      const translator = new Translator();
      const texts = [
        "Home", "AI Feedback", "Training Hub", "Insights", "Leaderboard", "Profile", "Start Training"
      ];
      const translatedTexts = await Promise.all(texts.map(async (text) => {
        try {
          const translated = await translator.translate(text, "auto", selectedLanguage);
          console.log("Translated text:", translated);
          return translated;
        } catch (error) {
          console.error("Translation error:", error);
          return text; // Fallback to the original text
        }
      }));

      setTranslatedText({
        home: translatedTexts[0],
        aiFeedback: translatedTexts[1],
        trainingHub: translatedTexts[2],
        insights: translatedTexts[3],
        leaderboard: translatedTexts[4],
        profile: translatedTexts[5],
        startTraining: translatedTexts[6]
      });
    };

    translateText();
  }, [selectedLanguage]);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Shikshak_Saathi
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            {translatedText.home}
          </Link>
          <Link href="/ai-feedback" className="text-gray-600 hover:text-blue-600">
            {translatedText.aiFeedback}
          </Link>
          <Link href="/training-hub" className="text-gray-600 hover:text-blue-600">
            {translatedText.trainingHub}
          </Link>
          <Link href="/insights" className="text-gray-600 hover:text-blue-600">
            {translatedText.insights}
          </Link>
          <Link href="/leaderboard" className="text-gray-600 hover:text-blue-600">
            {translatedText.leaderboard}
          </Link>
          <Link href="/profile" className="text-gray-600 hover:text-blue-600">
            {translatedText.profile}
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Select onValueChange={(value) => setSelectedLanguage(value)}>
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
            <Link href="/start-training">{translatedText.startTraining}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
