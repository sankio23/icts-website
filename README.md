# icts-website

Static website of the **International Center for Transdisciplinary Studies** (ICTS), an
inter-university research center founded in 2026 by the Sophia University Institute (Italy)
and the Tabosa de Almeida ASCES-UNITA University Center (Brazil).

Live: https://icts-center.netlify.app

## Content source

All institutional content — research architecture, governing bodies, network of partner
institutions, trajectory — is aligned with the **ICTS Research Handbook, 2026 Founding Edition**.
That volume is the single normative source: when the handbook changes, the site follows.

## Structure

```
index.html            Home — Units, Groups, Strategic Initiatives, network map
about.html            The Center's position: the relational turn, the three commitments
research.html         Research architecture
research/             RAISE · CI² · CeC · FRATERNITAS · CHARIS · PDM · CARE
people.html           Researchers, by Unit and Group
people/               Individual profiles
governance.html       Council Board · Advisory Council · Scientific Committee · Ethical Committee
activities.html       Programme — Trajectory 2026–2029, outputs, annual reporting
join.html             Why partner, ways to engage
form-a…d.html         Application forms (Models A–D)
css/style.css         Design system
js/nav.js             Navigation and scroll reveal
js/config.js          Backend endpoint for the forms
```

## Notes

- No build step: plain HTML, CSS and JavaScript. Open `index.html` or serve the folder.
- The home page map loads D3 and world-atlas from a CDN and degrades gracefully offline.
- The forms post to a Google Apps Script Web App; its URL is in `js/config.js`.

## Deployment

Netlify project `icts-center`. Publish directory: repository root. No build command.
