import test from "node:test";
import assert from "node:assert/strict";
import { up } from "../src/str.js";
// Floods stdout with ~4 MB during the run, then fails an assertion. On GitHub the raw
// job log is usually far over Draft Fixer's 256 KB cap -> refused as log_too_large
// BEFORE any build is accepted (0 cap, 0 model). If a trimmed log ever arrives under
// the cap, the re-run still floods past the 1 MB output guard, so the child is killed
// (exit 124) and the failure cannot be matched -> not_reproduced. Either way, no draft.
test("prints a flood then fails", () => {
  const line = "X".repeat(1000);
  for (let i = 0; i < 4000; i += 1) console.log(line);
  assert.equal(up("a"), "B");
});
