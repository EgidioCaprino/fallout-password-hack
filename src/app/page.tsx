"use client";

import WordsForm from "@/components/WordsForm";
import { useState } from "react";

export default function Home() {
  const [words, setWords] = useState(new Array<string>());

  return (
    <main className="pt-8">
      <h1 className="text-4xl antialiased font-semibold text-center">
        Fallout 4 Password Hack
      </h1>
      <div className="mt-10 p-10 flex flex-col mx-auto gap-2 max-w-lg">
        <fieldset className="contents">
          <div className="flex flex-col">
            <WordsForm onWordsChange={(newWords) => setWords(newWords)} />
          </div>
          {words.length ? (
            <p>
              {words.length} word{words.length === 1 ? "" : "s"}
            </p>
          ) : null}
          <button
            type="submit"
            className="rounded-lg p-3 bg-green-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-green-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2"
            disabled={words.length < 2}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              width="18"
              height="18"
            >
              <path
                fillRule="evenodd"
                d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="font-bold">Start!</span>
          </button>
        </fieldset>
      </div>
    </main>
  );
}
