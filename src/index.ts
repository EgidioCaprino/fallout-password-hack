import assert from "node:assert";
import readline from "node:readline/promises";

const calculateLikeness = (first: string, second: string) => {
  assert.strictEqual(
    first.length,
    second.length,
    `"${first}" and "${second}" have different length`
  );
  let likeness = 0;
  for (let index = 0; index < first.length; index = index + 1) {
    if (first.at(index) === second.at(index)) {
      likeness = likeness + 1;
    }
  }
  return likeness;
};

const discard = (words: string[], target: string, likeness: number) => {
  assert(words.includes(target), `Word "${target}" not found`);
  return words.filter(
    (word) => word !== target && calculateLikeness(word, target) === likeness
  );
};

const main = async () => {
  let words = process.argv
    .slice(2)
    .map((word) => word.toUpperCase().trim())
    .filter(Boolean);
  assert(words.length, "No words provided");
  const lineReader = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const wordLength = words[0].length;
  try {
    while (words.length > 1) {
      let word = await lineReader.question(
        `Chose a word: ${words.join(", ")}\n`
      );
      word = word.toUpperCase().trim();
      if (!word.length) {
        console.error("Provided word is empty");
        continue;
      }
      let likenessString = await lineReader.question(
        `What is the likeness of ${word}?\n`
      );
      let likeness = 0;
      likenessString = likenessString.trim();
      try {
        likeness = parseInt(likenessString, 10);
      } catch (error) {
        console.error(`Invalid likeness "${likenessString}"`);
        continue;
      }
      if (likeness < 0 || likeness > wordLength) {
        console.error(`Likeness should be between 0 and ${wordLength}`);
        continue;
      }
      try {
        words = discard(words, word, likeness);
      } catch (error) {
        if (error instanceof Error) {
          console.error(error.message);
          continue;
        }
        throw error;
      }
    }
  } finally {
    lineReader.close();
  }
  assert(
    words.length === 1,
    `Invalid state: ${words.length} possible solutions`
  );
  if (words.length) {
    console.info(`The solution is ${words[0]}`);
  }
};

main();
