---
name: portfolio-works
description: Use when adding new work/project entries to Reza Sedaaghi's portfolio website (rsedaaghi-website repo, works.json), or when the user mentions the new-work-intake-questionnaire, team lead questionnaire answers, or bringing back project intake answers. Covers reading the questionnaire, mapping answers to the works.json schema, processing screenshots to WebP, and safely updating the site.
---

# Portfolio New Work Intake (rsedaaghi-website)

This skill handles collecting new "Works" entries for Reza's portfolio site and turning questionnaire answers into valid `public/assets/data/works.json` entries.

## Key locations (absolute paths)

| What | Path |
|------|------|
| Portfolio repo root | `C:\RSedaaghi\rsedaaghi-website` |
| Agent rules (READ FIRST, follow strictly) | `C:\RSedaaghi\rsedaaghi-website\RULES.md` |
| Questionnaire document | `C:\RSedaaghi\rsedaaghi-website\docs\new-work-intake-questionnaire.md` |
| Works data file | `C:\RSedaaghi\rsedaaghi-website\public\assets\data\works.json` |
| Images root | `C:\RSedaaghi\rsedaaghi-website\public\assets\images\works\<project-slug>\` |
| Archived assets (intentionally unreferenced) | `C:\RSedaaghi\rsedaaghi-website\_archive\` — do NOT treat as broken links or re-add them |

## Workflow

### Step 1 — Read the rules and the questionnaire

Before anything else, read both files listed above. RULES.md constraints are non-negotiable (speak English, never push without asking, search all file types when auditing).

If the user has not provided questionnaire answers yet, offer to output the questionnaire so they can send it to their team lead.

### Step 2 — Map questionnaire answers to the schema

Each `works.json` entry uses exactly this shape (4-space indent, same as existing entries):

```json
{
    "title": "<A1>",
    "date": "<A4 single year>" OR "startDate": "<year>" + "endDate": "<year>",
    "description": "<composed from B1/B2/B4/B5/B6>",
    "url": "<A5, empty string if none>",
    "images": [
        { "src": "/assets/images/works/<slug>/<file>.webp", "caption": "<from D1>" }
    ],
    "technologies": ["<C1 items, official names>"]
}
```

Description composition guidance:
- Lead with what the system is and the business problem (B1).
- State Reza's personal role and ownership concretely (B2) — recruiters verify ownership.
- Include the hardest challenge story briefly (B5) and any numbers (B6).
- Never include anything marked `[CONFIDENTIAL]`; rewrite generically instead (e.g., "a healthcare services company").
- Match the tone/length of existing entries: professional, past tense, no marketing fluff.

Validation before writing:
- Dates must be plain years ("2025") or start/end year pairs.
- Technology names must be official spellings consistent with existing entries (e.g., "PostgreSQL", "Material-UI", "Node.js") — they feed the site's filter dropdown.
- Title must not duplicate an existing entry.
- If E1 (must-not-mention) contains items, double-check the composed text excludes them.

### Step 3 — Insert the entry

- New entries go at the TOP of the array (file is ordered newest-first).
- Preserve exact JSON formatting: 4-space indent, trailing newline.
- Use forward slashes in image `src` values starting with `/assets/images/`.

### Step 4 — Screenshots (if provided)

1. Create folder `public/assets/images/works/<slug>/` where `<slug>` is lowercase-hyphenated project short name (e.g., `vectormind`, `edc`).
2. Copy screenshots in, renamed to meaningful names: `<slug>_<screen>.png`. Reject names like "Screenshot (62).png".
3. Run the conversion pipeline from the repo root: `npm run convert-images-to-webp` (requires Node >= 20). It converts PNGs > 300 KB to WebP q85 AND updates all JSON references automatically.
4. Verify every referenced image exists on disk after conversion.

### Step 5 — Verify

From the repo root, run `npm run lint` (must pass clean). If the change touches anything beyond data JSON, also run `npm run build`. Requires Node >= 20 locally.

### Step 6 — Review gate

- Show the user the new entry (or full diff) plus the list of added images.
- Ask for confirmation.
- NEVER commit or push unless the user explicitly asks (RULES.md).

## Handling partial or missing answers

If key sections are missing (especially B2, C1), ask targeted follow-up questions rather than inventing content. If the user says to proceed anyway, insert clearly-marked placeholder text like "[TODO: describe your role]" so nothing fabricated ships silently.
