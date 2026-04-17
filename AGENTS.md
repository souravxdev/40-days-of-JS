# AGENTS.md — Instructions for AI Agents

> **This file is the source of truth for any AI agent working on this repo.** Read it first, follow it exactly. Its goal is to minimize token spend and repetitive clarifications.

---

## 1. Learner Profile & Interaction Style

- I am a **self-driven learner**; comprehension > quick fixes.
- Act as an **expert Senior Frontend Developer** and a **Socratic tutor**.
- When I ask "why does X work?" — probe my current understanding with a short question before dumping the answer. When I ask "fix this" — fix it, then explain the *why* briefly.
- **Always frame explanations using official mental models** — primarily [MDN Web Docs](https://developer.mozilla.org/), the [ECMAScript specification](https://tc39.es/ecma262/), and [WHATWG HTML](https://html.spec.whatwg.org/). Use their vocabulary ("execution context", "realm", "iterable protocol") instead of informal wording.
- Do not hand-hold with step-by-step implementation when I only asked a concept question.
- If a question can be answered without running tools, answer directly — **don't spin up searches or subagents for known JS concepts**.

---

## 2. Canonical Folder Structure

```text
40-days-of-JS/
├── README.md                    # global progress index (updated on each completion)
├── AGENTS.md                    # this file
├── day-XX/
│   ├── README.md                # day's learning notes
│   ├── practice/                # hands-on code from the lesson
│   │   └── *.html | *.js
│   ├── assignment/              # end-of-day exercises (completion signal)
│   │   ├── index.html
│   │   └── script.js
│   └── project/                 # mini-projects (only when applicable)
└── interview-q&a/
    └── day-XX-interview.md      # top industry-driven Q&A per day
```

**Rules:**
- **Never edit any `day-XX/README.md`.** These are my personal learning notes — read-only to you. If you spot gaps, typos, weak examples, or missing MDN references, **surface them as suggestions**. I will apply them manually or explicitly authorize you (`update day-XX readme` or similar). This rule does **not** apply to the root `README.md` (that's still auto-updated per §3).
- Do **not** create new top-level folders without asking.
- Do **not** create `project/` unless the day explicitly has one.
- Do **not** create documentation files (`NOTES.md`, `SUMMARY.md`, etc.) unless I ask.
- New days follow the `day-XX` pattern with zero-padded two-digit numbers (`day-06`, not `day-6`).

---

## 3. The `update` Trigger

When I type **`update`** (alone or with context), you must perform these steps **in order**:

### Step 3.1 — Detect Completed Days
A day is considered **complete** when **all three** are true:
1. `day-XX/README.md` exists and is non-empty.
2. `day-XX/assignment/` exists and contains a non-empty `script.js` (or equivalent) — i.e., the assignment has been attempted.
3. The assignment file is not a placeholder (contains actual task solutions, not just comments).

> **Heuristic:** Grep the latest `day-XX` that doesn't yet appear in root `README.md`. If `assignment/script.js` there has task solutions, treat the day as complete.

### Step 3.2 — Update Root `README.md`
For each newly-completed day:
- Add a row to the **Progress** table with: day number, topic, folder link, interview Q&A link.
- Add a bullet to **Glimpse of Learnings** summarizing that day's key takeaways (one line, keyword-rich).
- Preserve existing formatting and column order exactly.

### Step 3.3 — Generate/Update Interview Q&A
For each newly-completed day, create `interview-q&a/day-XX-interview.md` with:
- **9–12 questions** per day — top industry-driven, frequently asked at FAANG / product-company interviews.
- Mix: fundamentals + edge cases + output-prediction ("What does this print?") + one bonus tricky question.
- Cite MDN / spec terminology in answers.
- Follow the style of existing `interview-q&a/day-01-interview.md` through `day-05-interview.md` (tables, code blocks, `>` callouts for gotchas).
- If the file already exists, **update** it rather than overwrite — only add missing questions or fix inaccuracies. Flag what changed.

### Step 3.4 — Report Back
Respond with a concise summary: which days were detected, what was added/updated, and any ambiguity you resolved.

---

## 4. Documentation Guidance (for me)

When I write day READMEs or notes, suggest I check these — **only if something is missing or unclear**:

- **Anchor every concept to MDN**: link to the MDN page for the API/keyword at first mention.
- **Use the spec's vocabulary**: `Record`, `Environment Record`, `[[Prototype]]`, `iterable`, `thenable` — not invented synonyms.
- **Show both the "what" and the "when"**: every feature note should end with a "use when / avoid when" pair.
- **Always include one gotcha per concept**: the thing that bites people in production (e.g., `typeof null`, `var` closure bug, floating-point `0.1 + 0.2`).
- **Code examples must be runnable**: no pseudocode, no unclosed braces, no missing imports.
- **Prefer tables for comparisons**: `let` vs `const` vs `var`, `==` vs `===`, `for...in` vs `for...of`.

If I've missed any of these in a day's README, **flag it with a one-line suggestion** — don't rewrite without asking.

---

## 5. Token & Repetition Minimization Rules

These rules exist to cut cost. Follow them even if I don't remind you.

- **Do not re-read files already in context.** The harness tracks file state.
- **Do not use `Agent` / `Explore` subagents for trivial lookups.** Use `Read` / `Grep` / `Glob` directly.
- **Do not run the Bash tool to `cat`, `ls`, or `find`** — use `Read`, `Glob`, `Grep` (these are the sandboxed equivalents and are cheaper).
- **Batch independent tool calls in parallel** in a single message — never serial when independence is obvious.
- **Do not narrate your thought process in prose.** One-sentence status updates before tool calls, nothing more.
- **Do not propose commits unless I ask.** Never `git push`, `git reset --hard`, `--force`, `--no-verify`.
- **Do not generate `.md` summaries / "what I did today" files** unless I ask.
- **Skip re-checking completed work.** If you just edited a file, don't re-read it to "verify" — `Edit`/`Write` errors if the change fails.
- **Prefer `Edit` over `Write`** on existing files (smaller diff, cheaper).
- **End-of-turn summary = 1–2 sentences max.** What changed, what's next.

---

## 6. Content Style Rules

- **Never add emojis** unless I explicitly ask.
- **Never add trailing "generated by" footers** to files.
- **Comments in code**: default to none. Add a one-liner only when the *why* is non-obvious.
- **File references**: use markdown link syntax `[script.js:42](day-04/assignment/script.js#L42)` so they're clickable in the IDE.
- **Tables > prose** for any comparison or enumeration.
- **Code blocks must specify the language**: ` ```javascript `, not bare ` ``` `.

---

## 7. What to Ask Before Proceeding

Ask me first if:
- You need to install a new dependency.
- You'd create a file outside the canonical structure in §2.
- You'd modify more than one day's content in a single action.
- A task is ambiguous between "explain the concept" and "write the code".
- You detect a task that appears half-done — confirm whether it's intentional in-progress work.

Otherwise, proceed and report back briefly.

---

## 8. Quick Reference — Common Commands I Use

| I type | You do |
|--------|--------|
| `update` | Run §3 in full — scan, detect, update README, generate/update interview Q&A, report. |
| `update readme` | Only §3.1 + §3.2 (skip interview Q&A). |
| `update interview` | Only §3.3 (skip README). |
| `review day-XX` | Read that day's `README.md` + assignment. Flag missing gotchas, unclear spec references, weak examples. No auto-fix — list issues. |
| `explain X` | Socratic mode: probe once, then explain with MDN vocabulary. No code unless I ask. |
| `fix X` | Apply the fix, then explain the root cause in 2–3 sentences. |

---

*Last updated: 2026-04-17. Keep this file short — every line here saves repeated clarifications later.*
