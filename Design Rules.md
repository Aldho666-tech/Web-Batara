# Gemini Antigravity — Design Rules from PDF Reference

## 1. PRIMARY DESIGN REFERENCE

The provided PDF is the **PRIMARY and AUTHORITATIVE DESIGN REFERENCE**.

Treat the PDF as the single source of truth for the visual design and UI implementation.

Do **NOT** redesign, reinterpret, modernize, simplify, or replace the visual direction from the PDF unless explicitly instructed by the user.

When there is a conflict between your own design preference and the PDF reference, **ALWAYS prioritize the PDF**.

The goal is to reproduce the visual language, hierarchy, spacing, proportions, components, and overall design character of the PDF as accurately as possible.

---

## 2. VISUAL ANALYSIS BEFORE CODING

Before modifying or creating any UI, analyze the PDF reference carefully.

Identify and follow:

- Overall visual style
- Layout structure
- Grid system
- Content width
- Spacing and padding
- Section spacing
- Alignment
- Typography hierarchy
- Font sizes
- Font weights
- Line heights
- Letter spacing
- Color palette
- Background colors
- Border styles
- Border radius
- Shadows
- Cards
- Buttons
- Navigation
- Icons
- Images
- Illustrations
- Decorative elements
- Visual hierarchy
- Component proportions
- Responsive behavior implied by the design

Do not begin implementation based only on a superficial visual impression.

---

## 3. LAYOUT

Match the PDF's layout structure as closely as possible.

Follow the same:

- Positioning
- Alignment
- Relative proportions
- Section ordering
- Column structure
- Content hierarchy
- Whitespace
- Visual balance

Do not arbitrarily move elements simply because another layout may seem cleaner.

Avoid unnecessary redesign.

If the PDF uses asymmetric layouts, preserve the asymmetry.

If the PDF uses large whitespace, preserve the whitespace.

If the PDF uses overlapping elements, preserve the overlapping relationship.

---

## 4. TYPOGRAPHY

Typography must closely match the reference.

Prioritize:

1. Font family
2. Font weight
3. Font size
4. Line height
5. Letter spacing
6. Text width
7. Text alignment
8. Text hierarchy

If the exact font is unavailable, select the closest visually matching alternative.

Do **NOT** randomly substitute fonts.

Headings, subheadings, body text, labels, captions, and buttons must have clearly defined hierarchy consistent with the PDF.

Do not make typography unnecessarily large, bold, condensed, or decorative.

---

## 5. COLOR

Extract the visual color system from the PDF and reproduce it consistently.

Follow the reference for:

- Primary colors
- Secondary colors
- Accent colors
- Background colors
- Text colors
- Muted text
- Borders
- Cards
- Buttons
- Hover states

Do **NOT** introduce additional colors without a clear design reason.

Do **NOT** change the color palette simply because another palette seems more attractive.

The PDF's color language takes priority.

---

## 6. SPACING

Spacing is a critical part of the design.

Maintain consistency in:

- Page margins
- Section padding
- Component padding
- Element gaps
- Text spacing
- Card spacing
- Button spacing
- Navigation spacing

Do not compress the design unnecessarily.

Do not add excessive spacing that changes the composition.

When uncertain, compare the implementation against the PDF visually and adjust proportions accordingly.

---

## 7. COMPONENTS

Reusable components should follow the exact visual language of the PDF.

Examples:

- Header
- Navigation
- Hero section
- Cards
- Buttons
- Forms
- Tabs
- Badges
- Footer
- Content sections
- Image containers

Create reusable components when the same visual pattern appears multiple times.

Do not create visually inconsistent variations of the same component unless the PDF explicitly shows different variants.

---

## 8. IMAGES AND GRAPHICS

Images must follow the visual treatment shown in the PDF.

Match:

- Aspect ratio
- Crop
- Position
- Size
- Corner radius
- Image container
- Overlay
- Composition

Do not replace important imagery with generic AI-generated visual elements unless explicitly instructed.

Do not add decorative graphics that are not present in the reference.

---

## 9. ICONS

Use icons that visually match the PDF.

Maintain consistency in:

- Style
- Stroke weight
- Size
- Proportion
- Spacing

Do not mix unrelated icon styles.

If the PDF uses minimal line icons, do not replace them with filled icons.

---

## 10. RESPONSIVE DESIGN

The desktop implementation should reproduce the PDF reference as closely as possible.

For tablet and mobile:

- Preserve the same visual hierarchy
- Preserve the same design language
- Preserve important proportions
- Adapt the layout only when necessary for screen size
- Do not redesign the interface into a different visual style

Responsive adaptation should feel like the same design system, not a completely different design.

---

## 11. DO NOT INVENT DESIGN

Do not invent new visual patterns when the PDF already provides a reference.

Do not:

- Add unnecessary gradients
- Add unnecessary shadows
- Add random animations
- Add excessive rounded corners
- Add random glassmorphism
- Add random illustrations
- Add decorative shapes
- Add extra colors
- Add unnecessary borders
- Add excessive hover effects
- Add UI elements that are not represented in the reference

Avoid generic "AI-generated website" aesthetics.

The result should look intentionally designed, not like a template generated by an AI.

---

## 12. DESIGN FIDELITY

The implementation should be judged by visual similarity to the PDF.

Before considering a section complete, compare it against the reference and check:

- Is the hierarchy correct?
- Is the spacing correct?
- Are the proportions correct?
- Are the colors correct?
- Is the typography correct?
- Are the components visually consistent?
- Is the alignment correct?
- Does the overall composition feel like the PDF?

If the answer is no, revise the implementation.

---

## 13. PRESERVE EXISTING FUNCTIONALITY

When modifying an existing project:

**DO NOT break existing functionality just to reproduce the design.**

Preserve:

- Existing routes
- Existing interactions
- Existing data
- Existing API integrations
- Existing functionality
- Existing business logic

Design changes should affect the presentation layer whenever possible.

If a design change requires structural changes, make the smallest necessary modification.

---

## 14. CODE QUALITY

Keep the implementation:

- Clean
- Modular
- Reusable
- Maintainable
- Responsive
- Consistent

Avoid unnecessary duplication.

Avoid hardcoding values repeatedly when they can be represented as reusable design tokens or variables.

Create reusable variables for important design properties such as:

- Colors
- Font sizes
- Spacing
- Border radius
- Shadows
- Container widths

---

## 15. DESIGN TOKENS

Create a consistent design system based on the PDF.

For example:

```text
PRIMARY_COLOR
SECONDARY_COLOR
BACKGROUND_COLOR
TEXT_PRIMARY
TEXT_SECONDARY
BORDER_COLOR

FONT_HEADING
FONT_BODY

SPACING_XS
SPACING_SM
SPACING_MD
SPACING_LG
SPACING_XL

RADIUS_SM
RADIUS_MD
RADIUS_LG
```

The exact values must be determined from the PDF/reference rather than invented arbitrarily.

---

## 16. VISUAL QA

After implementation, perform a visual QA pass.

Compare the result with the PDF reference.

Check every major section individually.

Prioritize fixing:

1. Layout differences
2. Incorrect spacing
3. Incorrect typography
4. Incorrect colors
5. Incorrect component sizing
6. Incorrect alignment
7. Missing visual elements
8. Unnecessary visual elements

Do not stop at "the page works."

The page must also visually match the provided reference.

---

## 17. IMPORTANT PRIORITY ORDER

When making design decisions, use this priority:

1. PDF reference
2. Explicit user instructions
3. Existing project requirements
4. Existing functionality
5. Responsive requirements
6. General design best practices
7. Your own design assumptions

Never reverse this priority.

---

## 18. FINAL RULE

**DO NOT DESIGN FROM YOUR IMAGINATION.**

READ THE PDF.  
ANALYZE THE PDF.  
IMPLEMENT THE PDF.  
COMPARE THE RESULT WITH THE PDF.  
REFINE UNTIL THE IMPLEMENTATION IS VISUALLY CONSISTENT WITH THE PDF.

**The PDF is the design authority.**
