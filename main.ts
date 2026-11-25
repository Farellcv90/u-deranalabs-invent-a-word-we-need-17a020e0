// Invent a Word We Need — one invented English word, defined in a single line.
// The line has to stand entirely on its own: one word, one definition, one reading.
// It is kept in one named constant so the whole entry is exactly this line.

import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY_LINE =
  "Flakeglee — the quiet joy of a cancelled plan you secretly hoped would fall through.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 140;
const OUTPUT_DIR = "/output";
const OUTPUT_PATH = `${OUTPUT_DIR}/entry.txt`;

function validateEntryLine(line: string): number {
  // Count real characters (spread handles multi-byte glyphs like the em dash).
  const length = [...line].length;
  if (length < MIN_LENGTH || length > MAX_LENGTH) {
    throw new Error(
      `Entry line must be ${MIN_LENGTH}–${MAX_LENGTH} characters, got ${length}.`,
    );
  }
  if (line.trim() !== line) {
    throw new Error("Entry line must not have leading or trailing whitespace.");
  }
  // The entry is exactly one line — no line breaks allowed.
  if (line.includes("\n")) {
    throw new Error("Entry line must be a single line.");
  }
  return length;
}

const length = validateEntryLine(ENTRY_LINE);

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(OUTPUT_PATH, ENTRY_LINE, "utf8");
console.log(`Wrote ${length} characters to ${OUTPUT_PATH}`);
