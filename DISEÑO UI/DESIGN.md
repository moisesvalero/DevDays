---
name: DevDays Study Portal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c2c6d6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8c909f'
  outline-variant: '#424754'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e6a'
  primary-container: '#4d8eff'
  on-primary-container: '#00285d'
  inverse-primary: '#005ac2'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffb786'
  on-tertiary: '#502400'
  tertiary-container: '#df7412'
  on-tertiary-container: '#461f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a42'
  on-primary-fixed-variant: '#004395'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdcc6'
  tertiary-fixed-dim: '#ffb786'
  on-tertiary-fixed: '#311400'
  on-tertiary-fixed-variant: '#723600'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.6'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.6'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 64px
  sidebar-width: 280px
  max-content-width: 1200px
---

## Brand & Style

The design system is engineered for deep focus, technical mastery, and professional growth. It targets developers who value efficiency and a "zero-distraction" environment. The aesthetic is rooted in **Minimalism** with a heavy influence from **Corporate Modern** IDEs, specifically focusing on structural clarity and high-density information without the clutter. 

The UI evokes a "Digital Workshop" atmosphere—sophisticated, utilitarian, and premium. By leaning into a flat, border-driven hierarchy rather than shadows, the design system mirrors the mental models of code editors, making it instantly familiar to its technical audience. The emotional response is one of calm, disciplined productivity.

## Colors

The palette is strictly dark-mode-first to reduce eye strain during long study sessions. 

- **Primary Background (#0F0F0F):** The foundational layer for the largest surface areas.
- **Surface/Container (#1A1A1A):** Used for cards, sidebars, and elevated UI components to create subtle tonal separation.
- **Accent (#3B82F6):** A high-energy electric blue reserved for primary actions, progress indicators, and active states.
- **Borders (#2D2D2D):** The primary tool for structural definition. High-precision, low-contrast lines replace the need for shadows.
- **Semantic Colors:** Emerald for success/completion, Ruby for errors/debugging, and Amber for warnings, all calibrated for high legibility against charcoal backgrounds.

## Typography

This design system utilizes a dual-font strategy. **Inter** provides a neutral, highly-legible foundation for all UI elements, navigation, and instructional content. Its geometric yet humanist qualities ensure readability across varying weights.

**JetBrains Mono** is reserved for code snippets, editor blocks, and technical data points. It is optimized for reading logical structures, featuring distinct character shapes that prevent confusion between similar glyphs (e.g., 0 and O).

For mobile devices, `headline-lg` should scale down to 24px and `display-lg` to 32px to maintain visual balance within narrower viewports.

## Layout & Spacing

The layout follows a **Fixed-Fluid hybrid model**. 
- A **fixed sidebar** (280px) on the left handles primary navigation and lesson hierarchies.
- A **fluid main content area** utilizes a 12-column grid system for desktop, transitioning to a single-column stack for mobile.

Spacing is built on an **8px base grid** to ensure mathematical harmony. Gutters are consistently 24px (`md`) for desktop views to provide functional whitespace that aids focus. Margins for page containers are set at 40px (`lg`) on desktop and 16px on mobile.

## Elevation & Depth

This design system avoids traditional drop shadows to maintain its minimalist, flat aesthetic. Instead, depth is communicated through **Tonal Layering** and **Structural Outlines**:

1.  **Level 0 (Background):** The base layer (#0F0F0F).
2.  **Level 1 (Surface):** Cards, sidebars, and navigation bars (#1A1A1A).
3.  **Level 2 (Active/Overlay):** Modals or active dropdowns, also #1A1A1A but emphasized with a brighter border (#3B82F6 or #404040).

All interactive elements must use a 1px solid border (#2D2D2D) to define their boundaries. When an element is hovered or focused, the border color should shift to a higher contrast neutral or the primary blue accent.

## Shapes

The shape language is "Technical-Soft." A **roundedness level of 1 (4px)** is applied to buttons, cards, and input fields. This subtle rounding softens the brutalism of the charcoal palette while maintaining a crisp, professional edge that aligns with modern software development tools.

Icons should follow a 2px stroke weight and use squared-off terminals to match the precision of the typography.

## Components

### Buttons
- **Primary:** Solid #3B82F6 background with white text. 4px radius. No gradient.
- **Secondary:** Ghost style. #2D2D2D border with #FFFFFF text.
- **Tertiary:** Text only, using #3B82F6 for the label.

### Sidebar List Items
Items feature a 4px vertical "indicator bar" on the far left that only appears in the `active` state. Status indicators (dot icons) use semantic colors to show "Completed" (Green), "In Progress" (Blue), or "Locked" (Gray).

### Content Cards
Surface color #1A1A1A with a 1px #2D2D2D border. Padding is set to 24px (`md`). Typography inside cards should be strictly hierarchical, using `label-md` for metadata.

### Code Editor Block
Background #0F0F0F (inset from the card surface). Includes a header bar with the file name in `code-sm` and a "Copy" button. Syntax highlighting should follow a "One Dark" or similar low-contrast theme to integrate with the system palette.

### Input Fields
Background #0F0F0F with a 1px #2D2D2D border. On focus, the border changes to #3B82F6. Use `body-sm` for placeholder text.

### Feedback Panels
Large, flat notification blocks.
- **Success:** Background #10B981 at 10% opacity, 1px solid #10B981 border.
- **Error:** Background #EF4444 at 10% opacity, 1px solid #EF4444 border.