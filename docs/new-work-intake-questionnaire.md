# New Work Entry — Intake Questionnaire

**For:** Team Lead
**Purpose:** Collecting material for Reza Sedaaghi's professional portfolio website (rsedaaghi.github.io). The portfolio is actively used for job applications, so answers should highlight engineering quality, ownership, and measurable impact. **Only include information approved for public sharing.**

---

## How to Answer

- Answer **one block per project**.
- Keep the **question numbers** in your answers (e.g., `A1: ...`, `B3: ...`) so nothing gets lost in translation.
- Mark anything that must stay private with **[CONFIDENTIAL]** — it will be excluded or rewritten generically.
- Short, concrete sentences beat long paragraphs. Numbers beat adjectives ("reduced report generation from 4 hours to 5 minutes" > "much faster").

---

## Section A — Project Identity

| # | Question |
|---|----------|
| A1 | Official project name — exactly as it should appear as the card title on the website |
| A2 | One-line summary: what is it, in plain words a non-engineer understands |
| A3 | Company / client name. May we name them publicly? (Yes / No / Anonymize as e.g. "a healthcare services company") |
| A4 | Time period: single year (e.g., 2025) or range (e.g., 2023–2024)? |
| A5 | Public URL to link, if any? If private/internal, say so — the entry will simply have no Visit button |

## Section B — The Story (most important section for recruiters)

| # | Question |
|---|----------|
| B1 | **Business problem:** What problem existed before this project? Who was affected and how? |
| B2 | **Reza's role:** Which parts did Reza personally design, build, or maintain? Be specific (modules, features, responsibilities) — recruiters check for real ownership |
| B3 | **Team context:** Team size and how work was divided (helps frame individual contribution honestly) |
| B4 | **Key features delivered:** Bullet list, most impressive first |
| B5 | **Hardest technical challenge:** The story — what constraint or failure existed → what options were considered → what was chosen → what happened as a result. Even 3–4 sentences here make the entry stand out |
| B6 | **Scale & impact:** Any numbers — active users, records processed, requests/day, uptime %, hours saved, cost reduced, error rate dropped. Approximate figures marked "~" are fine |
| B7 | **Stack decisions:** Was there a notable choice of technology or architecture? Why that option over alternatives? |

## Section C — Technology

| # | Question |
|---|----------|
| C1 | Full technology list for the project — use **official names** (e.g., "PostgreSQL" not "postgres db"; "Material-UI" not "mui stuff"). These power the website's filter dropdown, so spelling matters |
| C2 | Which of those technologies did Reza work with **hands-on** (as opposed to the wider team)? |

## Section D — Screenshots (please read the guidance)

**Why this matters:** recruiters spend seconds per project; strong visuals are what make them stop scrolling. Screenshots are proof of claims.

### Priority Shot List (in order of value)

1. **Hero shot** — the main dashboard / home panel. The "this looks professional" first impression.
2. **Core workflow** — the single most important user flow, captured mid-action (a form being filled, a process running, results appearing).
3. **Depth shots** — admin panels, configuration screens, role management, reporting builders — anything showing the system handles real complexity.
4. **Data visualization** — charts, monitoring views, generated reports.
5. **Architecture diagram** — if one exists (even hand-drawn or whiteboard photo is acceptable; it can be recreated cleanly later).
6. **Mobile / responsive view** — if the product supports it.

### Technical Requirements

- Desktop captures: hide the bookmarks bar, set browser zoom to **100%**, keep theme consistent across all shots (preferably light).
- Resolution: minimum **1920×1080**. PNG format preferred.
- Capture the **full window**, not tight fragments — partial crops look broken in the gallery layout.
- **Rename files meaningfully** before sending: `<project>_<screen>.png` (e.g., `edc_role_management.png`) — never `Screenshot (62).png`.

### Privacy & Confidentiality Checklist (must pass before sending any image)

- [ ] No real user / patient / client names or record IDs visible
- [ ] No emails, phone numbers, or personal details visible — use dummy/demo data where possible
- [ ] No API keys, tokens, passwords, internal IPs, or internal hostnames visible
- [ ] No licensed third-party content we don't have rights to publish
- [ ] Permission confirmed to publish these images publicly

### D1 — Screenshot Inventory

List every screenshot you can provide, one line each, in this exact format:

```
filename.png | Caption: what the viewer is looking at and why it matters
```

Example:
```
edc_dashboard.png | Main dashboard with collapsed navigation; overlays highlight profile, language, and menu controls
edc_conditional_questions.png | Setup screen where dependency rules between participant questions are defined
```

Captions appear directly under each image in the photo album, so write them for someone seeing the system for the first time.

## Section E — Final Checks

| # | Question |
|---|----------|
| E1 | Anything about this project we must **not** mention publicly (NDA scope, client restrictions, unreleased features)? |
| E2 | If a recruiter only remembers **one thing** about this project, what should it be? |

---

## Fill-in Template (copy, paste, answer)

```
=== PROJECT ===
A1 Title:
A2 One-liner:
A3 Company (public?): 
A4 Period:
A5 URL:

B1 Problem:
B2 Reza's role:
B3 Team context:
B4 Features:
   -
   -
   -
B5 Hardest challenge:
B6 Impact numbers:
B7 Stack decision:

C1 Technologies (official names):
C2 Hands-on by Reza:

D1 Screenshots:
   <file>.png | Caption: ...
   <file>.png | Caption: ...

E1 Must-not-mention:
E2 One thing to remember:
```
