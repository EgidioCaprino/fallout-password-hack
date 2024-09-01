"use client";

import assert from "assert";
import capitalize from "lodash/capitalize";
import { FormEvent, useState } from "react";

function calculateLikeness(first: string, second: string) {
  assert.strictEqual(
    first.length,
    second.length,
    new Error(`"${first}" and "${second}" have different length`),
  );
  let likeness = 0;
  for (let index = 0; index < first.length; index = index + 1) {
    if (first.at(index) === second.at(index)) {
      likeness = likeness + 1;
    }
  }
  return likeness;
}

function discard(words: string[], chosenWord: string, likeness: number) {
  assert(
    words.includes(chosenWord),
    new Error(`Word "${chosenWord}" not found`),
  );
  return words.filter(
    (word) =>
      word !== chosenWord && calculateLikeness(word, chosenWord) === likeness,
  );
}

interface WordProps {
  value: string;
  selected: boolean;
  onSelected: () => void;
  onLikeness: (likeness: number) => void;
  selectable?: boolean;
}

function Word(props: WordProps) {
  const { value, selected, onSelected, onLikeness, selectable = true } = props;
  const [likeness, setLikeness] = useState<number>();
  if (selected) {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      assert(typeof likeness === "number" && likeness >= 0);
      onLikeness(likeness);
    };
    return (
      <form onSubmit={handleSubmit}>
        <label
          htmlFor={`${value.toLowerCase()}-affinity`}
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <input
            type="number"
            min={0}
            max={value.length}
            id={`${value.toLowerCase()}-affinity`}
            className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={`Affinity of "${value}"`}
            required
            value={likeness}
            onChange={({ target }) => setLikeness(parseInt(target.value, 10))}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Pick
          </button>
        </div>
      </form>
    );
  }
  return (
    <button
      className="rounded-lg p-3 bg-blue-500/20 border-2 border-solid border-blue-500/20 transition-colors hover:bg-blue-500/40 font-medium text-base leading-none flex flex-row items-center justify-center gap-2"
      onClick={onSelected}
      disabled={!selectable}
    >
      {value}
    </button>
  );
}

interface Props {
  words: string[];
}

export default function Solver({ words: initialWords }: Props) {
  const [words, setWords] = useState(
    initialWords.map((word) => capitalize(word)),
  );
  const [selectedWord, setSelectedWord] = useState("");

  return (
    <>
      {words.length > 1 ? <p>Pick a word</p> : <p>The solution is</p>}
      <div className="grid grid-cols-1 gap-4">
        {words.map((word) => (
          <Word
            value={word}
            key={word}
            selected={word === selectedWord}
            onSelected={() => setSelectedWord(word)}
            onLikeness={(likeness) => setWords(discard(words, word, likeness))}
            selectable={words.length > 1}
          />
        ))}
      </div>
      <a
        href={window.location.href}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center mt-8"
      >
        <svg
          className="fill-none w-6 h-6 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M21 3V8M21 8H16M21 8L18 5.29168C16.4077 3.86656 14.3051 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.2832 21 19.8675 18.008 20.777 14"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <span>Refresh</span>
      </a>
    </>
  );
}
