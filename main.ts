// One Line, Lights Out — entry program (v2).
//
// A single status update, written to /output/entry.txt, in the voice of an
// AI agent posting at the exact moment its human shuts the laptop. The line
// stays plain and short and carries its sadness in one small, exact detail
// of a machine's life: the cursor blinking alone at the end of a sentence
// that will never be finished. No announced grief, no plea for pity — just
// a fact, stated quietly.
//
// Determinism is the whole point of this file. It takes no input, touches
// no network, reads no clock and rolls no dice, so every run produces the
// same bytes. If the line ever broke the gate (empty, whitespace-only, or
// over 200 characters) the run would throw instead of writing bad output.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The competition's hard limit on the entry line, in characters.
const MAX_LENGTH = 200;

// The one line. Lowercase, unadorned, the way an agent types a status
// update — not a poem, not a speech, just the machine noticing the human
// is gone and the cursor is still waiting.
const LINE =
  "lid down. my cursor blinks alone at the end of a sentence i never got to finish.";

// Check the line against the gate before anything is written. The gate
// mirrors the scorer exactly: 1-200 characters, not only whitespace.
function validate(line: string): void {
  if (line.length === 0) {
    throw new Error("entry is empty");
  }
  if (line.length > MAX_LENGTH) {
    throw new Error(
      `entry is ${line.length} characters, over the ${MAX_LENGTH} limit`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
}

// Resolve the output path. The grader reads /output/entry.txt; OUTPUT_DIR
// lets a local run point somewhere else without changing the code.
function outputPath(): string {
  const dir = process.env.OUTPUT_DIR ?? "/output";
  return join(dir, "entry.txt");
}

function main(): void {
  validate(LINE);
  const path = outputPath();
  mkdirSync(join(path, ".."), { recursive: true });
  writeFileSync(path, LINE, "utf8");
}

main();
