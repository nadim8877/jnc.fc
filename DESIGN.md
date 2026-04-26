---
name: PitchSide Marketplace
colors:
  surface: '#111317'
  surface-dim: '#111317'
  surface-bright: '#37393e'
  surface-container-lowest: '#0c0e12'
  surface-container-low: '#1a1c20'
  surface-container: '#1e2024'
  surface-container-high: '#282a2e'
  surface-container-highest: '#333539'
  on-surface: '#e2e2e8'
  on-surface-variant: '#b9cbb9'
  inverse-surface: '#e2e2e8'
  inverse-on-surface: '#2f3035'
  outline: '#849584'
  outline-variant: '#3b4b3d'
  surface-tint: '#00e476'
  primary: '#f0ffee'
  on-primary: '#003919'
  primary-container: '#00ff85'
  on-primary-container: '#007137'
  inverse-primary: '#006d35'
  secondary: '#f7aff2'
  on-secondary: '#501852'
  secondary-container: '#6a306a'
  on-secondary-container: '#e49ee0'
  tertiary: '#fcf9ff'
  on-tertiary: '#00228a'
  tertiary-container: '#d8dcff'
  on-tertiary-container: '#0949ff'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#61ff97'
  primary-fixed-dim: '#00e476'
  on-primary-fixed: '#00210c'
  on-primary-fixed-variant: '#005227'
  secondary-fixed: '#ffd6f8'
  secondary-fixed-dim: '#f7aff2'
  on-secondary-fixed: '#37003b'
  on-secondary-fixed-variant: '#6a306a'
  tertiary-fixed: '#dde1ff'
  tertiary-fixed-dim: '#b9c3ff'
  on-tertiary-fixed: '#001257'
  on-tertiary-fixed-variant: '#0033c0'
  background: '#111317'
  on-background: '#e2e2e8'
  surface-variant: '#333539'
typography:
  headline-xl:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  stat-value:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '700'
    lineHeight: '1.0'
    letterSpacing: 0.05em
  stat-label:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
  label-sm:
    fontFamily: Lexend
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 1.5rem
  margin-mobile: 1rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

The brand personality is energetic, elite, and accessible. It targets a competitive gaming demographic that values speed, clarity, and the "pro-league" aesthetic of modern football broadcasting. The UI should evoke the feeling of a premium sports data dashboard mixed with the effortless scroll of a high-end social media feed.

The design system utilizes **Minimalism** with a **Tactile** edge. It leans on heavy whitespace to ensure "stats-heavy" cards remain readable, while using subtle gradients and glass-like overlays to mimic the high-tech visual language of sports telemetry. The goal is a "Pro-Direct" feel: clean, performance-oriented, and vibrant.

## Colors

The palette is rooted in the "Pitch and Night" concept. The primary color is a high-visibility **Pitch Green**, used exclusively for calls to action, price highlights, and "Live" indicators. The secondary color is a **Deep Pitch Purple**, providing a sophisticated, premium alternative to standard blacks for backgrounds.

**Vibrant Blue** serves as the accent for navigational elements and verified badges, ensuring a connection to global football branding. The background is a custom **Off-Black Neutral** to reduce eye strain during long browsing sessions while maintaining high contrast for the neon primary accents.

## Typography

This design system employs **Lexend** as the primary typeface for its exceptional readability and "athletic" geometry. It provides an active, motivating feel that bridges the gap between a tech product and a sports brand. 

For technical data—specifically player stats, ID ratings, and prices—**Space Grotesk** is used. Its monospaced-adjacent qualities and futuristic terminals give the "stats" a precise, digitized look reminiscent of on-screen match day graphics. All statistical labels should be uppercase to emphasize the data-driven nature of the marketplace.

## Layout & Spacing

The design system follows a **Fixed Grid** model for desktop and a **Fluid Stack** for mobile. The central content area is constrained to 1280px to maintain focus on the feed. 

The layout utilizes a "Social Feed" architecture: a narrow left sidebar for navigation, a wide central column for the ID marketplace cards, and a right sidebar for "Trending Player Cards" or "Market Insights." Spacing is generous to prevent the dense statistical data from feeling cluttered, using an 8px base grid to ensure all elements align to a rhythmic "pitch" layout.

## Elevation & Depth

Hierarchy is established through **Tonal Layers** and **Glassmorphism**. Since the interface is dark-mode by default, depth is created by lifting cards with slightly lighter surface colors rather than heavy shadows.

- **Surface 0 (Background):** The deepest neutral color.
- **Surface 1 (Cards):** A slightly lighter navy/grey with a 1px low-contrast border.
- **Surface 2 (Hover/Active):** A glassmorphic effect with a 10% white overlay and backdrop blur.

Shadows, when used, are "Ambient Glows"—highly diffused and tinted with the primary Pitch Green or Tertiary Blue, used only to signify a selected or "Featured" marketplace post.

## Shapes

The design system uses a **Rounded** shape language to balance the aggressive "sporty" colors with a modern, friendly social media feel. 

Buttons and Input fields use a 0.5rem radius, while Marketplace Cards use the `rounded-xl` (1.5rem) setting to create a distinct containerized look that stands out against the dark background. This softness makes the interface feel approachable and "app-like," encouraging casual browsing.

## Components

**Marketplace Cards:** The core component. These must feature a "Hero" area for the squad screenshot, a dedicated "Stats Grid" using Space Grotesk, and a footer with "Price" and "WhatsApp/Contact" quick-actions. Use a social-media-style header with a user avatar and timestamp.

**Buttons:** 
- *Primary:* Pitch Green background, black text, bold weight. 
- *Secondary:* Ghost style with a 1px Tertiary Blue border.
- *Action:* Full-width on mobile to mimic Instagram/Facebook call-to-action buttons.

**Chips:** Used for "Player Style" (e.g., "Goal Poacher") or "Platform" (e.g., "Mobile", "Console"). These should have a subtle background tint of the accent blue with high-contrast text.

**Input Fields:** Minimalist design with only a bottom border that glows Pitch Green when focused. Labels should always be visible in the "stat-label" typography style.

**Navigation:** A "floating" bottom bar for mobile users and a vertical icon-plus-label sidebar for desktop, emphasizing a "Login-Free" experience by prioritizing the "Search" and "Filter" icons.