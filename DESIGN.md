---
name: Cerebrum
description: A free, bilingual 3D atlas of the human brain, presented as a reading session at a neuroimaging workstation.
colors:
  film-ground: "#121518"
  viewer-panel: "#0a0c0e"
  slice-panel: "#0b0b0b"
  letterbox: "#0d0d0e"
  render-panel: "#15171a"
  section-panel: "#181c20"
  panel-hover: "#1f2429"
  panel-selected: "#23282e"
  film-gap: "#050607"
  rule: "#2a3036"
  rule-strong: "#4a525a"
  scrollbar-thumb: "#3a4148"
  tissue: "#e7eaec"
  tissue-2: "#aab1b8"
  tissue-3: "#818a92"
  ink-on-tissue: "#0b0d0f"
  crosshair: "#9b6bff"
  crosshair-light: "#b99cff"
  crosshair-dim: "rgba(155, 107, 255, 0.55)"
typography:
  display:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(32px, 3.65vw, 62px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.03em"
    fontVariation: "'wdth' 125"
  display-close:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(36px, 5.4vw, 84px)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(30px, 3.6vw, 52px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.028em"
    fontVariation: "'wdth' 118"
  title-lg:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(26px, 2.6vw, 36px)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 120"
  title:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "21px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 110"
  title-sm:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.005em"
    fontVariation: "'wdth' 108"
  wordmark:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 800
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  lead:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    fontVariation: "'wdth' 100"
  body-sm:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "15.5px"
    fontWeight: 400
    lineHeight: 1.6
  instruction:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.5
  nav:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
  button:
    fontFamily: "Archivo, Segoe UI, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 650
  data:
    fontFamily: "Red Hat Mono, ui-monospace, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'tnum' 1"
  data-strong:
    fontFamily: "Red Hat Mono, ui-monospace, Consolas, monospace"
    fontSize: "12.5px"
    fontWeight: 500
    lineHeight: 1.5
    fontFeature: "'tnum' 1"
rounded:
  none: "0px"
  focus: "2px"
  control: "3px"
  toggle: "4px"
  reticle: "50%"
spacing:
  film-gap: "2px"
  overlay-inset-y: "14px"
  overlay-inset-x: "16px"
  gutter-phone: "16px"
  gutter: "28px"
  block: "48px"
  block-lg: "56px"
  station-phone: "88px"
  station: "120px"
  toolbar: "52px"
  container: "1240px"
components:
  button-open:
    backgroundColor: "{colors.tissue}"
    textColor: "{colors.ink-on-tissue}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "14px 18px 14px 20px"
  button-open-hover:
    backgroundColor: "#ffffff"
    textColor: "{colors.ink-on-tissue}"
  button-outline:
    backgroundColor: "rgba(10, 12, 14, 0.55)"
    textColor: "{colors.tissue}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "13px 16px"
  nav-station:
    textColor: "{colors.tissue-3}"
    typography: "{typography.nav}"
    padding: "0 14px"
    height: "{spacing.toolbar}"
  nav-station-active:
    textColor: "{colors.tissue}"
  toolbar:
    backgroundColor: "{colors.viewer-panel}"
    textColor: "{colors.tissue}"
    height: "{spacing.toolbar}"
    padding: "0 20px"
  lang-toggle:
    textColor: "{colors.tissue-3}"
    typography: "{typography.data}"
    rounded: "{rounded.toggle}"
    padding: "6px 10px"
  lang-toggle-active:
    backgroundColor: "{colors.crosshair-dim}"
    textColor: "#ffffff"
  viewer-panel:
    backgroundColor: "{colors.viewer-panel}"
    rounded: "{rounded.none}"
  slice-panel:
    backgroundColor: "{colors.slice-panel}"
    rounded: "{rounded.none}"
  render-panel:
    backgroundColor: "{colors.render-panel}"
    rounded: "{rounded.none}"
  screenshot-frame:
    backgroundColor: "{colors.letterbox}"
    rounded: "{rounded.none}"
  action-strip:
    backgroundColor: "{colors.viewer-panel}"
    padding: "20px"
  section-panel:
    backgroundColor: "{colors.section-panel}"
    rounded: "{rounded.none}"
    padding: "28px"
  corner-overlay:
    textColor: "{colors.tissue-2}"
    typography: "{typography.data}"
  corner-overlay-render:
    textColor: "{colors.tissue-2}"
    typography: "{typography.data}"
    width: "15.5rem"
  viewer-instruction:
    textColor: "{colors.tissue-2}"
    typography: "{typography.instruction}"
  annotation-tag:
    backgroundColor: "rgba(10, 12, 14, 0.82)"
    textColor: "{colors.tissue-2}"
    typography: "{typography.data}"
    padding: "3px 7px"
  annotation-row:
    textColor: "{colors.tissue-2}"
    typography: "{typography.data}"
    padding: "10px 14px"
  series-tab:
    backgroundColor: "{colors.section-panel}"
    textColor: "{colors.tissue-2}"
    padding: "10px 14px 10px 10px"
  series-tab-hover:
    backgroundColor: "{colors.panel-hover}"
  series-tab-selected:
    backgroundColor: "{colors.panel-selected}"
    textColor: "{colors.tissue}"
  link:
    textColor: "{colors.crosshair-light}"
---

# Design System: Cerebrum

## Overview

**Creative North Star: "The Reading Workstation"**

Every surface is a study open on a neuroimaging workstation. Grounds are radiographic film grays, content sits in near-black viewer panels separated by hairline film gaps, and the only color in the room is Cerebrum's violet, used the way a viewer uses its crosshair: to mark where you are and what is active. Imagery is the model itself, grayscale slices generated from Cerebrum's own voxel data and the real 3D render, never stock or illustration.

Two voices carry the type. Archivo, pushed wide (108% to 125% on its width axis) and heavy (700 to 800), speaks in display and titles with the weight of a poster. Red Hat Mono, small and in sentence case, speaks as the scanner: corner overlays, counts, slice indices, series labels and license codes, always with tabular figures. Body copy stays plain Archivo at normal width, in tissue gray, generously leaded.

Density is that of a reading room: panels tile edge to edge in grids divided by 2px gaps, and the space between stations is large (120px). Depth is tonal, not lifted. Motion is reserved for the instrument (scrubbing a slice stack, moving the crosshair); chrome only crossfades color.

**Key Characteristics:**
- Cool film-gray grounds; viewer panels darker than the ground, each matched to the base of the imagery it holds so images sit seamlessly.
- One accent, violet, reserved for crosshair, active state, focus and links.
- Panels tiled in grids with 2px film-gap rules; no rounded containers, no blur, no gradients.
- Corner-overlay data voice in Red Hat Mono, sentence case, tabular numerals.
- Wide, heavy Archivo display with tight negative tracking.

## Colors

A cool, near-neutral gray ladder (blue-slate cast, hue about 210) from film gap to tissue, with a single violet accent.

### Primary
- **Crosshair Violet** (crosshair): the viewer's crosshair lines and reticle, the active station underline, the selected series ring, the trailing period of the wordmark "Cerebrum.", icon tint inside the primary button, and the 1px corner brackets that frame screenshots. Drawn on canvas at 62% opacity for the long reference lines and solid for the 6px reticle circle.
- **Crosshair Light** (crosshair-light): text-weight violet for inline links (underlined at 45% opacity, full on hover) and the 2px focus outline. Use this, not the base violet, wherever violet is text or a focus ring.
- **Crosshair Dim** (crosshair-dim): translucent violet fill for a pressed toggle segment (ES/EN). Text on it is white.

### Neutral
- **Film Ground** (film-ground): the page background and browser theme color.
- **Viewer Panel** (viewer-panel): the opaque toolbar (no blur), the solid action strip under a viewer on mobile, and the inside of screenshot viewers and thumbnails. Deliberately darker than the ground.
- **Slice Panel** (slice-panel): the neutral near-black of every slice viewer and its canvas clear color. Slice sprites are rendered with this exact value as their background, so a slice shows no square edge inside its panel.
- **Letterbox** (letterbox): the ground behind an app screenshot shown whole (contain fit), matched to the app's own dark ground so the letterbox bars read as part of the capture.
- **Render Panel** (render-panel): ground behind the 3D render, slightly lifted so the render (blended with `lighten`) separates from slice panels.
- **Section Panel** (section-panel): text panels that sit beside viewers (feature columns, neuroscience captions, series tabs and detail bars).
- **Panel Hover / Panel Selected** (panel-hover, panel-selected): the two steps a selectable panel climbs on hover and selection.
- **Film Gap** (film-gap): the near-black that shows through the 2px gaps between tiled panels, and the 2px frame around panel grids.
- **Rule** (rule): 1px hairlines: toolbar bottom border, list and table rows, section dividers, toggle outline, thumbnail outlines.
- **Rule Strong** (rule-strong): the outline of secondary buttons. Hover lifts it to tissue-2.
- **Tissue** (tissue): primary text, headings, and the fill of the primary button.
- **Tissue 2** (tissue-2): body and lead copy, overlay text, descriptions.
- **Tissue 3** (tissue-3): tertiary text: inactive nav, footnotes, route captions, footer.
- **Ink on Tissue** (ink-on-tissue): text on the light primary button.

### Named Rules
**The Crosshair Rule.** Violet means "here" or "active": position, selection, focus, link. It never fills a panel, a section background or a large shape, and it is never decoration.

**The Darker Panel Rule.** A viewer panel is always darker than the ground it sits on (viewer-panel, slice-panel and letterbox all below film-ground). Imagery with a dark base sits in viewer panels, never on the ground or on section panels.

**The Seamless Base Rule.** A panel takes the base color of the imagery it holds, and generated imagery is rendered on the panel's color. No image ever shows its own rectangle inside a viewer.

## Typography

**Display Font:** Archivo variable (width 62–125%, weight 100–900), self-hosted, with Segoe UI and system-ui as fallback
**Body Font:** Archivo at normal width (100%)
**Label/Mono Font:** Red Hat Mono variable (weight 300–700), self-hosted, with ui-monospace and Consolas as fallback

**Character:** A wide, heavy grotesk that reads like the header of a film jacket, set against a quiet scanner monospace. The width axis is the hierarchy device: the more important the line, the wider it is set.

### Hierarchy
- **Display** (800, width 125%, clamp 32–62px, line-height 1.02, tracking -0.03em, balanced wrap): the one first-viewport headline.
- **Display Close** (800, width 125%, clamp 36–84px, 0.98): the closing call to action only.
- **Headline** (800, width 118%, clamp 30–52px, 1.04, -0.028em, max 18ch): station headings.
- **Title Large** (800, width 116–120%, clamp 24–36px): the heading of a selected item's detail (series detail, author name).
- **Title** (700, width 110–112%, 21px, 1.2): captions under viewers, route steps.
- **Title Small** (700, width 106–108%, 17–19px): feature-column headings, tab names, definition terms (650 at 106%).
- **Lead** (400, 19px, 1.6, max 62ch, tissue-2): the paragraph under each station heading.
- **Body** (400, 17px, 1.6): running text; secondary paragraphs at 15.5px in tissue-2, held to 56–62ch.
- **Instruction** (Archivo 400, 13–13.5px, 1.5, tissue-2): human-language lines inside a viewer: how to use it ("Mueve el puntero sobre un corte…"), product facts beside the 3D render; held to about 24ch when overlaid.
- **Data** (Red Hat Mono 400, 12.5px, 1.5, tabular figures, tissue-2; emphasis at 500 in tissue): corner overlays, counts, series tags, license codes, language codes.

### Named Rules
**The Width Ladder Rule.** Importance is expressed by width first: 125% for display and wordmark, 116–120% for headlines and large titles, 106–112% for titles, 100% for body. Never set body copy wide, and never set display at normal width.

**The Scanner Voice Rule.** Anything the instrument "reports" (plane, slice index, counts, series path, license) is set in Red Hat Mono, sentence case, never uppercase, with numbers emphasized in tissue at 500 and the label in tissue-2. Anything said to a person (instructions, product facts, calls to action) is Archivo, even when it sits in a viewer corner. Mono is for data only.

## Layout

The first viewport is a full-height 2×2 viewer under a 52px sticky toolbar: columns 1.14fr / 0.86fr, rows 1.2fr / 0.8fr, 2px gaps over film-gap, height `100svh` minus the toolbar (clamped 620–1100px). Text and actions sit as overlays inside panels, never in a separate band.

Below it, content runs in fixed stations inside a 1240px container with 28px gutters (16px under 560px), 120px apart (88px under 980px). Each station opens with a headline and lead, then a panel grid 44–56px below: asymmetric two-column splits (1.55fr / 1fr image plus text column; 1.6fr / 1fr lead image spanning two rows; a fixed 300px tab list beside a detail viewer). Lists and references are ruled tables (1px rule above and between rows) rather than cards; a four-step route is a ruled line with nodes.

Breakpoints: at 980px the station nav hides, the viewer reflows to a stacked grid (headline above the axial slice, primary action right after the headline, a single line of counts below the viewer), every panel grid collapses to one column and the series tabs become a 2×2 grid. Overlays that would cover imagery leave it: the 3D panel's corner text and actions move into a solid viewer-panel action strip under the render (1px rule on top, 20px padding). At 560px gutters drop to 16px and secondary slice overlays hide.

## Elevation & Depth

Flat and tonal. Depth comes from the gray ladder (film gap, viewer panel, ground, section panel, hover, selected) and from panels being recessed below the ground, like lightbox film. Overlays that sit on imagery use a translucent viewer-panel scrim (55% for secondary buttons, 78–82% for data tags) without blur.

### Shadow Vocabulary
- **Action lift** (`box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.8)`): only on the primary button, so it holds its edge where it floats over a viewer image.
- **Selection ring** (`box-shadow: inset 0 0 0 1px crosshair`): a 1px inset violet ring marking the selected panel in a tab list; it is a border, not elevation.

### Named Rules
**The Lightbox Rule.** Nothing floats above the page except the primary action. Panels are separated by gaps and tone, never by drop shadows.

## Shapes

Square by default. Panels, viewers, grids and images have no radius (0). Controls carry a barely-there radius: 3px on buttons, 4px on the toggle group and icon buttons, 2px on focus outlines. Circles exist only as instrument marks: the crosshair reticle (6px radius stroke) and the 7px route nodes (hollow with violet stroke, filled on the final step). Screenshots are framed by two 18px violet corner brackets (top-left and bottom-right, 1px, inset 10px), the viewer's region-of-interest mark.

## Components

### Buttons
Calm, solid, few.
- **Shape:** gently squared (3px), icon 18px with 1.8px stroke, 12px gap.
- **Primary ("Open"):** tissue fill, ink text, 650 weight 15px, padding 14px 18px 14px 20px, violet arrow icon at 2.2px stroke, action lift shadow. Hover goes to pure white. One per view; a compact variant (12px 16px 12px 18px) sits inside detail bars.
- **Secondary (outline):** tissue text, 1px rule-strong border, translucent viewer-panel scrim; hover lifts the border to tissue-2. Used for GitHub, download and contact.
- **Hover / Focus:** 0.2s color, background and border transitions only; focus is a 2px crosshair-light outline offset 3px.

### Navigation (toolbar)
- **Style:** 52px sticky bar in viewer-panel with a 1px rule bottom border; wordmark left ("Cerebrum" with a violet period), station links, then ES/EN toggle and a GitHub icon button right.
- **Station links:** 14px Archivo in tissue-3, full-height hit area; hover to tissue; the current station gets tissue text and a 2px violet bottom border.
- **Language toggle:** a 1px-ruled segmented pair in Red Hat Mono 12px; the pressed segment fills crosshair-dim with white text.
- **Mobile:** station links hide under 980px; wordmark, toggle and GitHub stay.

### Viewer Panel (signature)
The core unit of the world. A near-black cell holding a canvas or image, tiled with siblings over film-gap with 2px gaps: slice viewers use slice-panel, the 3D viewer render-panel, screenshot viewers viewer-panel. Slices are grayscale renders of the model's own data, 36 frames per plane, drawn on the panel's own color; violet reference lines (1px at 62%) cross the full panel edge to edge with a 10px break around a 6px violet reticle. Hovering moves the crosshair across all linked panels; drag or wheel scrubs the panel's own stack. Under reduced motion, a static mid-stack slice is shown.

### Corner Overlay
DICOM-style data in the four corners of a viewer, 14px from top or bottom and 16px from the side, right-aligned on the right. Red Hat Mono 12.5px, tissue-2, with the plane name and numbers in tissue at 500, e.g. "**Axial** · corte 18 de 36". Never interactive except an inline link. Over the 3D render the top-left block is held to a 15.5rem column so it never crosses the model; product facts in it use the instruction voice. On phones slice overlays get a 78% viewer-panel scrim, and the 3D block moves into the action strip.

### Annotation Tag and Corner Brackets
Screenshots inside panels carry the two violet corner brackets and a "**Serie** · path" data tag. When the screenshot is cropped to fill (cover), the tag overlays its bottom-left corner on an 82% viewer-panel scrim (3px 7px padding). When the whole app screenshot is shown (contain on letterbox), the tag sits in its own row under the image with no scrim (10px 14px padding), so nothing covers the capture.

### Series Tabs
A vertical stack of selectable section-panel rows (96×72 thumbnail with a 1px rule outline, name in title-small, descriptor in tissue-2) beside a detail viewer. Hover steps to panel-hover; selected steps to panel-selected with the inset violet ring and a violet thumbnail outline.

### Ruled Lists (informe, licenses, route)
References and licenses are definition lists and tables with a 1px rule above every row: term in tissue (650, width 106%), detail in tissue-2 at 15.5px, codes in the data voice right-aligned. The route is a four-column ruled line whose nodes sit on the rule.

### Section Panel
Text that accompanies a viewer sits in a section-panel cell inside the same gap grid, padded 22–28px, with internal items divided by 1px rules.

## Do's and Don'ts

### Do:
- **Do** put imagery in viewer panels darker than the film ground, match each panel to its imagery's base (slice-panel for slices, letterbox for whole screenshots), and tile panels over film-gap with 2px gaps.
- **Do** reserve violet for crosshair, active, selected, focus and link states; use crosshair-light for violet text and focus rings.
- **Do** set every instrument reading (plane, slice, counts, series, license) in Red Hat Mono 12.5px, sentence case, tabular figures.
- **Do** climb the Archivo width axis with importance: 125% display, 116–120% headlines, 106–112% titles, 100% body.
- **Do** use real material from the model (voxel slices, the 3D render, app screenshots) as the only imagery, framed with violet corner brackets; show a full app screenshot whole, with its annotation below it.
- **Do** move overlays off the imagery into a solid action strip when the viewport is too narrow to keep them clear of the subject.
- **Do** keep chrome motion to 0.2s color crossfades and keep scrubbing as the only movement, with a static fallback under reduced motion.

### Don't:
- **Don't** round containers or add card shadows; only controls get 3–4px corners, and only the primary action carries a shadow.
- **Don't** use gradients or backdrop blur; translucency is limited to flat viewer-panel scrims over imagery.
- **Don't** fill large areas, sections or panels with violet.
- **Don't** set the data voice in uppercase or with letter-spacing, and don't put prose in monospace.
- **Don't** place dark-based imagery directly on the film ground or on section panels, or let an image's own background rectangle show inside its panel.
