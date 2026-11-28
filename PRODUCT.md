# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- **Health-science students** (medicine, psychology, nursing and related degrees) studying neuroanatomy and neuroscience, often on their own, on personal or school computers.
- **High-school students** meeting the nervous system in biology.
- **Teachers and universities** who use Cerebrum in class or share it as a teaching resource.

Spanish-speaking users are the core audience; every surface is also available in English.

## Product Purpose

Cerebrum is a free, interactive 3D atlas of the human brain plus cellular neuroscience. It replaces flat diagrams with a model the student explores level by level (brain → division → lobe or part → structure). Every structure has an entry: location and anatomy, function, contents, blood supply, clinical relevance and cited sources. Success means a student understands where a structure is and what it does, and a teacher can rely on the content to teach.

## Positioning

- Free and open source (GNU GPL-3.0); schools and universities may use and share it freely.
- Bilingual (Spanish / English).
- Every fact is traced to high-trust medical sources (NCBI StatPearls, MSD Manual, MedlinePlus, PubMed, WHO, textbooks: Kandel, Purves, Snell, Guyton), cited with links in each entry.
- Cellular neuroscience you can manipulate: six neuron types in 3D, a real-time Hodgkin-Huxley action-potential simulation, chemical and electrical synapses, nine neurotransmitters.
- Works offline as a single HTML file and on modest computers (automatic light mode).
- Transparent about the use of AI in its development.

## Operating Context

- Published on GitHub Pages: https://mistery-peregrinus.github.io/Cerebrum-3D/ ; source at https://github.com/mistery-peregrinus/Cerebrum-3D.
- The landing page (index.html) is the single link the author sends to people; it links to each app version and to the repository.
- App versions, all with the same content: Original (dark design, procedural model, `cerebrum.html`), Light (`clear.html`), Hyper-realistic (real anatomy from BodyParts3D, heavier, `hiperrealista.html`) and Alternate (the procedural "Experimental 2" model with deep sulci and translucent material, `alterna.html`).
- Users open it in Chrome, Edge or Firefox, frequently on school computers with limited hardware.

## Capabilities and Constraints

- Static site, no build step for the landing; must work on GitHub Pages and offline-downloaded apps open by double click.
- The apps are single self-contained HTML files (~10 MB each).
- Language selection carries from the landing into the app via `#lang=es|en`.
- Hyper-realistic version is the heaviest; best on computers with a graphics card.
- Content is educational and does not replace a health professional (this notice must stay visible).

## Brand Commitments

- Name: **Cerebrum** (Latin), written with a trailing accent-colored period: "Cerebrum."
- Author: Maximiliano Morales Domínguez, intellectual author. Contact email shown publicly by the author's choice: as.1759616@gmail.com.
- AI disclosure, in the author's own wording: AI tools (Claude Opus 5.5, by Anthropic) supported the development, especially programming, 3D modeling and gathering of information; the academic sources were carefully selected by the author.
- The hyper-realistic version must not be labeled "experimental"; the original must not be labeled "recommended" (author's instruction).

## Evidence on Hand

- Screenshots of every version and of the neuroscience modes, ES and EN, in `img/`.
- Real counts: 100+ anatomy entries (109), 4 brain divisions, 6 neuron types, 9 neurotransmitters, 2 languages.
- Licenses: Cerebrum GPL-3.0; BodyParts3D © The Database Center for Life Science, CC BY 4.0 (attribution required, no endorsement implied); Three.js, three-mesh-bvh, Vite MIT; fonts SIL OFL 1.1.
- No testimonials, adoption figures, institutional partners or press exist. Do not invent them.

## Product Principles

1. Rigor first: nothing is stated without a source; no inflated claims.
2. Accessible to everyone: free, bilingual, offline-capable, usable on modest hardware.
3. Learn by exploring: structure the experience from the whole to the detail.
4. Honest authorship: credit the author's work and disclose the tools.

## Accessibility & Inclusion

Must remain usable on low-end school computers and slow connections; readable in Spanish and English.
