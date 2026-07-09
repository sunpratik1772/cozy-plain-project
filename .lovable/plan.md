
# Fix Plan: API Page Mobile Horizontal Overflow

## Problem Identified
The API Reference page has horizontal overflow on mobile while the Documentation page works correctly. The root cause is a structural difference between the two pages:

**Documentation Page**: Uses `motion.main` directly with `overflow-hidden`
**API Page**: Wraps content in `ScrollArea` component which creates a different overflow context

Additionally, the `ApiTable` component has nested overflow wrappers that conflict with each other.

---

## Solution

### 1. Remove ScrollArea Wrapper from ApiPageContent
Replace the `ScrollArea` wrapper with a regular container that matches the Documentation page structure.

**File**: `src/components/api-reference/ApiPageContent.tsx`

**Changes**:
- Remove the `ScrollArea` import and wrapper
- Use `motion.main` directly as the root element (same as DocPageContent)

```text
Before:
<ScrollArea className="flex-1 min-w-0 w-full">
  <motion.main ...>
    ...
  </motion.main>
</ScrollArea>

After:
<motion.main className="flex-1 min-w-0 px-4 md:px-6 lg:px-12 pt-16 lg:pt-10 pb-10 overflow-hidden">
  ...
</motion.main>
```

---

### 2. Fix ApiTable Nested Overflow
The Table UI component already has `overflow-auto` built in. The outer wrapper in ApiTable should only handle visual styling, not overflow.

**File**: `src/components/api-reference/ApiTable.tsx`

**Changes**:
- Remove `overflow-x-auto` from the outer div wrapper (keep `overflow-hidden` for border-radius clipping)
- The inner Table component already handles horizontal scrolling

---

## Summary of Changes

| File | Change |
|------|--------|
| `ApiPageContent.tsx` | Remove `ScrollArea` wrapper, use `motion.main` directly |
| `ApiTable.tsx` | Remove `overflow-x-auto` from outer div |

This aligns the API page structure with the Documentation page, which is already working correctly on mobile.
