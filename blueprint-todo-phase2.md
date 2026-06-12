# Blueprint Todo - Phase 2 (JavaScript & Polish)

Saved reference for Option B work.

## Fix 5: h3 master checkboxes

Sub-sections like Multi-Theme, Code Splitting, PWA, DNS Verify, Duplicate Content Fix have checkboxes on their `<ol>` items but **no h3-level master checkbox** to check/uncheck them all at once.

**How:**
Extend the JavaScript to also process `<h3>` elements.
```
For each h2's range:
  Find all h3 elements within it
  For each h3:
    Prepend a master checkbox to the h3
    Walk siblings until next h3 or h2
    Collect sub-checkboxes
    Wire master ↔ sub sync
```
The h2 master stays as-is and controls ALL sub-checkboxes including those under h3s.

**Files:** `Website_Buisness_Blueprint.html` (JS section)

---

## Fix 6: Remove auto-collapse on check

Two problems:
1. Checking master auto-collapses the card — hides completed content.
2. Unchecking ANY sub-checkbox auto-expands the card — forces open even if user prefers compact view.

**How:**
Remove the auto-collapse on master check. Remove the auto-expand on sub-check uncheck. Let the collapse icon be the ONLY way to toggle card collapse state.

**Files:** `Website_Buisness_Blueprint.html` (JS section, ~4 lines to remove)

---

## Fix 7: Remove master checkbox from "Strategy Overview"

This is an informational section with no actionable items. A master checkbox here is meaningless.

**How:**
Add h2 exclusion logic in the JS so `h2` elements with `id="strategy-overview"` (or similar) skip master checkbox creation.

**Files:** `Website_Buisness_Blueprint.html` (JS section)

---

## Fix 8: Sync Checklist Summary with step checkboxes

22 items in the summary are completely decoupled from the step-level checkboxes.

**Options:**
- **A:** Remove the standalone Checklist Summary and let step checkboxes serve as single source of truth. Add a progress bar at top: `"14/42 tasks completed"`.
- **B:** Rewrite the summary to derive its state from the step-level data-save-id keys.

**Files:** `Website_Buisness_Blueprint.html` (HTML + JS)

---

## Fix 9: Progress indicator per section

Add a small badge like `3/5` next to each h2/h3 showing completed/total items in that section.

**How:**
JavaScript enhancement: after checkbox state loads, compute counts and insert `<span class="section-progress">3/5</span>` next to each heading.

**Files:** `Website_Buisness_Blueprint.html` (JS section)
