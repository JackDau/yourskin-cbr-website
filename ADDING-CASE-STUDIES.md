# Adding Case Studies to YourSkinCBR

## Quick Steps

1. **Provide photos** to Claude Code (before/after images, any angles)
2. Claude places them in `images/case-studies/` with descriptive filenames
3. Claude adds an HTML card to `case-studies/index.html`
4. Commit and push — live on GitHub Pages within seconds

## What to provide for each case

- **Title** (e.g. "Basal Cell Carcinoma — Nose")
- **Treatment type** (e.g. "Skin Cancer", "Suspicious Lesion")
- **Description** — 1-2 sentences about the case
- **Before/after images** — patient-consented photos
- **Treatment** — what was done (e.g. "Surgical excision")
- **Outcome** — result (e.g. "Clear margins, full recovery")

## HTML template for a new case card

Add this inside the `<div class="cases-grid">` in `case-studies/index.html`:

```html
<div class="case-card">
  <div class="card">
    <div class="case-images">
      <img src="../images/case-studies/BEFORE-IMAGE.jpg" alt="Description - before">
      <img src="../images/case-studies/AFTER-IMAGE.jpg" alt="Description - after">
    </div>
    <span class="case-badge">Treatment Type</span>
    <h3>Case Title</h3>
    <p class="case-desc">Brief description of the case.</p>
    <div class="case-details">
      <span><strong>Treatment:</strong> What was done</span>
      <span><strong>Outcome:</strong> Result</span>
    </div>
  </div>
</div>
```

## Image guidelines

- Place in `images/case-studies/`
- Use descriptive filenames: `bcc-nose-before.jpg`, `bcc-nose-after.jpg`
- JPG format preferred, reasonable resolution (no need for full-res originals)
- Images display at 150px height in the grid, so moderate quality is fine

## Removing the "coming soon" placeholder

Once you have 3+ cases, remove the placeholder card at the end of the grid (the one with the grey background and "More case studies coming soon" text).
