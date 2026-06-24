#!/usr/bin/env bash
#
# Runs the Jest test suite and prints a concise JSON summary of the results.
# Exits with Jest's original exit code so it can be used in CI pipelines.

set -uo pipefail

# Resolve repo root (parent of this script's directory) so the script works
# regardless of the current working directory.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$REPO_ROOT"

RESULTS_FILE="$(mktemp 2>/dev/null || echo "${TMPDIR:-/tmp}/jest-results.$$.json")"
trap 'rm -f "$RESULTS_FILE"' EXIT

# Run Jest in JSON mode. Full machine-readable results go to RESULTS_FILE;
# Jest's own console output is discarded so only our summary reaches stdout.
# --passWithNoTests keeps the run green when no test files exist yet.
npx jest --json --passWithNoTests --outputFile="$RESULTS_FILE" >/dev/null 2>&1
JEST_EXIT=$?

# Transform the full Jest report into a compact summary using node (always
# available since it is the Jest runtime — avoids a hard dependency on jq).
node -e '
  const fs = require("fs");
  const file = process.argv[1];
  let r;
  try {
    r = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch (e) {
    console.error("Failed to read Jest results: " + e.message);
    process.exit(1);
  }
  const summary = {
    success: r.success === true,
    suites: {
      total: r.numTotalTestSuites || 0,
      passed: r.numPassedTestSuites || 0,
      failed: r.numFailedTestSuites || 0,
    },
    tests: {
      total: r.numTotalTests || 0,
      passed: r.numPassedTests || 0,
      failed: r.numFailedTests || 0,
      pending: r.numPendingTests || 0,
    },
    durationMs: r.startTime ? (Date.now() - r.startTime) : null,
  };
  console.log(JSON.stringify(summary, null, 2));
' "$RESULTS_FILE"

exit $JEST_EXIT
