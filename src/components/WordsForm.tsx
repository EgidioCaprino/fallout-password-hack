"use client";

import { ChangeEvent, useState } from "react";

interface Props {
  onWordsChange: (words: string[]) => void;
}

export default function WordsForm({ onWordsChange }: Props) {
  const [value, setValue] = useState("");
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
    const words = event.target.value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
    onWordsChange(words);
  };
  const placeholder = ["Tall", "Care", "Crap", "Free", "Cork", "Arms"].join(
    "\n",
  );
  return (
    <>
      <label htmlFor="input" className="font-semibold text-lg">
        Enter the words, one per line
      </label>
      <textarea
        name="input"
        id="input"
        rows={10}
        required={true}
        placeholder={placeholder}
        className="rounded-lg p-4 bg-black/5 border-2 border-solid border-black/10 font-mono font-medium text-sm"
        onChange={onChange}
        value={value}
      ></textarea>
    </>
  );
}
