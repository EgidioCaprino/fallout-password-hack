"use client";

import Solver from "@/components/Solver";
import WordsForm from "@/components/WordsForm";
import { FormEvent, useState } from "react";

export default function Home() {
  const [words, setWords] = useState(new Array<string>());
  const [solverVisible, setSolverVisible] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSolverVisible(true);
  };

  const wordsHaveSameLength =
    words.length === 0 ||
    words.every((word) => word.length === words[0].length);

  return (
    <main className="pt-8">
      <h1 className="text-4xl antialiased font-semibold text-center">
        Fallout 4 Password Hack
      </h1>
      <div className="mt-10 p-10 flex flex-col mx-auto gap-2 max-w-lg">
        {solverVisible ? (
          <Solver words={words} />
        ) : (
          <form onSubmit={handleSubmit}>
            <fieldset className="contents">
              <div className="flex flex-col">
                <WordsForm onWordsChange={(newWords) => setWords(newWords)} />
              </div>
              <div className="flex justify-between mt-2 items-center">
                <p>
                  {words.length} word{words.length === 1 ? "" : "s"}
                </p>
                <button
                  type="submit"
                  className="rounded-lg p-3 bg-green-500/20 border-2 border-solid border-green-500/20 transition-colors hover:bg-green-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2"
                  disabled={words.length < 2 || !wordsHaveSameLength}
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
              </div>
              {words.length >= 2 && !wordsHaveSameLength && (
                <div className="flex justify-between mt-2 items-center text-red-900 font-bold">
                  <p>All the words must have the same length</p>
                </div>
              )}
            </fieldset>
          </form>
        )}
      </div>
    </main>
  );
}
