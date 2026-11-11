#!/usr/bin/env bash
# Lists every "- [ ]" / "- [x]" item of a worklist that no test title in teams/team-1/tests names.
# Usage (from the repository root): check-coverage.sh <stem> [story-id]
# Exit 0: everything covered. Exit 1: something is missing. Exit 2: bad input.
set -euo pipefail

stem="${1:-}"
story="${2:-}"
worklist="teams/team-1/specs/${stem}.worklist.md"
tests_dir="teams/team-1/tests"

if [[ -z "$stem" ]]; then
  echo "usage: check-coverage.sh <stem> [story-id]" >&2
  exit 2
fi
if [[ ! -f "$worklist" ]]; then
  echo "FAIL: $worklist not found" >&2
  exit 2
fi

# The item ID is the first word after the checkbox: FD-05-R01 or ASM-FD-05-01.
ids=$(sed -nE 's/^- \[[ xX]\] ([A-Z0-9-]+) .*/\1/p' "$worklist")
if [[ -n "$story" ]]; then
  ids=$(printf '%s\n' "$ids" | grep -E "(^|-)${story}-" || true)
fi

titles=$(grep -hoE "test\((['\"\`])[^'\"\`]*" "$tests_dir"/*.spec.ts 2>/dev/null || true)

total=0
missing=0
while IFS= read -r id; do
  [[ -z "$id" ]] && continue
  total=$((total + 1))
  # The ID must be followed by a space, so FD-05-R01 does not match FD-05-R010.
  if ! printf '%s\n' "$titles" | grep -qF -- "$id "; then
    echo "MISSING $id"
    missing=$((missing + 1))
  fi
done <<< "$ids"

echo "coverage: $((total - missing))/$total items named in test titles"
[[ $missing -eq 0 ]]
