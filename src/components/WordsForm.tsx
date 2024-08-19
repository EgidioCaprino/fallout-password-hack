"use client";

import { ChangeEvent, useState } from "react";

const SEPARATOR = " ";

interface Props {
  onWordsChange: (words: string[]) => void;
}

export default function WordsForm({ onWordsChange }: Props) {
  const [value, setValue] = useState("");
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const words = event.target.value
      .split(SEPARATOR)
      .map((line) => line.trim())
      .filter(Boolean);
    onWordsChange(words);
  };
  const placeholder = ["Tall", "Care", "Crap", "Free", "Cork", "Arms"].join(
    SEPARATOR,
  );
  return (
    <>
      <label htmlFor="words" className="font-semibold text-lg">
        Enter the words separated by spaces
      </label>
      <input
        type="text"
        id="words"
        required={true}
        placeholder={placeholder}
        className="rounded-lg p-4 bg-black/5 border-2 border-solid border-black/10 font-mono font-medium text-sm mt-2"
        onChange={onChange}
        value={value}
      ></input>
    </>
  );
}
