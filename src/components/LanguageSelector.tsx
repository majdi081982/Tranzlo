"use client";

import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  "Afrikaans", "Albanian", "Amharic", "Arabic", "Armenian", "Azerbaijani",
  "Bengali", "Bosnian", "Bulgarian", "Burmese", "Catalan", "Chinese (Mandarin)",
  "Chinese (Cantonese)", "Croatian", "Czech", "Danish", "Dutch", "English",
  "Estonian", "Farsi", "Finnish", "French", "Georgian", "German", "Greek",
  "Gujarati", "Hebrew", "Hindi", "Hungarian", "Icelandic", "Indonesian",
  "Italian", "Japanese", "Kannada", "Kazakh", "Khmer", "Korean", "Lao",
  "Latvian", "Lithuanian", "Macedonian", "Malay", "Malayalam", "Maltese",
  "Marathi", "Mongolian", "Nepali", "Norwegian", "Pashto", "Polish",
  "Portuguese", "Punjabi", "Romanian", "Russian", "Serbian", "Sinhala",
  "Slovak", "Slovenian", "Somali", "Spanish", "Swahili", "Swedish",
  "Tagalog", "Tamil", "Telugu", "Thai", "Turkish", "Ukrainian", "Urdu",
  "Uzbek", "Vietnamese", "Welsh", "Zulu"
].sort();

interface LanguageSelectorProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  id?: string;
}

const LanguageSelector = ({ value, onValueChange, placeholder = "Select a language", id }: LanguageSelectorProps) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger id={id} className="h-11 rounded-xl bg-white border-slate-200">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        {languages.map((lang) => (
          <SelectItem key={lang} value={lang.toLowerCase()}>
            {lang}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;